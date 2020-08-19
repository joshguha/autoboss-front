import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Sidebar from "../layout/Sidebar";
import ConnectionsToAdd from "../chat/ConnectionsToAdd";
import ConnectionsAdded from "../chat/ConnectionsAdded";
import ErrorNotice from "../misc/ErrorNotice";

export default function CreateChat() {
    const [roomName, setRoomName] = useState("");
    const [connectionForm, setconnectionForm] = useState("");
    const [connectionsAdded, setConnectionsAdded] = useState([]);
    const [error, setError] = useState("");
    const { userData, setUserData } = useContext(UserContext);
    const [possibleConnections, setPossibleConnections] = useState(
        userData.user.connections
    );
    const [filteredConnections, setFilteredConnections] = useState([]);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (!roomName) {
                setError("No room name set");
                return;
            }
            const res = await Axios.post(
                "https://autoboss-back.herokuapp.com/chat/",
                {
                    roomName,
                    connectionsAdded,
                },
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
            if (res.data) {
                setUserData({
                    ...userData,
                    user: {
                        ...userData.user,
                        chatrooms: [...userData.user.chatrooms, res.data],
                    },
                });
                history.push(`/chat/${res.data._id}`);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setError("");
    }, [roomName]);

    useEffect(() => {
        setFilteredConnections(
            possibleConnections
                .filter(
                    ({ firstName, lastName, email }) =>
                        firstName
                            .toLowerCase()
                            .includes(connectionForm.toLowerCase()) ||
                        lastName
                            .toLowerCase()
                            .includes(connectionForm.toLowerCase()) ||
                        email
                            .toLowerCase()
                            .includes(connectionForm.toLowerCase())
                )
                .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
        );
    }, [possibleConnections, connectionForm]);

    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                <h2>Create chat</h2>
                <form className="form" onSubmit={submit}>
                    <label className="form__label" htmlFor="room-name">
                        Chat name
                    </label>
                    <input
                        className="form__input"
                        id="room-name"
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                    <label className="form__label" htmlFor="connection-to-add">
                        Search for connections to add
                    </label>
                    <input
                        className="form__input"
                        id="connection-to-add"
                        type="text"
                        value={connectionForm}
                        onChange={(e) => setconnectionForm(e.target.value)}
                    />
                    {error && <ErrorNotice message={error} />}
                    <input type="submit" value="Create" />
                </form>
                <div className="create-chat__container">
                    <ConnectionsToAdd
                        connectionsAdded={connectionsAdded}
                        setConnectionsAdded={setConnectionsAdded}
                        possibleConnections={possibleConnections}
                        setPossibleConnections={setPossibleConnections}
                        filteredConnections={filteredConnections}
                    />

                    <ConnectionsAdded
                        connectionsAdded={connectionsAdded}
                        setConnectionsAdded={setConnectionsAdded}
                        possibleConnections={possibleConnections}
                        setPossibleConnections={setPossibleConnections}
                    />
                </div>
            </div>
        </div>
    );
}
