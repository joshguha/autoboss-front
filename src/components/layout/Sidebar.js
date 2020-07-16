import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import SidebarChat from "./SidebarChat";

export default function Sidebar() {
    const { userData } = useContext(UserContext);
    return (
        <nav>
            <h3>{userData.user.name}</h3>
            <Link to="/tasks"><h3>Tasks</h3></Link>
            <Link to="/connections"><h3>Connections</h3></Link>
            <h3>Messaging</h3>

            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />

        </nav>
    );
}
