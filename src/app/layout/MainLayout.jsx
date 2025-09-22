import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const MainLayout = () => {
    return (
        <div className="background p-2" style={{ minHeight: "100vh" }}>
            <Header />
            <main className="flex-grow-1">
                <Outlet />
            </main>
        </div>
    );
};
