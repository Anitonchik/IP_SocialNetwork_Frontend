import Profile from "../../components/profile/Profile";
import PostsList from "../../components/profile/PostsProfileList";
import UserModel from "../../../components/api/modelUser";
import PostModel from "../../../components/api/modelPost";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams(); 
  
  const [usersProfile, setUserProfile] = useState({});
  const [usersProfilePosts, setUsersProfilePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (localStorage.getItem("token") == null) {
        navigate("/");
      }
    })
    

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(userId)
        const model = new UserModel();
        const postModel = new PostModel();
        const usersProfileData = await model.getUser(userId);
        

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
