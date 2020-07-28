import React from "react";
import UserProfile from "../connections/UserProfile";

export default function ConnectionsToAdd({
    connectionsAdded,
    setConnectionsAdded,
    possibleConnections,
    setPossibleConnections,
    filteredConnections,
}) {
    const addToChat = async (user) => {
        setConnectionsAdded([...connectionsAdded, user]);
        setPossibleConnections(
            possibleConnections.filter(
                (connection) => connection._id !== user._id
            )
        );
    };

    return (
        <div className="create-chat__column">
            <h3>Connections to add:</h3>

            {filteredConnections.map((connection, i) => (
                <div key={i}>
                    <UserProfile user={connection} button="+" fn={addToChat} />
                </div>
            ))}
        </div>
    );
}
