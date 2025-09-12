import React from "react";
import "../../../styles.css";

const Post = ({ post, onDelete, onEdit }) => {
  return (
  <div>
    <div className="container container-background mx-auto" >

        <div className="d-flex justify-content-between align-items-center container container-background" style={{gap: '10px'}}>
            <div className="d-flex align-items-center justify-content-center" style={{gap: '10px'}}>
                <img className="post-header-img" src={post.userAvatarURL} alt="first story" />
                <p className="main-text">{post.userName}</p>
            </div>
            <div>
                <button className="btn btn-light button-sbc me-2" onClick={() => onEdit(post)}>Update</button>
                <button className="btn btn-light button-sbc" onClick={() => onDelete(post.id)}>Delete</button>
            </div>
        </div>
        <div className="container container-background">
            <div className="d-flex align-items-center justify-content-center container-background" >
                <img className="post-inf-publication-img" src={post.postImageURL} alt="post1" />
            </div>
            <p className="sub-text">{post.postTextContent}</p>
        </div>
        
    </div>
  </div>
  );
};

export default Post;

/*<div className="post-container container-background" style={{ border: "1px solid #ccc", marginBottom: 15, padding: 10 }}>
      <div className="container-background">
        <img  src={post.postContentImage} alt="post" style={{ maxWidth: "100%" }} />
      </div>
      <p className="sub-text">{post.postContentText}</p>
      <button onClick={() => onDelete(post.id)} style={{ marginRight: 10 }}>Delete</button>
      <button onClick={() => onEdit(post)}>Update</button>
    </div>*/
