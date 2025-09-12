import React from "react";
import Profile from "../../components/profile/Profile";
import PostsList from "../../components/profile/PostsProfileList";
import UserModel from "../../../components/post/modelUser";
import { useState } from "react";
import { useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  /*это потом убрать, тк так я запоминаю id пользователя, который зашел в соцсеть*/
  const userSettings = { userId: 1 };
  localStorage.setItem('userSettings', JSON.stringify(userSettings));

  /*const model = new UserModel();
  const user = model.getUser(JSON.parse(localStorage.getItem('userSettings')).userId);
  alert("page " + JSON.stringify(user))*/

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const model = new UserModel();
        const userId = JSON.parse(localStorage.getItem('userSettings')).userId;
        const userData = await model.getUser(userId);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (!loading) {
    return (
      <div>
        <Profile user={user}/>
        <PostsList />
      </div>
    );
  }
};

export default ProfilePage;
