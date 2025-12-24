import React, { useEffect, useState, useRef } from "react";
import Post from "./Post.jsx";
import PostModel from "../../../components/api/modelPost.js";
import "../../../styles.css";
import { data } from "react-router-dom";

const PostList = () => {
  const userId = JSON.parse(localStorage.getItem('userSettings')).userId;
  const [posts, setPosts] = useState([]);
  const currentPageRef = useRef(1);
  const [fetching, setFetching] = useState(true); // true - подгружаем данные
  const totalPagesRef = useRef(0);

  const [editingPost, setEditingPost] = useState(null);
  const model = new PostModel();

  useEffect(() => {
    if (fetching) {
      model.getAll(`posts/notUsersPosts/${userId}?page=${currentPageRef.current}&size=5` )
      .then(data => {
        totalPagesRef.current = data.totalPages;
        setPosts(prev => [...prev, ...data.items]),
        currentPageRef.current += 1})
        .finally(() => setFetching(false));
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

  return (
    <>

      <div style={{ maxWidth: 1000, margin: "10px auto" }}>
        {[... posts].map((post) => (
          <Post key={post.id} post={post} showButtons={false}/>
        ))}
      </div>
    </>
  );
};

export default PostList;
