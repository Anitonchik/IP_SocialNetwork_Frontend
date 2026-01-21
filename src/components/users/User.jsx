import UserModel from "../../../components/api/modelUser.js";
import ChatsModel from "../../../components/api/modelChats.js";
import { NavLink, useNavigate } from "react-router-dom";
import "../../../styles.css";
import {useEffect, useState} from "react";
import defaultAvatar from '../../../resources/defaultAvatar.jpg';

const User = ({userForList, correspondenceUser, handleDelete}) => {
  const [visible, setVisible] = new useState(false);

  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isWriteButtonVisible, setIsWriteButtonVisible] = useState(true);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  let userModel = new UserModel();
  let chatModel = new ChatsModel();

  useEffect(() => {    
    const fetchUser = async() => {
      userModel = new UserModel();
      if (userForList && userForList.id == userId && localStorage.getItem("role") === 'USER') {
        setIsSubscribed(correspondenceUser.isSubscribed);
      }
      if (correspondenceUser.userRole === "ADMIN") {
        setIsWriteButtonVisible(false);
      }
    }
    fetchUser();
  }, []);

    const handleUnSubscribe = async () => {
      try {
        await userModel.deleteSubscription(correspondenceUser.id, userId);
        setIsSubscribed(false);
      } catch (error) {
        console.error("Ошибка при отписке:", error);
      }
    }

    const handleSubscribe = async() => {
      try {
        await userModel.createSubscription(correspondenceUser.id, userId);
        setIsSubscribed(true);
      } catch (error) {
        console.error("Ошибка при подписке:", error);
      }
    }

    const handleWrite = () => {
      const fetchUser = async() => {
        const isChatExist = await chatModel.request(`chats/userschats/checkavailability/${userId}/${correspondenceUser.id}`)
        let chat;
        if (isChatExist) {
          chat = await chatModel.getChatOfTwoUsers(userId, correspondenceUser.id);
        }
        else {
          const newChat = {
            createdAt: new Date(),
            firstUserId: userId,
            secondUserId: correspondenceUser.id
          }
          chat = await chatModel.createChat(newChat, userId);
        }
        navigate(`/somechat/${chat.id}`,
        {
          state: {chat: chat, user: userForList}
        })
        
      };
      fetchUser();
    }

    // это для админа 

    const setMenu = (event) => {
      if (userForList.id != localStorage.getItem("userId")) {
        setVisible(!visible)        
      }
    }

    const deleteUser = () => {
      console.log(correspondenceUser)
      handleDelete(correspondenceUser)
      setVisible(!visible)
    };

    return (
        <>
        {(localStorage.getItem("role") === "USER") && (
          <div
            onContextMenu={() => setDeleteButton(chat.id)}
            className="chat-href container container-background d-flex flex-row align-items-center justify-content-between text-decoration-none"
            style={{ maxWidth: 1000, padding: "10px 5px" }}
            key={correspondenceUser.id}
          >
            <NavLink
            className="text-decoration-none"
            key={correspondenceUser.id}
            to={`/profile/${correspondenceUser.id}`}>
              <div className="d-flex align-items-center profile-message text-decoration-none">
                <img className="profile" src={(correspondenceUser.userAvatarURL.length > 0) ? correspondenceUser.userAvatarURL : defaultAvatar} alt="ava" />
                <p className="main-text justify-content-center mb-1 text-decoration-none">{correspondenceUser.userName}</p>
              </div>
            </NavLink>

            {(userForList.id == userId && localStorage.getItem("role") === 'USER') && (
            
              <div className="d-flex flex-row align-items-center gap-3 text-end pe-1 disc-time-text">
                
                <div className="flex-column">
                  {(isSubscribed) && 
                    (<button id="addSubscribeButton" className="container-background sub-text button-sbc" onClick={handleUnSubscribe}>Subscribed</button>)
                  }
                  {(!isSubscribed) && 
                    (<button id="addSubscribeButton" className="btn btn-light button-sbc" onClick={handleSubscribe}>Subscribe</button>)
                  }

                  {(isWriteButtonVisible) && (
                  <button id="writeButton" className="btn btn-light button-sbc"
                      onClick={handleWrite}>Write
                  </button>)}
                  

                </div>
              </div> 
            )}
            
          </div>)}

          {(localStorage.getItem("role") === "ADMIN") && (
            <div
              onContextMenu={() => setMenu()}
              className="chat-href container container-background d-flex flex-row align-items-center justify-content-between text-decoration-none"
              style={{ maxWidth: 1000, padding: "10px 5px" }}
            >
              <NavLink
              className="text-decoration-none"
              key={correspondenceUser.id}
              to={`/profile/${correspondenceUser.id}`}>
                <div className="d-flex align-items-center profile-message text-decoration-none">
                  <img className="profile" src={correspondenceUser.userAvatarURL} alt="ava" />
                  <p className="main-text justify-content-center mb-1 text-decoration-none">{correspondenceUser.userName}</p>
                </div>
              </NavLink>
              
            </div>
          )}
          {(visible) && (
            <div className="message-menu gap-5">
              <div onClick={() => deleteUser()}>Delete</div>
            </div>
          )}
      </>
)}

export default User;