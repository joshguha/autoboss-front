import React, { useContext } from "react";
import Axios from "axios";
import UserContext from "../../contexts/UserContext";
import UserProfile from "./UserProfile";

export default function PendingConnectionsList() {
    const { userData, setUserData } = useContext(UserContext);
    const pendingConnections = userData.user.pendingConnections;

    const accept = async (user, setIsButton, setIsButton2, setMessage) => {
        try {
            const res = await Axios.post(
                "http://localhost:5000/users/connect",
                {
                    connectWith: user._id,
                },
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
            if (res.status === 201) {
                setIsButton(false);
                setIsButton2(false);
                setMessage("Connection accepted");
                setTimeout(() => {
                    setUserData({
                        ...userData,
                        user: {
                            ...userData.user,
                            connections: [
                                ...userData.user.connections,
                                res.data,
                            ],
                            pendingConnections: userData.user.pendingConnections.filter(
                                ({ _id }) => _id !== res.data._id
                            ),
                        },
                    });
                }, 1000);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const decline = async (user, setIsButton, setIsButton2, setMessage) => {
        try {
            const res = await Axios.post(
                "http://localhost:5000/users/connect",
                {
                    decline: user._id,
                },
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
            if (res.status === 201) {
                setIsButton(false);
                setIsButton2(false);
                setMessage("Connection declined");
                setTimeout(() => {
                    setUserData({
                        ...userData,
                        user: {
                            ...userData.user,
                            pendingConnections: userData.user.pendingConnections.filter(
                                ({ _id }) => _id !== res.data._id
                            ),
                        },
                    });
                }, 1000);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            {pendingConnections.length ? (
                <>
                    <h4>Pending connection invitations:</h4>
                    {pendingConnections.map((pendingConnection, index) => (
                        <UserProfile
                            key={index}
                            user={pendingConnection}
                            button="Accept"
                            fn={accept}
                            button2="Decline"
                            fn2={decline}
                        />
                    ))}
                </>
            ) : (
                <p>No pending connections</p>
            )}
        </div>
    );
}
