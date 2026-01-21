import { useEffect, useState } from "react";
import "../../../styles.css"

const Message = ({ message, handleDelete, handleUpdate, setUpdateMsg }) => {
  const [visible, setVisible] = new useState(false);
  const userId = localStorage.getItem('userId')

  const setMenu = (event) => {
    if (userId == message.user.id) {
      setVisible(!visible)
    }
  }

  const deleteMsg = () => {
    handleDelete(message.id)
    setVisible(!visible)
  };

  const updateMsg = () => {
    handleUpdate(message)
    setVisible(!visible)
  }

  if (setUpdateMsg) {
    text = setUpdateMsg;
  }

  return (
    <div key={message.id}>
      <div id={message.id} className={`d-block ${message.sender}-message`} onContextMenu={setMenu}>
        <div className="message-chat-text">{message.messageText}</div>
        {(message.isEdited) && (<div className="message-chat-time">{"edited " + message.time}</div>)}
        {(!message.isEdited) && (<div className="message-chat-time">{message.time}</div>)}
      </div>
    
      
      {(visible) && (
        <div className="message-menu gap-5">
          <div onClick={() => updateMsg()}>Edit</div>
          <div onClick={() => deleteMsg()}>Delete</div>
        </div>
      )}
    </div>
  );
};

export default Message;