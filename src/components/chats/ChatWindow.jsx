import MessageInput from "./MessageInput";
import Message from "./Message";
import { useState, useEffect, useMemo } from "react";
import { useLocation } from 'react-router-dom';
import MessagesModel from "../../../components/api/modelMessages";
import ChatModel from "../../../components/api/modelChats";
import "../../../styles.css";
import { useOutletContext } from "react-router-dom";

const ChatWindow = () => {
  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const path = "fromChat"

  const location = useLocation();
  const { chat, user } = location.state || {};

  const { setHeaderData } = useOutletContext();

  const messageModel = new MessagesModel();
  const chatModel = new ChatModel();
  const [messages, setMessages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(null);

  let date = null;
  let showDate = true;


  const fetchMessages = async () => {
    try {
      const chatMessages = await messageModel.getMessagesFromChat(path, chat.id);
      console.log(chatMessages)

      setMessages(chatMessages.map(element => {
        const createdAt = new Date(element.createdAt);

        if (user) {
          if (element.userId == user.id) {
            return {
              ...element,
              createdAt: createdAt,
              day: createdAt.getDate(),
              month: monthsShort[createdAt.getMonth()],
              time: createdAt.toTimeString().slice(0, 5),
              sender: "your"
            }
          }
          else {
            return {
              ...element,
              createdAt: createdAt,
              day: createdAt.getDate(),
              month: monthsShort[createdAt.getMonth()],
              time: createdAt.toTimeString().slice(0, 5),
              sender: "stranger"
            }
          }
        }

      }))
    } catch (error) {
      console.error("Ошибка при загрузке чатов:", error);
    }
  };


  useEffect(() => {
    setHeaderData(chat);

    fetchMessages();
  }, []);



  const handleSendMessage = async (text) => {
    const createdAt = new Date();
    const newMessage = {
      chatId: chat.id,
      userId: user.id,
      messageText: text,
      createdAt: createdAt,
      attachments: [],
      readBy: [],

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
      editMessage.messageText = text;
      await messageModel.updatePost(editMessage.id, editMessage);
      fetchMessages();
      setIsEditing(false);
      setEditMessage(null);
    }
    else {alert("чет не то")}
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
    if (date === null || msg.day != date.getDate() || msg.month != monthsShort[date.getMonth()]) {
      showDate = true;
      date = new Date(msg.createdAt);
    }
    else {
      showDate = false;
    }

    return (
      <>
        {(showDate) && (
          <div className="d-block text-center">
            <div className="date-message-text">{msg.day + " " + msg.month}</div>
          </div>)}
        <Message
          key={msg.id}
          message={msg}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </>)
  }), [messages]);


  return (
    <div className=" d-flex flex-column justify-content-center g-0" style={{ maxWidth: 1000, height: "85vh", margin: "auto" }}>
      <div id="messages-block" className="container container-background align-items-center some-chat  m-0">
        {messageList}
      </div>
      
      <MessageInput 
        onSend={handleSendMessage}
        isEditing={isEditing}
        editMessage={editMessage}
        onSendEditMessage={onSendEditMessage}
      />
    </div>
  );
};

export default ChatWindow;