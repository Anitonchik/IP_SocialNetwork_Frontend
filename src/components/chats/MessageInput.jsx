import "../../../styles.css"
import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
    const [message, setMessage] = useState("");
  
    const handleSend = () => {
      if (message.trim()) {
        onSend(message.trim());
        setMessage("");
      }
    };
  
    return (
      <div className="form-group container container-background enter-message d-flex align-items-center justify-content-between">
        <div>
          <textarea
            className="col-12"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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