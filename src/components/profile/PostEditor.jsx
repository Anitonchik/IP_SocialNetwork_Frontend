import React, { useState, useEffect } from "react";
import "../../../styles.css";

const PostEditor = ({ onAddPost, onUpdatePost, editingPost, cancelEdit }) => {
  // editingPost — объект поста, если идет редактирование, иначе null

  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setUrl(editingPost.postImageURL || "");
      setText(editingPost.postTextContent || "");
      setIsEditing(true);
    } else {
      setUrl("");
      setText("");
      setIsEditing(false);
    }
  }, [editingPost]);

  const handleAdd = () => {
    if (url.trim() && text.trim()) {
      onAddPost(JSON.parse(localStorage.getItem('userSettings')).userId, url, text);
      setUrl("");
      setText("");
    }
  };

  const handleUpdate = () => {
    alert("ljhv")
    if (url.trim() && text.trim() && editingPost) {
      onUpdatePost(editingPost.id, JSON.parse(localStorage.getItem('userSettings')).userId, url, text);
    }
  };

  const handleCancel = () => {
    cancelEdit();
  };

  return (
    <div
      id="creatingPosts"
      className="container container-background d-flex flex-column align-items-center ms-auto me-auto text-center"
      style={{ marginTop: 10, maxWidth: 1000 }}
    >
      <button
        id="createPostButton"
        className="btn btn-light button-sbc"
        style={{ width: "90%" }}
        onClick={() => {
          setUrl("");
          setText("");
          setIsEditing(false);
          setIsCreating(true);
        }}
      >
        Create post
      </button>

      {(isCreating || isEditing) && (
        <>

        {(isCreating) && (
          <div className="adding-post-textareas" style={{ width: "100%", marginTop: 10 }}>
            <textarea
              id="url-input"
              style={{ width: "100%" }}
              placeholder="Enter URL of image"
              rows={5}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <textarea
              id="text-input"
              style={{ width: "100%" }}
              placeholder="Write something..."
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        )}

          {(isEditing) && (
            <div className="adding-post-textareas" style={{ width: "100%", marginTop: 10 }}>
              <textarea
                id="url-input"
                style={{ width: "100%" }}
                rows={5}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <textarea
                id="text-input"
                style={{ width: "100%" }}
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}

          {!isEditing && (
            
            <div className="adding-post-button text-center" style={{ width: "100%", margin: "10px 0" }}>
              <button
                id="addPostButton"
                className="btn btn-light"
                style={{ width: "100%" }}
                onClick={handleAdd}
              >
                Add post
              </button>
            </div>
          )}

          {isEditing && (
            <div className="update-post-button text-center" style={{ width: "100%" }}>
              <button
                id="enterUpdatePostButton"
                className="btn btn-light"
                style={{ width: "100%", margin: "10px 0" }}
                onClick={handleUpdate}
              >
                Update post
              </button>
              <button
                id="cancelUpdatePostButton"
                className="btn btn-light"
                style={{ width: "100%", margin: "10px 0" }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostEditor;
