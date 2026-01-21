import Profile from "../../components/profile/Profile";
import PostsList from "../../components/profile/PostsProfileList";
import UserModel from "../../../components/api/modelUser";
import PostModel from "../../../components/api/modelPost";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate()
  const { userId } = useParams(); 
  
  const [usersProfile, setUserProfile] = useState({});
  const [usersProfilePosts, setUsersProfilePosts] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      if (localStorage.getItem("token") == null) {
        navigate("/");
      }
    })
    

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const model = new UserModel();
        const postModel = new PostModel();
        const usersProfileData = await model.getUser(userId);

        setUserProfile(usersProfileData);

        const posts = await postModel.getAll(`posts/usersPosts/${userId}?page=${1}&size=5`)
        setUsersProfilePosts(posts.totalItems)
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
        <Profile user={usersProfile} postsTotalItems={usersProfilePosts}/>
        <PostsList user={usersProfile} />
      </div>
    );
  }
};

export default ProfilePage;
