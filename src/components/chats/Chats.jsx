import React from "react";
import { NavLink } from "react-router-dom";

const chats = [
  { img: "profile/ava.jpg", name: "first.profile", message: "Lorem ipsum dolor...", short: "sn", time: "11:11" },
  { img: "profile/ava2.jpg", name: "first.profile", message: "Lorem ipsum dolor...", short: "sn", time: "11:11" },
  { img: "profile/ava3.jpg", name: "first.profile", message: "Lorem ipsum dolor...", short: "sn", time: "11:11" },
  { img: "profile/ava4.jpg", name: "first.profile", message: "Lorem ipsum dolor...", short: "sn", time: "11:11" },
  { img: "profile/ava5.jpg", name: "first.profile", message: "Lorem ipsum dolor...", short: "sn", time: "11:11" },
  { img: "profile/ava6.jpg", name: "first.profile", message: "Lorem ipsum dolor...", short: "sn", time: "11:11" },
  { img: "profile/ava7.jpg", name: "first.profile", message: "Lorem ipsum dolor...", short: "sn", time: "11:11" },
  { img: "profile/ava8.jpg", name: "first.profile", message: "Lorem ipsum dolor...", short: "sn", time: "11:11" },
];

const ChatList = () => {
  return (
    <div>
      {chats.map((chat, index) => (
        <NavLink
          key={index}
          to="/somechat"
          href="SeparateChat.html"
          className="chat-href container container-background d-flex flex-row align-items-center justify-content-between text-decoration-none"
          style={{ maxWidth: 1000, padding: "10px 5px" }}
        >
          <div className="d-flex align-items-center profile-message">
            <img className="profile" src={chat.img} alt="ava" />
            <div className="main-text d-flex flex-column justify-content-center">
              <p className="mb-1">{chat.name}</p>
              <p className="mb-1">{chat.message}</p>
            </div>
          </div>
          <div className="text-end pe-4 disc-time-text">
            <p className="mb-1">{chat.short}</p>
            <p className="mb-1">{chat.time}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default ChatList;
