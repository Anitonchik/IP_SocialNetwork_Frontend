import React from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import ChatsModel from "../../../components/api/modelChats.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { useEffect } from "react";
import defaultAvatar from '../../../resources/defaultAvatar.jpg';

const ChatList = () => {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleDeleteChatId, setVisibleDeleteChatId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAlphabeticalSort, setIsAlphabeticalSort] = useState(false);
  
  const chatsModel = new ChatsModel();
  const userId = localStorage.getItem('userId');


  useEffect(() => {
      if (localStorage.getItem("token") == null) {
        navigate("/");
      }
    })

  useEffect(() => {
    fetchChats();
  }, []);

  const formatDate = (date) => { 
    if (isNaN(date.getTime())) {
        return "";
      }
    return new Intl.DateTimeFormat("en-GB", 
      { 
        day: "2-digit", 
        month: "short" 
      }).format(date); 
    };


  const fetchChats = async () => {
    try {
      let response = await chatsModel.getAll("userschats", userId);  

      if (response) {
        
        const updatedChats = [];
        for (const element of response) {
          const createdAt = new Date(element.createdAt);
          
          let processedElement;
          if (element.messages.length > 0) {
            const lastMessage = element.messages[element.messages.length - 1];
            const lastMessageDate = new Date(lastMessage.createdAt);
            processedElement = {
              ...element,
              isChatNew: false,
              createdAt,
              date: formatDate(createdAt),
              time: createdAt.toTimeString().slice(0, 5),
              lastMessage: lastMessage.messageText,
              dateLastMessage: formatDate(lastMessageDate),
              timeLastMessage: lastMessageDate.toTimeString().slice(0, 5),
            };
          } else {
            setIsChatNew(true)
            processedElement = {
              ...element,
              isChatNew: true,
              lastMessage: "write message..."
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
    navigate(`/users/users/${userId}`);
  };


  const setDeleteButton = (chatId) => {
    setVisible(!visible);
    setVisibleDeleteChatId(chatId);
  }

  const deleteChat = async (chatId) => {
    await chatsModel.delete(chatId, userId);
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
          <div key={chat.id} className="d-flex flex-row">
            <NavLink
              key={chat.id}
              to={`/somechat/${chat.id}`}
              state={{ chat }}
              onContextMenu={() => setDeleteButton(chat.id)}
              className="chat-href container container-background d-flex flex-row align-items-center justify-content-between text-decoration-none"
              style={{ maxWidth: 1000, padding: "10px 5px" }}
              >
              <>
                
              {(!chat.isChatNew) && (
                <>
                  <div className="d-flex align-items-center profile-message">
                    <img className="profile" src={(chat.correspondenceUser.userAvatarURL.length > 0) ? chat.correspondenceUser.userAvatarURL : defaultAvatar} alt="ava" />
                    <div className="main-text d-flex flex-column justify-content-center">
                      <p className="mb-1">{chat.correspondenceUser.userName}</p>
                      <p className="mb-1">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-3 text-end pe-4 disc-time-text">
                    <div className="flex-column">
                      <p className="mb-1">{chat.dateLastMessage}</p>
                      <p className="mb-1">{chat.timeLastMessage}</p>
                    </div>
                  </div>
                </>
              )}

              {(chat.isChatNew) && (
                <>
                  <div className="d-flex align-items-center profile-message">
                    <img className="profile" src={(chat.correspondenceUser.userAvatarURL.length > 0) ? chat.correspondenceUser.userAvatarURL : defaultAvatar} alt="ava" />
                    <div className="main-text d-flex flex-column justify-content-center">
                      <p className="mb-1">{chat.correspondenceUser.userName}</p>
                      <p className="disc-time-text mb-1">{chat.lastMessage}</p>
                    </div>
                  </div>
                </>
              )}
              </>
                

              </NavLink>
              {(visible && visibleDeleteChatId === chat.id) && (
                  <div className="d-flex align-items-center main-text gap-5">
                    <div className="bi bi-trash-fill h2" onClick={() => deleteChat(chat.id)}></div>
                  </div>
              )}
            </div>
       ))) : ( <div className="text-center mt-4">No chats found</div>)}

      <div 
        className="bi bi-plus-circle-fill h1 position-absolute bottom-0 end-0 m-3" 
        style={{ fontSize: '60px', color: '#fffacd', cursor: 'pointer', zindex: '4' }}
        onClick={() => handleUsersClick()}
      ></div>
    </>
    )}


export default ChatList;