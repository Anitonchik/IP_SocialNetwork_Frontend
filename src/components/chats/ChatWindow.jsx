import MessageInput from "./MessageInput";
import Message from "./Message";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import MessagesModel from "../../../components/api/modelMessages";
import "../../../styles.css";
import { useParams, useOutletContext } from "react-router-dom";

const ChatWindow = () => {
  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const { setHeaderData } = useOutletContext();

  const location = useLocation();
  const { chat, user } = location.state || {}; 

  const [messages, setMessages] = useState([]);
  const model = new MessagesModel();

  let date = null;
  let showDate = true;



  useEffect(() => {
    setHeaderData(chat);

    const fetchMessages = async () => {
      try {
        console.log(chat.messages)
        const messages = chat.messages.map(element => {
          const createdAt = new Date(element.createdAt);

          if (chat.messages.userId === user.id) {
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
        });
  
        setMessages(messages);
      } catch (error) {
        console.error("Ошибка при загрузке чатов:", error);
      }
    };

    fetchMessages();
  }, []);


  
  const handleSendMessage = (text) => {
    const createdAt = new Date();
    const newMessage = {
        chatId: chat.id,
        userId: user.id,
        messageText: text,
        createdAt: createdAt,
        attachments: [],
        readBy: [],
        
      };
      setMessages(model.createMessage(newMessage).toArray());
      console.log(messages)
    };
  
    const handleRemoveMessage = (index) => {
      setMessages((prev) => prev.filter((_, i) => i !== index));
    };

  
    return (
      <div className="d-flex flex-column justify-content-center g-0" style={{ maxWidth: 1000, width: "100%", height: "95vh", margin: "auto" }}>
        <div id="messages-block" className="container container-background some-chat m-0">
            
        
  
          {messages.map((msg, index) => {

          if (date === null || msg.day !== date.getDate() || msg.month !== date.getMonth()) {
            showDate = true;
            date = new Date(msg.createdAt);
          }

            return (
            <>
              {(showDate) && (
                <div className="d-block text-center">
                  <div className="date-message-text">{msg.day + " " + msg.month}</div>
                </div>)}
              <Message
                key={msg.id}
                text={msg.messageText}
                time={msg.time}
                sender={msg.sender}
                onRemove={() => handleRemoveMessage(index)}
              />
            </> )
            })}
        </div>
  
        <MessageInput onSend={handleSendMessage}  />
      </div>
    );
  };
  
  export default ChatWindow;
