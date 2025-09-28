import "../../../styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
    const [message, setMessage] = useState("");

    const handleInput = (e) => {
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

    const handleKeyDown = (e) => {
      // Если нажат Enter без зажатого Shift
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // Предотвращаем перенос строки
          handleSend();
      }
      // Если нажат Enter с зажатым Shift - будет обычный перенос строки
  };
  
    const handleSend = () => {
      if (message.trim()) {
        onSend(message.trim());
        setMessage("");
      }
    };
  
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