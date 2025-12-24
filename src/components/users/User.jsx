import UserModel from "../../../components/api/modelUser.js";
import ChatsModel from "../../../components/api/modelChats.js";
import { NavLink } from "react-router-dom";
import "../../../styles.css";
import {useEffect, useState} from "react";



const User = ({userIdForList, correspondenceUser, handleDelete}) => {
  const [visible, setVisible] = new useState(false);

  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const userId = localStorage.getItem('userId');

  let userModel = new UserModel();
  let chatModel = new ChatsModel();

  useEffect(() => {    
    const fetchUser = async() => {
      userModel = new UserModel();
      setUser(await userModel.getUser(userIdForList));

      if (userIdForList === userId && localStorage.getItem("role") === 'USER') {
        setChat(await chatModel.getChatOfTwoUsers(userId, correspondenceUser.id))
        setIsSubscribed(await userModel.isSubscribed(userId, correspondenceUser.id));
      }
    }
    fetchUser();
  }, []);

    const handleUnSubscribe = async () => {
      try {
        await userModel.deleteSubscription(userId, correspondenceUser.id);
        setIsSubscribed(false);
      } catch (error) {
        console.error("Ошибка при отписке:", error);
      }
    }

    const handleSubscribe = async() => {
      try {
        await userModel.createSubscription(userId, correspondenceUser.id);
        setIsSubscribed(true);
      } catch (error) {
        console.error("Ошибка при подписке:", error);
      }
    }

    const handleWrite = () => {
      const fetchUser = async() => {
        setChat(await chatModel.getChatOfTwoUsers(userId, correspondenceUser.id));
        if (!chat) {
          // испрв
          const newChat = {
            createdAt: new Date(),
            participants: [userId, correspondenceUser.id],
            messages: []
          }
          const createdChat = chatModel.createItem(newChat);
          setChat(createdChat)
        }
      };
      fetchUser();
    }

    // это для админа 

    const setMenu = (event) => {
      if (userIdForList != localStorage.getItem("userId")) {
        setVisible(!visible)        
      }
    }

    const deleteUser = () => {
      alert("delete")
      handleDelete(userIdForList)
      setVisible(!visible)
    };

    


    return (
        <>
        {(chat && (userIdForList === userId) && localStorage.getItem("role") === "USER") && (
          <div
            onContextMenu={() => setDeleteButton(chat.id)}
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

            {(userIdForList === userId && localStorage.getItem("role") === 'USER') && (
            
              <div className="d-flex flex-row align-items-center gap-3 text-end pe-1 disc-time-text">
                
                <div className="flex-column">
                  {(isSubscribed) && 
                    (<button id="addSubscribeButton" className="container-background sub-text button-sbc" onClick={handleUnSubscribe}>Subscribed</button>)
                  }
                  {(!isSubscribed) && 
                    (<button id="addSubscribeButton" className="btn btn-light button-sbc" onClick={handleSubscribe}>Subscribe</button>)
                  }
                  <NavLink
                  key={correspondenceUser.id}
                  to={`/somechat/${chat.id}`}
                  state={{ chat, user }}>
                    <button id="writeButton" className="btn btn-light button-sbc"
                      onClick={handleWrite}>Write
                    </button>
                  </NavLink>
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