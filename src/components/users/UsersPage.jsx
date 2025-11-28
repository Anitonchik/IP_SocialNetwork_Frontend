import UserModel from "../../../components/api/modelUser.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import User from "./User.jsx"

const UsersPage = () => {
    const userModel = new UserModel();
    //const userId = JSON.parse(localStorage.getItem('userSettings')).userId;
    const [users, setUsers] = useState([]);
    

    const { usersListType, userIdForList } = useParams();
    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                //userModel = new UserModel();
                if (usersListType === "followers") {
                    setUsers(await userModel.getFollowers(userIdForList))
                    
                }
                else if (usersListType === "subscriptions") {
                    setUsers(await userModel.getSubscriptions(userIdForList))
                    alert(users)
                }
                else if (usersListType === "users") {
                    // TODO вытаскивать просто пользователей
                }
            } catch (error) {
              console.error("Ошибка загрузки пользователя:", error);
            }
          };

          fetchUser();
          console.log(users)
        
    }, [])

    /*useEffect(() => {
        console.log("Users updated:", users);
        
    }, [users]); // срабатывает только при изменении списка*/
    
    
    alert(JSON.stringify(users));
    return(
        <>
            {(users) && ([...users].map((correspondenceUser) => (
                <User 
                    userIdForList={userIdForList}
                    correspondenceUser={correspondenceUser}
                ></User>
            )))}
            
        </>
    )
}

export default UsersPage;