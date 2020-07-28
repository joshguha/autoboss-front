import React, { useState, useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import io from "socket.io-client";
import UserContext from "../../contexts/UserContext";
import Sidebar from "../layout/Sidebar";
import InfoBar from "../chat/InfoBar";
import Messages from "../chat/Messages";
import InputMessage from "../chat/InputMessage";
import TextContainer from "../chat/TextContainer";

let socket;

export default function Chatroom() {
    const [roomData, setRoomData] = useState({});
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const { pathname } = useLocation();
    const { userData } = useContext(UserContext);
    const history = useHistory();

    // Connect to server socket.io and retrieve chatroom data
    useEffect(() => {
        socket = io("http://localhost:5000/");
        socket.emit(
            "join",
            { userID: userData.user._id, pathname },
            (chatroom) => {
                if (chatroom) {
                    const { _id, name, users, messages } = chatroom;
                    setRoomData({ _id, name, users });
                    setMessages(messages);
                } else {
                    history.push("/dashboard");
                }
            }
        );
    }, [history, pathname, userData]);

    // Update on server message
    useEffect(() => {
        socket.on("message", (message) => {
            
            setMessages((messages) => [...messages, message]);
        });
    }, []);

    // Cleanup, disconnect socket
    useEffect(() => {
        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        socket.emit(
            "sendMessage",
            {
                message: currentMessage,
                roomID: roomData._id,
                userID: userData.user._id,
            },
            () => {
                setCurrentMessage("");
            }
        );
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                <div className="box">
                    <InfoBar {...roomData} />
                    <Messages messages={messages} />
                    <InputMessage
                        currentMessage={currentMessage}
                        setCurrentMessage={setCurrentMessage}
                        sendMessage={sendMessage}
                    />
                </div>

                <TextContainer users={roomData.users} />
            </div>
        </div>
    );
}
