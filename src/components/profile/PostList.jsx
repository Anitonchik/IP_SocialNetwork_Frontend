import React, { useEffect, useState, useRef } from "react";
import Post from "./Post.jsx";
import PostModel from "../../../components/api/modelPost.js";
import "../../../styles.css";

const PostList = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  let userId = localStorage.getItem('userId');
  const [posts, setPosts] = useState([]);
  const currentPageRef = useRef(1);
  const [fetching, setFetching] = useState(true);
  const totalPagesRef = useRef(0);

  const model = new PostModel();

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("token"));
  }, [userId]);

  useEffect(() => {
       
    currentPageRef.current = 1;
    setPosts([]);
    setFetching(true);
  
  }, [isAuth]);

  useEffect(() => {
    if (!fetching) return;

    if (fetching) {
      userId = localStorage.getItem('userId');
      model.getAll(`posts/postsFromMainPage?page=${currentPageRef.current}&size=5&userId=${userId ? userId : 0}`)
        .then(data => {
          totalPagesRef.current = data.totalPages;
          setPosts(prev => [...prev, ...data.items]),
          currentPageRef.current += 1})
          .finally(() => setFetching(false));
      
    }
  }, [fetching, isAuth, userId]);

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
