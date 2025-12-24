import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";

export const MainLayout = () => {
    const [headerData, setHeaderData] = useState(null);

    localStorage.getItem("token")

    return (
        <div className="background p-2" style={{ minHeight: "100vh" }}>
            <Header headerData={headerData}/>
            <main className="flex-grow-1">
                <Outlet context={{ setHeaderData }}/>
            </main>
        </div>
    );
};
