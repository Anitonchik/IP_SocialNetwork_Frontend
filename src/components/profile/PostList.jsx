import React, { useEffect, useState } from "react";
import Post from "./Post.jsx";
import PostModel from "../../../components/api/modelPost.js";
import "../../../styles.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const model = new PostModel();

  useEffect(() => {
    model.getAll("notUsersPosts/" + JSON.parse(localStorage.getItem('userSettings')).userId).then(setPosts);
  }, []);

  const deletePost = async (postId) => {
    await model.delete(postId);
    setPosts(posts.filter((p) => p.id !== postId));
    if (editingPost && editingPost.id === postId) {
      setEditingPost(null);
    }
  };

  const editPost = (post) => setEditingPost(post);

  return (
    <>

      <div style={{ maxWidth: 1000, margin: "10px auto" }}>
        {[... posts].reverse().map((post) => (
          <Post key={post.id} post={post} onDelete={deletePost} onEdit={editPost} showButtons={false}/>
        ))}
      </div>
    </>
  );
};

export default PostList;
