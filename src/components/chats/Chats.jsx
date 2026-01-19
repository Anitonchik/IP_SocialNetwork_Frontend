import React from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import ChatsModel from "../../../components/api/modelChats.js";
import UserModel from "../../../components/api/modelUser.js";
import MessagesModel from "../../../components/api/modelMessages.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { useEffect } from "react";

const ChatList = () => {
  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleDeleteChatId, setVisibleDeleteChatId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAlphabeticalSort, setIsAlphabeticalSort] = useState(false);
  
  const chatsModel = new ChatsModel();
  let userModel = null;
  let messageModel = null;
  const userId = localStorage.getItem('userId');


  useEffect(() => {
      if (localStorage.getItem("token") == null) {
        navigate("/");
      }
    })

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
      let response = await chatsModel.getAll("userschats", userId);  

      if (response) {
        
        const updatedChats = [];
        for (const element of response) {
          const createdAt = new Date(element.createdAt);
          
          let messages = await messageModel.getMessagesFromChat("fromChat", element.id);
          const messagesArray = Object.values(messages);
          messagesArray.sort((a, b) => new Date(a.date) - new Date(b.date));
          
          let processedElement;
          if (messagesArray.length > 0) {
            const lastMessage = messagesArray[messagesArray.length - 1];
            const lastMessageDate = new Date(lastMessage.createdAt);
            processedElement = {
              ...element,
              createdAt,
              day: createdAt.getDate(),
              month: monthsShort[createdAt.getMonth()],
              time: createdAt.toTimeString().slice(0, 5),
              lastMessage: lastMessage,
              dayLastMessage: lastMessageDate.getDate(),
              monthLastMessage: monthsShort[lastMessageDate.getMonth()],
              timeLastMessage: lastMessageDate.toTimeString().slice(0, 5),
            };
          } else {
            processedElement = {
              ...element,
              createdAt,
              day: createdAt.getDate(),
              month: monthsShort[createdAt.getMonth()],
              time: createdAt.toTimeString().slice(0, 5),
              lastMessage: "chat created at",
              dayLastMessage: createdAt.getDate(),
              monthLastMessage: monthsShort[createdAt.getMonth()],
              timeLastMessage: createdAt.toTimeString().slice(0, 5),
            };
          }
          
          updatedChats.push(processedElement);
        }
      setChats(updatedChats);
    }} catch (error) {
      console.error("Ошибка при загрузке чатов:", error);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.correspondenceUser.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let displayedChats = [...filteredChats];

  if (isAlphabeticalSort) {
    displayedChats.sort((a, b) =>
      a.correspondenceUser.userName.localeCompare(b.correspondenceUser.userName, 'ru', { sensitivity: 'base' })
    );
  }

  const handleUsersClick = () => {
    navigate(`/users/users/${user.id}`);
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
      <div className="d-flex flex-row container-background mb-3" style={{ maxWidth: 1000, padding: "10px 10px 10px 10px", margin: 'auto', marginTop: '10px', }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search chats by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="btn d-flex align-items-center"
          onClick={() => setIsAlphabeticalSort((prev) => !prev)}
          
        >
          <i className="bi bi-sort-alpha-down h2" style={{color: '#fffacd'}}></i>
        </button>
      </div>

      {displayedChats.length > 0 ? (
        displayedChats.map((chat) => (
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
       ))) : ( <div className="text-center mt-4">No chats found</div>)}

      <div 
        className="bi bi-plus-circle-fill h1 position-absolute bottom-0 end-0 m-3" 
        style={{ fontSize: '60px', color: '#fffacd', cursor: 'pointer', zindex: '4' }}
        onClick={() => handleUsersClick()}
      ></div>
    </>
    )}


export default ChatList;