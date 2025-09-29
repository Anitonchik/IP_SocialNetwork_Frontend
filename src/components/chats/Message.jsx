import { useEffect, useState } from "react";
import "../../../styles.css"

const Message = ({ message, handleDelete, handleUpdate, setUpdateMsg }) => {
  const [visible, setVisible] = new useState(false);
  const userId = JSON.parse(localStorage.getItem('userSettings')).userId

  const setMenu = (event) => {
    if (userId === message.userId) {
      setVisible(!visible)
    }
  }

  const deleteMsg = () => {
    alert("delete")
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
    <>
      <div className={`d-block ${message.sender}-message`} onContextMenu={setMenu}>
        <div className="message-chat-text">{message.messageText}</div>
        <div className="message-chat-time">{message.time}</div>
      </div>
      {(visible) && (
        <div className="d-flex flex-column me-0">
          <div className="cursor-pointer" onClick={() => updateMsg()}>Edit</div>
          <div onClick={() => deleteMsg()}>Delete</div>
        </div>
      )}
    </>
  );
};

export default Message;