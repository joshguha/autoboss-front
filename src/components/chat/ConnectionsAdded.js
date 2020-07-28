import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import UserProfile from "../connections/UserProfile";

export default function ConnectionsAdded({
    connectionsAdded,
    setConnectionsAdded,
    possibleConnections,
    setPossibleConnections,
}) {
    const removeFromChat = async (user) => {
        setPossibleConnections([...possibleConnections, user]);
        setConnectionsAdded(
            connectionsAdded.filter((connection) => connection._id !== user._id)
        );
    };

    return connectionsAdded.length ? (
        <div className="create-chat__column">
            <h3>Connections added to chat:</h3>
            <ScrollToBottom>
                {connectionsAdded.map((connectionAdded, i) => (
                    <div key={i}>
                        <UserProfile
                            user={connectionAdded}
                            button="-"
                            fn={removeFromChat}
                        />
                    </div>
                ))}
            </ScrollToBottom>
        </div>
    ) : (
        <h3>No connections currently added</h3>
    );
}
