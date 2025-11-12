import Profile from "../../components/profile/Profile";
import PostsList from "../../components/profile/PostsProfileList";
import UserModel from "../../../components/api/modelUser";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  let model;
  const { userId } = useParams(); 
  
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
        model = new UserModel();
        const userData = await model.getUser(userId);
        alert(JSON.stringify(userData))
        setUser(userData);
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
        <Profile user={user} model={model}/>
        <PostsList user={user} />
      </div>
    );
  }
};

export default ProfilePage;
