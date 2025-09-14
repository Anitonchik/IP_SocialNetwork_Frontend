import { NavLink } from "react-router-dom";
import "../../../styles.css"
import 'bootstrap/dist/css/bootstrap.min.css'

export const Header = () => {
    return (
        <header className="container-background container d-flex p-2 gap-5 mt-0 mb-0" style={{ maxWidth: 1000 }} >
            <>
            <NavLink className="main-text" to="/">
                Main
            </NavLink>
            </>
            <>
            <nav className="d-flex justify-content-end flex-grow-1 gap-3 mr-1">
                <NavLink className="main-text" to="/settings">
                    Settings
                </NavLink>
                <NavLink className="main-text" to="/chats">
                    Chats
                </NavLink>
                <NavLink className=" main-text" to="/profile">
                    Profile
                </NavLink>
            </nav>
            </>
            
        </header>
    );
};
