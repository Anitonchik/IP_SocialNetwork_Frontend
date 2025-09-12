import MessageInput from "./MessageInput";
import Message from "./Message";
import React, { useState } from "react";

const ChatWindow = () => {
    const [messages, setMessages] = React.useState([
      { text: "Lorem ipsum", time: "10:42", sender: "your" },
      { text: "Aenean vitae ornare velit. In bibendum", time: "10:43", sender: "stranger" },
      { text: "Nullam elit dui, rutrum sed risus ut...", time: "10:43", sender: "your" },
    ]);
  
    const handleSendMessage = (text) => {
      const newMessage = {
        text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sender: "your",
      };
      setMessages((prev) => [...prev, newMessage]);
    };
  
    const handleRemoveMessage = (index) => {
      setMessages((prev) => prev.filter((_, i) => i !== index));
    };
  
    return (
      <>
        <div id="messages-block" className="container container-background some-chat">
          <div className="d-block text-center">
            <div className="date-message-text">16 February</div>
          </div>
  
          {messages.map((msg, index) => (
            <Message
              key={index}
              text={msg.text}
              time={msg.time}
              sender={msg.sender}
              onRemove={() => handleRemoveMessage(index)}
            />
          ))}
        </div>
  
        <MessageInput onSend={handleSendMessage} />
      </>
    );
  };
  
  export default ChatWindow;