import MessageInput from "./MessageInput";
import Message from "./Message";
import { useState, useEffect, useMemo,  ef } from "react";
import { useLocation } from 'react-router-dom';
import MessagesModel from "../../../components/api/modelMessages";
import "../../../styles.css";
import { useOutletContext } from "react-router-dom";

const ChatWindow = () => {
  const path = "fromChat"

  const location = useLocation();
  const { chat } = location.state || {};

  const { setHeaderData } = useOutletContext();

  const messageModel = new MessagesModel();
  const [messages, setMessages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(null);

  let date = null;
  let showDate = true;

  useEffect(() => {
      if (localStorage.getItem("token") == null) {
        navigate("/");
      }
    })

  useEffect(() => {
    setHeaderData(chat);
    if (!chat) return;
    fetchMessages()
    const timer = setInterval(fetchMessages, 5000)
    return () => {clearInterval(timer)}
  }, [chat]);


   const formatDate = (date) => { 
    return new Intl.DateTimeFormat("en-GB", 
      { 
        day: "2-digit", 
        month: "short" 
      }).format(date); 
    };


  const fetchMessages = async () => {
    try {
      const chatMessages = await messageModel.getMessagesFromChat(path, chat.id);
      
      setMessages(chatMessages.map(element => {
        const createdAt = new Date(element.createdAt);

        if (element.user.id == chat.authUser.id) {
          return {
            ...element,
            createdAt: createdAt,
            date: formatDate(createdAt),
            time: createdAt.toTimeString().slice(0, 5),
            sender: "your"
          }
        }
        else {
          return {
            ...element,
            createdAt: createdAt,
            date: formatDate(createdAt),
            time: createdAt.toTimeString().slice(0, 5),
            sender: "stranger"
          }
        }
        

      }))
    } catch (error) {
      console.error("Ошибка при загрузке чатов:", error);
    }
  };

  const handleSendMessage = async (text) => {
    const createdAt = new Date();
    const newMessage = {
      chatId: chat.id,
      userId: chat.authUser.id,
      messageText: text,
      createdAt: createdAt
    };
    try {
      await messageModel.createMessage(newMessage);
      fetchMessages();
    }
    catch (error) {
      alert("Не удалось отправить сообщение")
    }
  };

  const onSendEditMessage = async (text) => {
    if (editMessage) {
      const newMessage = {
        chatId: chat.id,
        userId: editMessage.user.id,
        messageText: text,
        createdAt: editMessage.createdAt
      }
      await messageModel.updatePost(editMessage.id, newMessage);
      fetchMessages();
      setIsEditing(false);
      setEditMessage(null);
    }
    else {alert("Не удалось редактировать сообщение")}
  }


  const handleDelete = async (id) => {
    await messageModel.delete(id);
    setMessages((prev) => prev.filter((_, i) => i !== id));
    fetchMessages();
  };

  const handleUpdate = (message) => {
    setEditMessage(message);
    setIsEditing(true);
  }

  const messageList = useMemo(() => messages.map(msg => {
    if (date === null || formatDate(date) != formatDate(msg.createdAt)) {
      showDate = true;
      date = new Date(msg.createdAt);
    } 
    else {
      showDate = false;
    }

    return (
      <div key={msg.id}>
        {(showDate) && (
          <div className="d-block text-center">
            <div className="date-message-text">{msg.date}</div>
          </div>)}
        
          <Message
            key={msg.id}
            message={msg}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
      </div>)
  }), [messages]);


  return (
    <>
      {messages && 
        (<div className=" d-flex flex-column justify-content-center g-0" style={{ maxWidth: 1000, height: "85vh", margin: "auto" }}>
          <div id="messages-block" className="container container-background align-items-center some-chat  m-0">
            {messageList}
          </div>
        
        <MessageInput 
          onSend={handleSendMessage}
          isEditing={isEditing}
          editMessage={editMessage}
          onSendEditMessage={onSendEditMessage}
        />
      </div>)}
    </>
  );
};

export default ChatWindow;