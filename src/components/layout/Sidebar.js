import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import SidebarChatroom from "./SidebarChatroom";
import UserInfo from "./UserInfo";

export default function Sidebar() {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const chatrooms = userData.user.chatrooms;

    return (
        <div className="sidebar">
            <UserInfo />
            <Link to="/tasks">
                <h3>Tasks</h3>
            </Link>
            <Link to="/connections">
                <h3>Connections</h3>
            </Link>
            <div className="sidebar__messaging">
                <h3>Messaging</h3>
                <button
                    onClick={() => {
                        history.push("/create-chat");
                    }}
                >
                    +
                </button>
            </div>
            {chatrooms.length > 0
                ? chatrooms.map((chatroom, index) => {
                      return (
                          <SidebarChatroom
                              key={index}
                              chatName={chatroom.name}
                              chatID={chatroom._id}
                          />
                      );
                  })
                : null}
        </div>
    );
}
