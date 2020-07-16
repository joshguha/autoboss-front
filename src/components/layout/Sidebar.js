import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function Sidebar() {
    const { userData } = useContext(UserContext);
    console.log(userData);
    return (
        <nav>
            <h3>{userData.user.name}</h3>
            <Link to="/tasks">Tasks</Link>
        </nav>
    );
}
