import React, { useEffect, useState } from "react";
import Post from "./Post.jsx";
import PostEditor from "./PostEditor.jsx";
import PostModel from "../../../components/api/modelPost.js";
import "../../../styles.css";

const PostsList = ({user}) => {
  const [isUsersPage, setIsUsersPage] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const model = new PostModel()


  useEffect(() => {
    if (user.id == JSON.parse(localStorage.getItem('userSettings')).userId) {
      setIsUsersPage(true);
    } //ТУТ ПОМЕНЯТЬ USERID)
    model.getAll("usersPosts/" + user.id).then(setPosts);
  }, [user]);


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
    {(isUsersPage) && (
      <>
        <PostEditor
          onAddPost={addPost}
          onUpdatePost={updatePost}
          editingPost={editingPost}
          cancelEdit={cancelEdit}
        />

        <div style={{ maxWidth: 1000, margin: "10px auto" }}>
          {[... posts].reverse().map((post) => (
            
            <Post key={post.id} post={post} onDelete={deletePost} onEdit={editPost} showButtons={true} />
          ))}
        </div>
      </>
    )}

    {(!isUsersPage) && (
      <div style={{ maxWidth: 1000, margin: "10px auto" }}>
      {[... posts].reverse().map((post) => (
        
        <Post key={post.id} post={post} onDelete={deletePost} onEdit={editPost} showButtons={false} />
      ))}
    </div>
    )}
    </>
  );
};

export default PostsList;
