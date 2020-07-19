import React, { useState, useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../contexts/UserContext";
import InfoBar from "../chat/InfoBar";
import Messages from "../chat/Messages";
import InputMessage from "../chat/InputMessage";
import TextContainer from "../chat/TextContainer";

export default function Chatroom() {
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const { pathname } = useLocation();
    const { userData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        const retrieveChatroomData = async () => {
            try {
                const url = `http://localhost:5000${pathname}`;
                if (!pathname.includes("chat")) return;
                const res = await Axios.get(url, {
                    headers: { "x-auth-token": userData.token },
                });
                if (res.data) {
                    setName(res.data.name);
                    setUsers(res.data.users);
                    setMessages(res.data.messages);
                }
            } catch (error) {
                history.push("/dashboard");
            }
        };

        retrieveChatroomData();
    }, [userData.token, pathname, history]);

    return (
        <div>
            <InfoBar room={name} />
            <Messages messages={messages} userID={userData.user.id} />
            <InputMessage
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
                messages={messages}
                setMessages={setMessages}
            />
            <TextContainer users={users} />
        </div>
    );
}
