import React from "react";
import { NavLink, useOutletContext  } from "react-router-dom";
import ChatsModel from "../../../components/api/modelChats.js";
import UserModel from "../../../components/api/modelUser.js";
import MessagesModel from "../../../components/api/modelMessages.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { useEffect } from "react";

const ChatList = () => {
  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [visible, setVisible] = new useState(false);
  const [visibleDeleteChatId, setVisibleDeleteChatId] = useState(0);
  
  const chatsModel = new ChatsModel();
  let userModel = null;
  let messageModel = null;
  const userId = JSON.parse(localStorage.getItem('userSettings')).userId;


  useEffect(() => {
    userModel = new UserModel();
    messageModel = new MessagesModel();
 
    const fetchUser = async () => {
      try {
          const userData = await userModel.getUser(userId);
          setUser(userData);
      } catch (error) {
          console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
    fetchChats();

  }, []);


  const fetchChats = async () => {
    try {
      let response = await chatsModel.getAll("userschats", JSON.parse(localStorage.getItem('userSettings')).userId);
      console.log(response)

      if (response) {
      const updatedChats = await Promise.all(
        response.map(async (element) => {
        const createdAt = new Date(element.createdAt);
        
        let messages = await messageModel.getMessagesFromChat("fromChat", element.id)
        const messagesArray = Object.values(messages);
        messagesArray.sort((a, b) => new Date(a.date) - new Date(b.date));

        /*for (let i = 0; i < messages.lenght; i++) {
          let date = new Date(messages[i].createdAt)
          messages[i] = {
              ...messages[i],
              createdAt: date,
              day: createdAt.getDate(),
              month: monthsShort[createdAt.getMonth()],
              time: createdAt.toTimeString().slice(0, 5),
              day: lastMessageDate.getDate(),
              month: monthsShort[lastMessageDate.getMonth()],
              time: lastMessageDate.toTimeString().slice(0, 5),
          }
        }*/

        
        if (messagesArray) {
          let lastMessage = messagesArray.slice(-1)[0];
          if (lastMessage) {
            let lastMessageDate = new Date(lastMessage.createdAt)
            return {
              ...element,
              createdAt: createdAt,
              day: createdAt.getDate(),
              month: monthsShort[createdAt.getMonth()],
              time: createdAt.toTimeString().slice(0, 5),
              //messages: messages,
              lastMessage: lastMessage,
              dayLastMessage: lastMessageDate.getDate(),
              monthLastMessage: monthsShort[lastMessageDate.getMonth()],
              timeLastMessage: lastMessageDate.toTimeString().slice(0, 5),
            };
          }
        }
        
        else {
          return {
            ...element,
            createdAt: createdAt,
            day: createdAt.getDate(),
            month: monthsShort[createdAt.getMonth()],
            time: createdAt.toTimeString().slice(0, 5),
            //messages: [],
            lastMessage: "chat created at",
            dayLastMessage: createdAt.getDate(),
            monthLastMessage: monthsShort[createdAt.getMonth()],
            timeLastMessage: createdAt.toTimeString().slice(0, 5),
          }
        }
      }

      ));
      setChats(updatedChats);
      console.log(updatedChats);
    }} catch (error) {
      console.error("Ошибка при загрузке чатов:", error);
    }
  };

  const setDeleteButton = (chatId) => {
    setVisible(!visible);
    setVisibleDeleteChatId(chatId);
  }


  const deleteChat = async (chatId) => {
    await chatsModel.delete(chatId);
    fetchChats();
  }

  return (
      <>
      {(Array.isArray(chats) && chats.length > 0) ? ([...chats].map((chat) => (
        <NavLink
          key={chat.id}
          to={`/somechat/${chat.id}`}
          state={{ chat, user }}
          onContextMenu={() => setDeleteButton(chat.id)}
          className="chat-href container container-background d-flex flex-row align-items-center justify-content-between text-decoration-none"
          style={{ maxWidth: 1000, padding: "10px 5px" }}
        >
          <div className="d-flex align-items-center profile-message">
            <img className="profile" src={chat.correspondenceUser.userAvatarURL} alt="ava" />
            <div className="main-text d-flex flex-column justify-content-center">
              <p className="mb-1">{chat.correspondenceUser.userName}</p>
              <p className="mb-1">{chat.lastMessage.messageText}</p>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center gap-3 text-end pe-4 disc-time-text">
            <div className="flex-column">
              <p className="mb-1">{chat.dayLastMessage + " " + chat.monthLastMessage}</p>
              <p className="mb-1">{chat.timeLastMessage}</p>
            </div>
            {(visible && visibleDeleteChatId === chat.id) && (
            <div className="sub-text gap-5">
              <div className="bi bi-trash-fill h2" onClick={() => deleteChat(chat.id)}></div>
            </div>
            )}
          </div> 
          
        </NavLink>
      ))) 
      : <div>Загрузка чатов...</div>}

      <div 
        className="bi bi-plus-circle-fill h1 position-absolute bottom-0 end-0 m-3" 
        style={{ fontSize: '60px', color: '#fffacd', cursor: 'pointer', zindex: '4' }}
      ></div>
    </>
    )}


export default ChatList;