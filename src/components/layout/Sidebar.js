import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import SidebarChatroom from "./SidebarChatroom";

export default function Sidebar() {
    const { userData } = useContext(UserContext);
    return (
        <nav>
            <h3>{userData.user.name}</h3>
            <Link to="/tasks">
                <h3>Tasks</h3>
            </Link>
            <Link to="/connections">
                <h3>Connections</h3>
            </Link>
            <h3>Messaging</h3>

            <SidebarChatroom chatName={"Test Chatroom"} chatID="5f146dd24fcd2f3944409f01" />
        </nav>
    );
}
