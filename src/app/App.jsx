import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import  ProfilePage  from "./pages/ProfilePage";
import  MainPage  from "./pages/MainPage"
import ChatList from "../components/chats/Chats";
import Settings from "../components/settings/Settings";
import ChatWindow from "../components/chats/ChatWindow";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />
                    <Route path="/chats" element={<ChatList />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/somechat/:chatId" element={<ChatWindow />} />
                    <Route path="*" element={<MainPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
