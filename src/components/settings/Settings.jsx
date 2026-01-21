import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../components/api/modelUser";
import PostModel from "../../../components/api/modelPost";
import "../../../styles.css"
import defaultAvatar from '../../../resources/defaultAvatar.jpg';

const Settings = () => {
    const [user, setUser] = useState({});
    const [usersProfilePosts, setUsersProfilePosts] = useState(null);
    const [userFollowers, setUserFollowers] = useState([]);
    const [userSubscriptions, setUserSubscriptions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();


    const [editedUser, setEditedUser] = useState({
        description: "",
        name: "",
        surname: "",
        username: ""
      });

    
    useEffect(() => {
      if (localStorage.getItem("token") == null) {
        navigate("/");
      }
    })


    useEffect(() => {
        setEditedUser({ ...user });
    }, [user]);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const model = new UserModel();
            const postModel = new PostModel();

            const userId = localStorage.getItem('userId');
            
            const followers = await model.getUsers(`users/followers?page=${1}&size=${5}&userId=${userId}`)
            setUserFollowers(followers.totalItems);

            const subscriptions = await model.getUsers(`users/subscriptions?page=${1}&size=${5}&userId=${userId}`)
            setUserSubscriptions(subscriptions.totalItems);

            const userData = await model.getUser(userId);
            const posts = await postModel.getAll(`posts/usersPosts/${userId}?page=${1}&size=5`);
            setUser(userData);
            setUsersProfilePosts(posts.totalItems)
          } catch (error) {
            console.error("Ошибка загрузки пользователя:", error);
          }
        };
        fetchUser();
        
    }, []);

    const handleChange = (field, value) => {
        setEditedUser(prevState => ({
          ...prevState,
          [field]: value
        }));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        navigate("/");
    }

    
    return (
        <>
        
            <div className="d-flex flex-md-row-reverse flex-column container gap-md-3" style={{maxWidth: '1000px', height: '100hv'}}>

                <div className="text-center container container-background setting-profile col-md-3 gap-3">
                    <div className="input-file-row">
                        <img className="profile" style={{width: '80px', height: '80px'}} src={(user.userAvatarURL?.length > 0) ? user.userAvatarURL : defaultAvatar} alt="avatar"/>
                    </div>
                    <div>
                        <div className="d-flex status-container">
                            <div className="setting-text status-label">Status</div>
                            <div className="main-text status-text" style={{fontSize: '14px'}}>{user.userDescription}</div>
                        </div>
                    </div>
                </div>

                <div className="container container-background col-12 col-md-9">
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Name</div>
                        <div className="main-text" style={{fontSize: '14px'}} >{user.firstName}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Surname</div>
                        <div className="main-text" style={{fontSize: '14px'}} >{user.lastName}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">User name</div>
                        <div className="main-text" style={{fontSize: '14px'}} >{user.userName}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Page address</div>
                        <div className="main-text" style={{fontSize: '14px'}} >{user.pageAddress}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Phone</div>
                        <div className="main-text" style={{fontSize: '14px'}}>{user.phone}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Publications</div>
                        <div className="main-text" style={{fontSize: '14px'}} >{usersProfilePosts}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Followers</div>
                        <div className="main-text" style={{fontSize: '14px'}} >{userFollowers}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Subscriptions</div>
                        <div className="main-text" style={{fontSize: '14px'}} >{userSubscriptions}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="main-text-hover" style={{fontSize: '14px'}} onClick={logout}>Logout</div>
                    </div>
                    
                </div>
                
            </div>
            {/*<button
                    id="createPostButton"
                    className="btn btn-light button-sbc container"
                    style={{maxWidth: '1000px', margin: 'auto'}}
                    onClick={() => {
                    setUrl("");
                    setText("");
                    setIsEditing(false);
                    setIsCreating(true);
                    }}
                >
                    Edit
                </button>*/}

        </>
        
    )
}

export default Settings;