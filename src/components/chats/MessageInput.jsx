import "../../../styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from "react";

const MessageInput = ({ isEditing, editMessage, onSendEditMessage, onSend }) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
      if (editMessage) {
        setMessage(editMessage.messageText);
      }
    }, [editMessage]);



    const handleInput = (e) => {
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';

      
  };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); 
          handleSend();
      }
  };
  
    const handleSend = () => {
      if (message.trim()) {
        if (isEditing) {
          onSendEditMessage(message.trim());
        }
        else {
          onSend(message.trim());
        }
        setMessage("");
      }
    };


    useEffect(() => {
      if (editMessage) {
        setMessage(editMessage.messageText);
      }
    }, [editMessage]);
  
   
  
    return (
      <div className="form-group container container-background enter-message d-flex align-items-center justify-content-between ">
        <div>
          <textarea
            className="col-12"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            onInput={handleInput}
          />
        </div>
        <div className="send-button">
          <button
            type="button"
            onClick={handleSend}
            className="bi bi-chevron-double-right pe-5 h1"
            style={{ color: '#fffacd', background: 'transparent', border: 'none' }}
          />
        </div>
      </div>
    );
  };

export default MessageInput;