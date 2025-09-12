import { NavLink } from "react-router-dom";
import "../../../styles.css"
import 'bootstrap/dist/css/bootstrap.min.css'

export const Header = () => {
    return (
        <header className="container-background container d-flex justify-content-between p-2 gap-5 mt-0 mb-0" style={{ maxWidth: 1000 }} >
            <NavLink className="nav-link" to="/">
                Главная
            </NavLink>
            <nav className="d-flex flex-grow-1 justify-content-right gap-3">
                <NavLink className="main-text" to="/settings">
                    Настройки
                    <i class="bi bi-intersect" style="color: #fffacd;"></i>
                </NavLink>
                <NavLink className="main-text" to="/chats">
                    Чаты
                    <i class="bi bi-gear-fill" style="color: #fffacd;"></i>
                </NavLink>
                <NavLink className=" main-text" to="/profile">
                    Профиль
                    <i class="bi bi-messenger" style="color: #fffacd;"></i>
                </NavLink>
            </nav>
            
        </header>
    );
};
