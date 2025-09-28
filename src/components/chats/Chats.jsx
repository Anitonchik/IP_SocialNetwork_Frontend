import React from "react";
import { NavLink, useOutletContext  } from "react-router-dom";
import ChatsModel from "../../../components/api/modelChats.js";
import UserModel from "../../../components/api/modelUser.js";
import { useState } from "react";
import { useEffect } from "react";

const ChatList = () => {
  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  
  const chatsModel = new ChatsModel();
  let userModel = null;
  const userId = JSON.parse(localStorage.getItem('userSettings')).userId;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        userModel = new UserModel();
        let user = await userModel.getUser(userId);

        setUser(user);

        const response = await chatsModel.getAll("userschats", user.id);

        const updatedChats = response.map(element => {
          const createdAt = new Date(element.createdAt);
          const lastMessage = element.messages?.slice(-1)[0];
          const lastMessageDate = new Date(lastMessage.createdAt)
          return {
            ...element,
            createdAt: createdAt,
            day: createdAt.getDate(),
            month: monthsShort[createdAt.getMonth()],
            time: createdAt.toTimeString().slice(0, 5),
            lastMessage: lastMessage,
            dayLastMessage: lastMessageDate.getDate(),
            monthLastMessage: monthsShort[lastMessageDate.getMonth()],
            timeLastMessage: lastMessageDate.toTimeString().slice(0, 5),
          };
        });

        setChats(updatedChats);
      } catch (error) {
        console.error("Ошибка при загрузке чатов:", error);
      }
    };

    fetchChats();
  }, []);


  return (
    <div>
      {[...chats].map((chat) => (
        <NavLink
          key={chat.id}
          to={`/somechat/${chat.id}`}
          state={{ chat, user }}
          href="SeparateChat.html"
          className="chat-href container container-background d-flex flex-row align-items-center justify-content-between text-decoration-none"
          style={{ maxWidth: 1000, padding: "10px 5px" }}
        >
          <div className="d-flex align-items-center profile-message">
            <img className="profile" src={chat.user.userAvatarURL} alt="ava" />
            <div className="main-text d-flex flex-column justify-content-center">
              <p className="mb-1">{chat.user.userName}</p>
              <p className="mb-1">{chat.lastMessage.messageText}</p>
            </div>
          </div>
          <div className="text-end pe-4 disc-time-text">
            <p className="mb-1">{chat.dayLastMessage + " " + chat.monthLastMessage}</p>
            <p className="mb-1">{chat.timeLastMessage}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default ChatList;
