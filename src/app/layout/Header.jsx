import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../../styles.css"
import "./Header.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { List } from 'react-bootstrap-icons';

export const Header = ({ headerData }) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

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


    const location = useLocation();
    
    const isChatPage = location.pathname.startsWith('/somechat/');
    const chatId = isChatPage ? location.pathname.split('/')[2] : null;   
    
   
    

    return (
        <header className="container-background container d-flex justify-content-between align-items-center p-2 gap-5 mt-0 mb-0" style={{ maxWidth: 1000 }} >
            <nav className="d-flex gap-1 gap-md-5 gap-2 flex-row align-items-center">
                <NavLink className="main-text align-items-center" to="/">
                    Main
                </NavLink>

                {(isChatPage && headerData) && (
                        <div className="d-flex align-items-center gap-3" onClick={() => navigate('/user-page')}> 
                            <img 
                                src={headerData.user.userAvatarURL} 
                                alt={"avatar"}
                                className="profile d-flex align-items-center"
                            />
                            <div className="main-text">{headerData.user.userName}</div>
                        </div>
                    )}
            </nav>
            
            <nav className="main-nav flex-end">
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
                    <NavLink className=" main-text nav-list-link" to="/profile">
                        Profile
                    </NavLink>
                </ul>
            </nav>
        </header>
    );
};