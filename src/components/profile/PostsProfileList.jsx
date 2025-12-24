import React, { useEffect, useState, useRef } from "react";
import Post from "./Post.jsx";
import PostEditor from "./PostEditor.jsx";
import PostModel from "../../../components/api/modelPost.js";
import "../../../styles.css";

const PostsList = ({user}) => {
  const [isUsersPage, setIsUsersPage] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const currentPageRef = useRef(1);
  const [fetching, setFetching] = useState(true);
  const totalPagesRef = useRef(0);

  const model = new PostModel()

  useEffect(() => {
      if (user.id == localStorage.getItem('userId')) {
      setIsUsersPage(true);
    } 
      if (fetching) {
        if (localStorage.getItem('role') === "USER") {
          model.getAll(`posts/usersPosts/${user.id}?page=${currentPageRef.current}&size=5` )
          .then(data => {
            totalPagesRef.current = data.totalPages;
            setPosts(prev => [...prev, ...data.items]),
            currentPageRef.current += 1})
            .finally(() => setFetching(false));
        }
        else if (localStorage.getItem('role') === "ADMIN") {
          model.getAll(`posts?page=${currentPageRef.current}&size=5` )
          .then(data => {
            totalPagesRef.current = data.totalPages;
            setPosts(prev => [...prev, ...data.items]),
            currentPageRef.current += 1})
            .finally(() => setFetching(false));
        }
      }
    }, [fetching]);
  
    useEffect(() => {
      document.addEventListener('scroll', scrollHandler)
      return function() {
        document.removeEventListener('scroll', scrollHandler)
      }
    }, [])
  
    const scrollHandler = (e) => {
      if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
            && currentPageRef.current <= totalPagesRef.current) {
        setFetching(true)
      }
    }


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
    {(isUsersPage || localStorage.getItem('role') === "ADMIN") && (
      <>
        <PostEditor
          onAddPost={addPost}
          onUpdatePost={updatePost}
          editingPost={editingPost}
          cancelEdit={cancelEdit}
        />

        <div style={{ maxWidth: 1000, margin: "10px auto" }}>
          {[... posts].map((post) => (
            
            <Post key={post.id} post={post} onDelete={deletePost} onEdit={editPost} showButtons={true} />
          ))}
        </div>
      </>
    )}

    {(!isUsersPage && localStorage.getItem('role') != "ADMIN") && (
      <div style={{ maxWidth: 1000, margin: "10px auto" }}>
      {[... posts].map((post) => (
        
        <Post key={post.id} post={post} onDelete={deletePost} onEdit={editPost} showButtons={false} />
      ))}
    </div>
    )}
    </>
  );
};

export default PostsList;
