import UserModel from "../../../components/api/modelUser.js";
import {useEffect, useState, useParams} from "react";
import UsersList from "./UsersList.jsx"

const UsersPage = () => {
    const model = new UserModel();
    const userId = JSON.parse(localStorage.getItem('userSettings')).userId;
    const [users, setUsers] = useState([]);

    const { usersListType } = useParams();

    useEffect(() => {
        if (usersListType === "followers") {
            setUsers()
        }
    }, [])
    

    return(
        <>
            {[...users].map((user) => (
                <UsersList 
                    otherUser={user}
                ></UsersList>
            ))}
        </>
    )
}

export default UsersPage;