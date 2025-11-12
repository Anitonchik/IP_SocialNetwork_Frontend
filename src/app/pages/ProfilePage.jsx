import Profile from "../../components/profile/Profile";
import PostsList from "../../components/profile/PostsProfileList";
import UserModel from "../../../components/api/modelUser";
import PostModel from "../../../components/api/modelPost";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  let model;
  let postModel;

  const { userId } = useParams(); 
  
  const [usersProfile, setUserProfile] = useState({});
  const [usersProfilePosts, setUsersProfilePosts] = useState([]);
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
        model = new UserModel();
        postModel = new PostModel();
        const usersProfileData = await model.getUser(userId);

        //userId = JSON.parse(localStorage.getItem('userSettings')).userId;

        //alert(JSON.stringify(userData))
        setUserProfile(usersProfileData);
        setUsersProfilePosts(await postModel.getAll("usersPosts/" + userId))
        setLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (!loading) {
    return (
      <div>
        <Profile user={usersProfile} posts={usersProfilePosts}/>
        <PostsList user={usersProfile} />
      </div>
    );
  }
};

export default ProfilePage;
