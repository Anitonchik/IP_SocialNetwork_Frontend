import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../../../styles.css"
import "./Header.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { List } from 'react-bootstrap-icons';
import { useMediaQuery } from 'react-responsive';

export const Header = ({ headerData }) => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
    
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isChatPage = location.pathname.startsWith('/somechat/');

    //console.log(headerData)

    useEffect(() => {
        const handleStorage = () => {
            setIsAuth(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    useEffect(() => {
        setIsAuth(!!localStorage.getItem("token"));
    });

    useEffect(() => {
        setIsOpen(false)
    }, [location]);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };    
  
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);   

     const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
    }
    
    if (isAuth) {
         const userId = localStorage.getItem("userId");
        if (localStorage.getItem("role") === 'USER') {

            return (
                <header className="container-background container d-flex justify-content-between align-items-center p-2 gap-5 mt-0 mb-0" style={{ maxWidth: 1000 }} >
                    <nav className="d-flex ms-2 gap-md-5 gap-2 flex-row align-items-center">
                        <NavLink className="main-text-hover align-items-center" to="/">
                            Main
                        </NavLink>

                        {(isChatPage && headerData) && (
                                <div className="d-flex align-items-center gap-3" onClick={() => navigate(`/profile/${headerData.user.id}`)}> 
                                    <img 
                                        src={headerData.correspondenceUser.userAvatarURL} 
                                        alt={"avatar"}
                                        className="profile d-flex align-items-center"
                                    />
                                    <div className="main-text">{headerData.correspondenceUser.userName}</div>
                                </div>
                            )}
                    </nav>
                    {(!isMobile) && (
                        <nav className="d-flex flex-row align-items-center me-2">

                            <div className="main-nav flex-end">
                                <ul className={`nav-list`}>
                                    <NavLink className="main-text-hover nav-list-link" to="/chats">
                                        Chats
                                    </NavLink>
                                    <NavLink className="main-text-hover nav-list-link" to={`/users/users/${userId}`}>
                                        Users
                                    </NavLink>
                                    <NavLink className="main-text-hover nav-list-link" to={`/profile/${userId}`}>
                                        Profile
                                    </NavLink>
                                </ul>
                            </div>

                            <div className="main-nav flex-end">
                                <List 
                                    size={35} 
                                    className="hamburger main-text-hover" 
                                    onClick={toggleMenu}
                                />
                                <ul className={`nav-list-hamburger ${isOpen ? 'open' : ''}`}>
                                    
                                    <NavLink className="main-text-hover nav-list-link-hamburger" to="/settings">
                                        Settings
                                    </NavLink>
                                    <NavLink className="main-text-hover nav-list-link-hamburger" onClick={logout} to="/">
                                        Logout
                                    </NavLink>
                                </ul>
                            </div>

                        </nav>
                    )}

                    {(isMobile) && (
                        <nav className="main-nav flex-end">
                            <List 
                                size={35} 
                                className="hamburger main-text-hover" 
                                onClick={toggleMenu}
                            />
                            <ul className={`nav-list-hamburger ${isOpen ? 'open' : ''}`}>
                                <NavLink className="main-text-hover nav-list-link-hamburger" to="/settings">
                                    Settings
                                </NavLink>
                                <NavLink className="main-text-hover nav-list-link-hamburger" to="/chats">
                                    Chats
                                </NavLink>
                                <NavLink className="main-text-hover nav-list-link-hamburger" to={`/profile/${userId}`}>
                                    Profile
                                </NavLink>
                                <NavLink className="main-text-hover nav-list-link-hamburger" to={`/users/users/${userId}`}>
                                        Users
                                </NavLink>
                                <NavLink className="main-text-hover nav-list-link-hamburger" onClick={logout} to="/">
                                    Logout
                                </NavLink>
                            </ul>
                        </nav>
                    )}                    
                </header>
            );
        }
        else {
            return (
            <header className="container-background container d-flex justify-content-between align-items-center p-2 gap-5 mt-0 mb-0" style={{ maxWidth: 1000 }} >
                    <nav className="d-flex gap-1 gap-md-5 gap-2 align-items-center">
                        <NavLink className="main-text-hover align-items-center" to={`/profile/${userId}`}>
                            Posts
                        </NavLink>

                    </nav>
                    
                    <nav className="main-nav flex-row nav-list">
                        
                        <NavLink className="main-text-hover nav-list-link" to="/settings">
                            Settings
                        </NavLink>
                        <NavLink className="main-text-hover nav-list-link" to={`/users`}>
                            Users
                        </NavLink>
                        <NavLink className="main-text-hover nav-list-link" onClick={logout} to="/">
                            Logout
                        </NavLink>
                    </nav>
                </header>
            )
        }
    }
    else {
        return (
            <header className="container-background container d-flex justify-content-between align-items-center p-2 gap-5 mt-0 mb-0" style={{ maxWidth: 1000 }} >
                <nav className="d-flex gap-1 gap-md-5 gap-2 flex-row align-items-center">
                    <NavLink className="main-text-hover align-items-center" to="/">
                        Main
                    </NavLink>
                </nav>
                
                <nav className="main-nav flex-end">
                    <ul className={`nav-list`}>
                        <NavLink className="main-text-hover nav-list-link" to="/login">
                            Login
                        </NavLink>
                    </ul>
                </nav>
            </header>
        )
    };
};

/*<nav className="main-nav flex-end">
                            <List 
                                size={35} 
                                className="hamburger" 
                                onClick={toggleMenu}
                            />
                            <ul className={`nav-list ${isOpen ? 'open' : ''}`}>
                                <NavLink className="main-text nav-list-link" to="/settings">
                                    Settings
                                </NavLink>
                                <NavLink className="main-text nav-list-link" to="/chats">
                                    Chats
                                </NavLink>
                                <NavLink className="main-text nav-list-link" to={`/profile/${userId}`}>
                                    Profile
                                </NavLink>
                            </ul>
                        </nav>*/