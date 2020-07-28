import React from "react";
import { Link } from "react-router-dom";

export default function SidebarChatroom(props) {
    return (
        <div className="sidebar__chatroom">
            <Link to={`/chat/${props.chatID}`}>{props.chatName}</Link>
        </div>
    );
}
