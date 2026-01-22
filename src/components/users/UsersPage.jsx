import UserModel from "../../../components/api/modelUser.js";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import User from "./User.jsx";

const UsersPage = () => {
    const userModel = new UserModel();
    const [users, setUsers] = useState([]);
    const [userForList, setUserForList] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAlphabeticalSort, setIsAlphabeticalSort] = useState(false);

    const { usersListType, userIdForList } = useParams();

    useEffect(() => {
        if (localStorage.getItem('role') === "USER") {
            const fetchUserForList = async () => {
                setUserForList(await userModel.getUser(userIdForList));
            }
            fetchUserForList();
        }
        fetchUsers()
    }, [searchTerm, usersListType, userIdForList, isAlphabeticalSort]);


    const fetchUsers = async () => {
        try {
            let data;
            const userId = userIdForList;

            if (localStorage.getItem('role') === "USER") {
                if (usersListType === "followers") {
                   data = await userModel.getUsers(`users/followers?userId=${userId}`);
                    
                }
                else if (usersListType === "subscriptions") {
                    data = await userModel.getUsers(`users/subscriptions?userId=${userId}`);
                    
                }
                else if (usersListType === "users") {
                    data = await userModel.getUsers(`users/users?userId=${userId}`);
                }

                
            }
            else if (localStorage.getItem('role') === "ADMIN") {

                data = await userModel.getUsers(`users?userId=${localStorage.getItem("userId")}`);
                console.log(data)
            }

            if (searchTerm.trim().length != 0) {
                const searchLower = searchTerm.trim().toLowerCase(); 
                data = data.filter(u => u.userName.toLowerCase().includes(searchLower));
            }

            if (isAlphabeticalSort) { 
                data = data.sort((a, b) => a.userName.localeCompare(b.userName)); 
            }

            setUsers(data);
        } catch (error) {
            console.error("Ошибка загрузки пользователей:", error);
        }   
    };

    //для админа

    const handleDelete = async (user) => {
        console.log(user);
        if (user.id != localStorage.getItem("userId")) {
            await userModel.delete(user.id);
            setUsers([])
            await fetchUsers();
        }
    };

    return (
        <>
        
        {(localStorage.getItem("role") === 'USER') && (
            <div className="d-flex flex-row container-background mb-3" style={{ maxWidth: 1000, padding: "10px 10px", margin: "auto", marginTop: '10px', }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by user name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <button
                    type="button"
                    className="btn d-flex align-items-center"
                    onClick={() => setIsAlphabeticalSort(prev => !prev)}
                >
                    <i className="bi bi-sort-alpha-down h2" style={{ color: '#fffacd' }}></i>
                </button>
                
            </div>)}


            {(users.length > 0) ? (
                <>
                {(localStorage.getItem("role") === 'USER') && (
                    users.map((correspondenceUser) => (
                    <User
                        key={correspondenceUser.id}
                        userForList={userForList}
                        correspondenceUser={correspondenceUser}
                    />
                    ))
                )}
                {(localStorage.getItem("role") === 'ADMIN') && (
                    users.map((correspondenceUser) => (
                        <User
                        userForList={localStorage.getItem("userId")}
                        correspondenceUser={correspondenceUser}
                        handleDelete={handleDelete}                   
                        />
                    ))
                )}
                </>

            ) : (<div className="text-center">There are no users...</div>)}
        </>
    );
};

export default UsersPage;