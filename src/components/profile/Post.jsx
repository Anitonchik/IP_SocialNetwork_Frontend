import React, { useEffect, useState } from "react";
import "../../../styles.css";
import { useNavigate } from "react-router-dom";
import defaultAvatar from '../../../resources/defaultAvatar.jpg';


const Post = ({ post, onDelete, onEdit, showButtons }) => {
  const [postsDesc, setPostsDesc] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    updPostAddDate();
  }, [])

  const formatDate = (date) => { 
    return new Intl.DateTimeFormat("en-GB", 
      { 
        day: "2-digit", 
        month: "short" 
      }).format(date); 
    };

  const updPostAddDate = () => {
    const postDate = new Date(post.createdAt);
    const date = formatDate(postDate);
    const time = postDate.toTimeString().slice(0, 5);
    setPostsDesc(`${date}  ${time}`)
  }

  return (
  <div key={post.id}>
    <div className="container container-background mx-auto" >

        <div className="d-flex justify-content-between align-items-center container container-background" style={{gap: '10px'}}>
            <div className="d-flex align-items-center justify-content-center cursor-pointer"  style={{gap: '10px'}} onClick={() => navigate(`/profile/${post.user.id}`)}>
                <img className="post-header-img" src={(post.user.userAvatarURL.length > 0) ? post.user.userAvatarURL : defaultAvatar} alt="first story" />
                <p className="main-text">{post.user.userName}</p>
            </div>
            {showButtons ? (
              <div>
                  <button className="btn btn-light button-sbc me-2" onClick={() => onEdit(post)}>Update</button>
                  <button className="btn btn-light button-sbc" onClick={() => onDelete(post.id)}>Delete</button>
              </div>
            ) : null}
        </div>
        <div className="container container-background">
          {post.postImageURL && (
            <div className="d-flex align-items-center justify-content-center container-background" >
                <img className="post-inf-publication-img" src={post.postImageURL} alt="post" />
            </div>
          )}
            {post.postTextContent && (<p className="sub-text mt-2">{post.postTextContent}</p>)}
            <div className="message-chat-time">{(post.isEdited ? "edited" : "") + " " + postsDesc}</div>
        </div>
        
    </div>
  </div>
  );
};

export default Post;

