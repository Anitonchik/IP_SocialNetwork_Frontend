import "../../../styles.css"

const Message = ({ text, time, sender, onRemove }) => {
    return (
      <div className={`d-block ${sender}-message`} onClick={onRemove}>
        <div className="message-chat-text">{text}</div>
        <div className="message-chat-time">{time}</div>
      </div>
    );
  };

export default Message;