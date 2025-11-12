import React, { useEffect, useState } from "react";
import UserModel from "../../../components/api/modelUser";
import "../../../styles.css";

const Profile = ({user, posts}) => {
  const [userFollowers, setUserFollowers] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  let userModel;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        userModel = new UserModel();
        
        setUserFollowers(await userModel.getFollowers(user.id));
        setUserSubscriptions(await userModel.getSubscriptions(user.id));
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
      }
    };

    fetchUser();
  }, [user, posts]);

  return (
    <>
    {(user) && (
    <div
      className="d-flex flex-column justify-content-between ms-auto me-auto p-3 container container-background profile-info"
      style={{ maxWidth: 1000 }}
    >
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex justify-content-around align-items-center gap-3">
          <img className="profile-info-img" src={user.userAvatarURL} alt="avatar" />
          <div className="main-text">{user.userName}</div>
        </div>
        <div className="d-flex profile-inf-firsttrio justify-content-md-between profile-inf me-0 me-md-5">
          <div>
            <p className="text-center main-text">Publications</p>
            <p className="text-center main-text">{posts.length}</p>
          </div>
          <div>
            <p className="text-center main-text">Followers</p>
            <p className="text-center main-text">{userFollowers.length}</p>
          </div>
          <div>
            <p className="text-center main-text">Subscriptions</p>
            <p className="text-center main-text">{userSubscriptions.length}</p>
          </div>
        </div>
      </div>
      <div className="profile-info-discription">{user.userDescription}</div>
    </div>
  )}
  </>);
};

export default Profile;
