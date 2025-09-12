import React, { useEffect, useState } from "react";
import Post from "./Post.jsx";
import PostEditor from "./PostEditor.jsx";
import PostModel from "../../../components/post/modelPost.js";
import "../../../styles.css";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const model = new PostModel();

  useEffect(() => {
    model.getAll("usersPosts/" + JSON.parse(localStorage.getItem('userSettings')).userId).then(setPosts);
  }, []);

  const addPost = async (userId, url, text) => {
    let postDTO = {
      userId: userId,
      postImageURL: url,
      postTextContent: text
    }
    await model.createPost(postDTO);
    const updatedPosts = await model.getAll("usersPosts/" + JSON.parse(localStorage.getItem('userSettings')).userId);
    setPosts(updatedPosts);
  };

  const updatePost = async (postId, userId, url, text) => {
    let postDTO = {
      userId: userId,
      postImageURL: url,
      postTextContent: text
    }
    await model.updatePost(postId, postDTO);
    const updatedPosts = await model.getAll("usersPosts/" + JSON.parse(localStorage.getItem('userSettings')).userId);
    setPosts(updatedPosts);
    setEditingPost(null);
  };

  const deletePost = async (postId) => {
    await model.delete(postId);
    setPosts(posts.filter((p) => p.id !== postId));
    if (editingPost && editingPost.id === postId) {
      setEditingPost(null);
    }
  };

  const cancelEdit = () => setEditingPost(null);
  const editPost = (post) => setEditingPost(post);

  return (
    <>
      <PostEditor
        onAddPost={addPost}
        onUpdatePost={updatePost}
        editingPost={editingPost}
        cancelEdit={cancelEdit}
      />

      <div style={{ maxWidth: 1000, margin: "10px auto" }}>
        {[... posts].reverse().map((post) => (
          <Post key={post.id} post={post} onDelete={deletePost} onEdit={editPost} />
        ))}
      </div>
    </>
  );
};

export default PostsList;
