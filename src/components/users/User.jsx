import UserModel from "../../../components/api/modelUser.js";
import ChatsModel from "../../../components/api/modelChats.js";
import { NavLink } from "react-router-dom";
import "../../../styles.css";
import {useEffect, useState} from "react";



const UsersList = ({correspondenceUser}) => {
  const [chat, setChat] = useState(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const userId = JSON.parse(localStorage.getItem('userSettings')).userId;
  const userModel = new UserModel();
  const chatModel = new ChatsModel();
  let chatId = 0;

  useEffect(() => {
    const fetchUser1 = async() => {
      const user = await userModel.getUser(userId);
      setIsSubscribed(await userModel.isSubscribed(userId, correspondenceUser.id));
      //alert(await userModel.isSubscribed(userId, correspondenceUser.id));
      
    }
    fetchUser1();
    alert(isSubscribed);
  }, [isSubscribed]);


    const handleSubscribe = () => {
      const userToUser = {
        userId: userId,
        subscribedUserId: correspondenceUser.id
      }

      const subscribe = userModel.createSubscribe(userToUser);
      setIsSubscribed(true);
      if (subscribe) {
        alert("You're sucsessfully subscribed to user " + correspondenceUser.userName)
      }
    }

    const handleUnSubscribe = () => {
      
    }

    const handleWrite = () => {
      const fetchUser = async() => {
        setChat(await chatModel.getChatOfTwoUsers(userId, correspondenceUser.id));
        if (chat) {
          chatId = chat.id;
        }
        else {
          // испрв
          const newChat = {
            createdAt: new Date(),
            participants: [userId, correspondenceUser.id],
            messages: []
          }
          const createdChat = chatModel.createItem(newChat);
          chatId = createdChat.id;
        }
      };
      fetchUser();
    }


    return (
        <>
          <NavLink
            key={correspondenceUser.id}
            to={`/somechat/${chatId}`}
            state={{ chat, correspondenceUser }}
            onContextMenu={() => setDeleteButton(chat.id)}
            className="chat-href container container-background d-flex flex-row align-items-center justify-content-between text-decoration-none"
            style={{ maxWidth: 1000, padding: "10px 5px" }}
          >
            <div className="d-flex align-items-center profile-message">
              <img className="profile" src={correspondenceUser.userAvatarURL} alt="ava" />
              <p className="main-text justify-content-center mb-1">{correspondenceUser.userName}</p>
            </div>

            <div className="d-flex flex-row align-items-center gap-3 text-end pe-1 disc-time-text">
              <div className="flex-column">
                {(isSubscribed) && 
                  (<button id="addSubscribeButton" className="container-background sub-text button-sbc" onClick={handleUnSubscribe}>Subscribed</button>)
                }
                {(!isSubscribed) && 
                  (<button id="addSubscribeButton" className="btn btn-light button-sbc" onClick={handleSubscribe}>Subscribe</button>)
                }
                <button
                  id="writeButton"
                  className="btn btn-light button-sbc"

                  onClick={handleWrite}
                >
                  Write
                </button>
              </div>
            </div> 
            
          </NavLink>
      </>
)}

export default UsersList;