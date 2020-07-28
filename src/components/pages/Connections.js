import React, { useContext, useState } from "react";
import Axios from "axios";
import Sidebar from "../layout/Sidebar";
import NewConnectionForm from "../connections/NewConnectionForm";
import PendingConnectionsList from "../connections/PendingConnectionsList";
import UserContext from "../../contexts/UserContext";
import UserProfile from "../connections/UserProfile";
import ConfirmModal from "../misc/ConfirmModal";

export default function Connections() {
    const { userData, setUserData } = useContext(UserContext);
    const connections = userData.user.connections;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState({});

    const removeUser = async () => {
        try {
            const res = await Axios.delete(
                "http://localhost:5000/users/connect",
                {
                    data: { _id: userToDelete._id },
                    headers: { "x-auth-token": userData.token },
                }
            );
            if (res.data) {
                setUserData({
                    ...userData,
                    user: {
                        ...userData.user,
                        connections: userData.user.connections.filter(
                            (connection) => connection._id !== userToDelete._id
                        ),
                    },
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const renderConnections = () => {
        if (connections.length === 0) return <p>No connections</p>;
        return (
            <>
                {connections.map((connection, index) => (
                    <UserProfile
                        key={index}
                        user={connection}
                        button="Remove"
                        fn={() => {
                            setUserToDelete(connection);
                            setModalIsOpen(true);
                        }}
                    />
                ))}
            </>
        );
    };

    const modalProps = {
        modalIsOpen,
        setModalIsOpen,
        message: `Are you sure you want to remove this connection?`,
        action: removeUser,
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                <div>
                    <NewConnectionForm />
                </div>
                <div>
                    <PendingConnectionsList />
                </div>
                <div>
                    <h2>Connections:</h2>
                    {renderConnections()}
                    <ConfirmModal {...modalProps} />
                </div>
            </div>
        </div>
    );
}
