import UserModel from "../../../components/api/modelUser.js";
import ChatsModel from "../../../components/api/modelChats.js";
import {useEffect} from "react";



const UsersList = ({userId, otherUser}) => {
    const userModel = new UserModel();
    const chatModel = new ChatsModel();
    let chatId = 0;


    const handleSubscribe = () => {
      const userToUser = {
        userId: userId,
        subscribedUserId: otherUser.id
      }

      const subscribe = userModel.createSubscribe(userToUser);
      if (subscribe) {
        alert("You're sucsessfully subscribed to user " + otherUser.userName)
      }
    }

    const handleWrite = () => {
      const chat = chatModel.getChatOfTwoUsers(userId, otherUser.id);
      if (chat) {
        chatId = chat.id;
      }
      else {
        const newChat = {
          createdAt: new Date(),
          participants: [userId, otherUser.id],
          messages: []
        }
        const createdChat = chatModel.createItem(newChat);
        chatId = createdChat.id;
      }
    }


    return (
        <>
          <NavLink
            key={otherUser.id}
            to={`/somechat/${chatId}`}
            state={{ chat, user }}
            onContextMenu={() => setDeleteButton(chat.id)}
            className="chat-href container container-background d-flex flex-row align-items-center justify-content-between text-decoration-none"
            style={{ maxWidth: 1000, padding: "10px 5px" }}
          >
            <div className="d-flex align-items-center profile-message">
              <img className="profile" src={chat.user.userAvatarURL} alt="ava" />
              <p className="main-text justify-content-center mb-1">{chat.user.userName}</p>
            </div>

            <div className="d-flex flex-row align-items-center gap-3 text-end pe-4 disc-time-text">
              <div className="flex-column">
                <button
                  id="addSubscribeButton"
                  className="btn btn-light"
                  style={{ width: "10%" }}
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
                <button
                  id="writeButton"
                  className="btn btn-light"
                  style={{ width: "10%" }}
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