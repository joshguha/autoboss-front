import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function UserInfo() {
    const { userData } = useContext(UserContext);

    return (
        <>
            <h3>{userData.user.name}</h3>
            <p>{userData.user.email}</p>
        </>
    );
}
