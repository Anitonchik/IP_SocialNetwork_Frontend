import React, { useState } from "react";
import "../../../styles.css";

const Profile = ({user}) => {

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
        <div className="d-flex justify-content-md-between profile-inf me-0 me-md-5">
          <div>
            <p className="text-center main-text">Publications</p>
            <p className="text-center main-text">{user.publications}</p>
          </div>
          <div>
            <p className="text-center main-text">Followers</p>
            <p className="text-center main-text">{user.followers}</p>
          </div>
          <div>
            <p className="text-center main-text">Subscriptions</p>
            <p className="text-center main-text">{user.subscriptions}</p>
          </div>
        </div>
      </div>
      <div className="profile-info-discription">{user.userDescription}</div>
    </div>
  )}
  </>);
};

export default Profile;
