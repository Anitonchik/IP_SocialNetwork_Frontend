import { useEffect } from "react";
import { useState } from "react";
import UserModel from "../../../components/api/modelUser";
import PostModel from "../../../components/api/modelPost";
import "../../../styles.css"

const Settings = () => {
    const [user, setUser] = useState({});
    const [usersProfilePosts, setUsersProfilePosts] = useState([]);
    const [userFollowers, setUserFollowers] = useState([]);
    const [userSubscriptions, setUserSubscriptions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);


    const [editedUser, setEditedUser] = useState({
        description: "",
        name: "",
        surname: "",
        username: ""
      });


    useEffect(() => {
        setEditedUser({ ...user });
    }, [user]);


    useEffect(() => {
        const fetchUser = async () => {
          try {
            const model = new UserModel();
            const postModel = new PostModel();

            const userId = JSON.parse(localStorage.getItem('userSettings')).userId;
            const userData = await model.getUser(userId);
            setUser(userData);
            setUserFollowers(await model.getFollowers(userId));
            setUserSubscriptions(await model.getSubscriptions(userId));
            setUsersProfilePosts(await postModel.getAll("usersPosts/" + userId))
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

    

    /*const handleFieldClick = (fieldName) => {
        setEditingField(fieldName);
      };
    
      const handleInputChange = (e) => {
        const { value } = e.target;
        setEditedUser({ ...editedUser, [editingField]: value });
      };
    
      const handleInputBlur = () => {
        setEditingField(null);
        if (editedUser[editingField] !== user[editingField]) {
          onUpdateUser(editedUser);
        }
      };
    
      const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
          setEditingField(null);
          if (editedUser[editingField] !== user[editingField]) {
            onUpdateUser(editedUser);
          }
        }
      };*/


    
    return (
        <>
        
            <div className="d-flex flex-md-row-reverse flex-column container gap-md-3" style={{maxWidth: '1000px', height: '100hv'}}>

                <div className="text-center container container-background setting-profile col-md-3">
                    <div className="input-file-row">
                        <img className="profile" style={{width: '80px', height: '80px'}} src={user.userAvatarURL} alt="avatar"/>
                    </div>
                    <div>
                        <div className="d-flex justify-content-between">
                            <div className="setting-text">Status</div>
                            <div className="setting-inf">{user.userDescription}</div>
                        </div>
                    </div>
                </div>

                <div className="container container-background col-12 col-md-9">
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Name</div>
                        <div className="setting-inf" >{user.firstName}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Surname</div>
                        <div className="setting-inf">{user.lastName}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">User name</div>
                        <div className="setting-inf">{user.userName}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Page address</div>
                        <div className="setting-inf">{user.pageAddress}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Phone</div>
                        <div className="setting-inf">{user.phone}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Publications</div>
                        <div className="setting-inf">{usersProfilePosts.length}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Followers</div>
                        <div className="setting-inf">{userFollowers.length}</div>
                    </div>
                    <div className="d-flex justify-content-between setting">
                        <div className="setting-text">Subscriptions</div>
                        <div className="setting-inf">{userSubscriptions.length}</div>
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