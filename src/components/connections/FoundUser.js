import React, { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import Axios from "axios";

export default function FoundUser({ foundUser, setFoundUser }) {
    const { userData } = useContext(UserContext);
    const {
        _id,
        firstName,
        lastName,
        email,
        alreadyConnected,
        connectionPending,
    } = foundUser;

    const connect = async () => {
        try {
            const res = await Axios.post(
                "https://autoboss-back.herokuapp.com/users/connect",
                {
                    connectWith: _id,
                },
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
            if (res.status === 201) {
                setFoundUser({ ...foundUser, connectionPending: true });
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {}, [alreadyConnected, connectionPending]);

    const renderConnectIcon = () => {
        if (userData.user._id === _id) return null;
        if (alreadyConnected) return <p>Already connected</p>;
        if (connectionPending) return <p>Connection request pending</p>;
        return (
            <button className="found-user__button" onClick={connect}>
                Connect
            </button>
        );
    };

    return (
        <div className="found-user box">
            <div>
                <h3>{`${firstName} ${lastName}`}</h3>
                <p>{email}</p>
            </div>
            <div className="found-user__container">{renderConnectIcon()}</div>
        </div>
    );
}
