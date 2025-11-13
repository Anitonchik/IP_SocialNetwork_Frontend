import UserModel from "../../../components/api/modelUser.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import User from "./User.jsx"

const UsersPage = () => {
    const userId = JSON.parse(localStorage.getItem('userSettings')).userId;
    const [users, setUsers] = useState([]);

    const { usersListType } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userModel = new UserModel();
                if (usersListType === "followers") {
                    setUsers(await userModel.getFollowers(userId))
                }
                else if (usersListType === "subscriptions") {
                    setUsers(await userModel.getSubscriptions(userId))
                }
                else if (usersListType === "users") {
                    // вытаскивать просто пользователей
                }
            } catch (error) {
              console.error("Ошибка загрузки пользователя:", error);
            }
          };

          fetchUser();
        
    }, [])
    

    return(
        <>
            {[...users].map((user) => (
                <User 
                    correspondenceUser={user}
                ></User>
            ))}
        </>
    )
}

export default UsersPage;