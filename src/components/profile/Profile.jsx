import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserModel from "../../../components/api/modelUser";
import "../../../styles.css";
import defaultAvatar from '../../../resources/defaultAvatar.jpg';

const Profile = ({user, postsTotalItems}) => {
  const [userFollowers, setUserFollowers] = useState(0);
  const [userSubscriptions, setUserSubscriptions] = useState(0);
  let userModel;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        userModel = new UserModel();
        const subscriptionsAndfollowers = await userModel.getUsers(`users/subscriptionsAndFollowers/count?userId=${user.id}`)
        setUserSubscriptions(subscriptionsAndfollowers.subscriptionsCount);
        setUserFollowers(subscriptionsAndfollowers.followersCount);
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
      } 
    };

    fetchUser();
  }, [user, postsTotalItems]);

  return (
    <>
    {(user) && (
    <div
      className="d-flex flex-column justify-content-between ms-auto me-auto p-3 container container-background profile-info"
      style={{ maxWidth: 1000 }}
    >
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex justify-content-around align-items-center gap-3">
          <img className="profile-info-img" src={(user.userAvatarURL.length > 0) ? user.userAvatarURL : defaultAvatar} alt="avatar" />
          <div className="main-text">{user.userName}</div>
        </div>
        { (localStorage.getItem("role") === 'USER') && (
        <div className="d-flex profile-inf-firsttrio justify-content-md-between profile-inf me-0 me-md-5">
          <div>
            <p className="text-center main-text">Publications</p>
            <p className="text-center main-text">{postsTotalItems}</p>
          </div>
          <NavLink to={`/users/followers/${user.id}`} className="text-decoration-none">
            <div className="main-text-hover">
              <p className="text-center">Followers</p>
              <p className="text-center">{userFollowers}</p>
            </div>
          </NavLink>
          <NavLink to={`/users/subscriptions/${user.id}`} className="text-decoration-none">
            <div className="main-text-hover">
              <p className="text-center">Subscriptions</p>
              <p className="text-center">{userSubscriptions}</p>
            </div>
          </NavLink>
        </div>
        )}
      </div>
      <div className="profile-info-discription">{user.userDescription}</div>
    </div>
  )}
  </>);
};

export default Profile;
