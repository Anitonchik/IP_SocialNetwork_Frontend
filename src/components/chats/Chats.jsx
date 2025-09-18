import React from "react";
import { NavLink } from "react-router-dom";
import ChatsModel from "../../../components/api/modelChats.js";
import { useState } from "react";
import { useEffect } from "react";

const ChatList = () => {
  const [chats, setChats] = useState([]);

  const chatsModel = new ChatsModel();


  useEffect(() => {
    chatsModel.getAll("userschats", JSON.parse(localStorage.getItem('userSettings')).userId).array.map(element => {
      // Если createdAt — это строка, преобразуем в объект Date
      const createdAt = new Date(element.createdAt);
      return {
        ...element,
        createdAt: createdAt,
        day: createdAt.getDate(),
        month: createdAt.getMonth() + 1, 
        time: createdAt.toTimeString().slice(0, 8),
      };
    }).then(setChats);
  }, []);


  return (
    <div>
      {[... chats].map((chat) => (
        <NavLink
          to="/somechat"
          href="SeparateChat.html"
          className="chat-href container container-background d-flex flex-row align-items-center justify-content-between text-decoration-none"
          style={{ maxWidth: 1000, padding: "10px 5px" }}
        >
          <div className="d-flex align-items-center profile-message">
            <img className="profile" src={chat.chatAvatar} alt="ava" />
            <div className="main-text d-flex flex-column justify-content-center">
              <p className="mb-1">{chat.chatName}</p>
              <p className="mb-1">{chat.message}</p>
            </div>
          </div>
          <div className="text-end pe-4 disc-time-text">
            <p className="mb-1">{chat.day + " " +  chat.month}</p>
            <p className="mb-1">{chat.time}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default ChatList;
