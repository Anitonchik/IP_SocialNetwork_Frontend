import UserModel from "../../../components/api/modelUser.js";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import User from "./User.jsx";

const UsersPage = () => {
    const userModel = new UserModel();
    const [users, setUsers] = useState([]);
    const [userForList, setUserForList] = useState(null);
    const currentPageRef = useRef(1);
    const [fetching, setFetching] = useState(true);
    const totalPagesRef = useRef(0);
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
        setUsers([]);
        currentPageRef.current = 1;
        setFetching(true);
    }, [searchTerm, usersListType, userIdForList, isAlphabeticalSort]);

    useEffect(() => {
        if (fetching) {
            fetchUsers();
        }
    }, [fetching, searchTerm, usersListType, userIdForList, isAlphabeticalSort]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const fetchUsers = async () => {
        try {
            let data;
            const page = currentPageRef.current;
            const size = 5;
            const userId = userIdForList;
            const search = encodeURIComponent(searchTerm.trim());

            if (localStorage.getItem('role') === "USER") {
                if (usersListType === "followers") {
                   data = await userModel.getUsers(`users/followers?page=${page}&size=${size}&userId=${userId}`);
                    
                }
                else if (usersListType === "subscriptions") {
                    data = await userModel.getUsers(`users/subscriptions?page=${page}&size=${size}&userId=${userId}`);
                    
                }
                else if (usersListType === "users") {
                
                        if (searchTerm.trim().length === 0) {
                            if (isAlphabeticalSort) {
                                data = await userModel.getUsers(`users/users/sort?page=${page}&size=${size}&userId=${userId}`);
                            } else {
                                data = await userModel.getUsers(`users/users?page=${page}&size=${size}&userId=${userId}`);
                            }
                        } else {
                            if (isAlphabeticalSort) {
                                data = await userModel.getUsers(`users/users/sort/filter?page=${page}&size=${size}&userNamePart=${search}&userId=${userId}`);
                            } else {
                                data = await userModel.getUsers(`users/users/filter?page=${page}&size=${size}&userNamePart=${search}&userId=${userId}`);
                            }
                        }
                    
                }
            }
            else if (localStorage.getItem('role') === "ADMIN") {

                data = await userModel.getUsers(`users?page=${page}&size=${size}&userId=${localStorage.getItem("userId")}`);
                console.log(data)
            }

            totalPagesRef.current = data?.totalPages || 0;
            setUsers(prev => [...prev, ...(data?.items || [])]);
            currentPageRef.current += 1;
        } catch (error) {
            console.error("Ошибка загрузки пользователей:", error);
        } finally {
            setFetching(false);
        }
    };

    const scrollHandler = (e) => {
        if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
            && currentPageRef.current <= totalPagesRef.current) {
            setFetching(true);
        }
    };

    //для админа

    const handleDelete = async (user) => {
        console.log(user);
        if (user.id != localStorage.getItem("userId")) {
            await userModel.delete(user.id);
            setUsers([])
            currentPageRef.current = 1;
            await fetchUsers();
        }
    };

    return (
        <>
        
        {(localStorage.getItem("role") === 'USER' && usersListType === "users") && (
            <div className="d-flex flex-row container-background mb-3" style={{ maxWidth: 1000, padding: "10px 10px", margin: "auto", marginTop: '10px', }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by user name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {usersListType === "users" && (
                    <button
                        type="button"
                        className="btn d-flex align-items-center"
                        onClick={() => setIsAlphabeticalSort(prev => !prev)}
                    >
                        <i className="bi bi-sort-alpha-down h2" style={{ color: '#fffacd' }}></i>
                    </button>
                )}
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