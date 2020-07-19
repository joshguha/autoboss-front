import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    let location = useLocation();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const dashboard = () => history.push("/dashboard");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });

        localStorage.setItem("auth-token", "");

        history.push("/");
    };

    const renderHeaderLinks = () => {
        if (userData.user) {
            if (location.pathname === "/dashboard") {
                return <button onClick={logout}>Log out</button>;
            } else {
                return (
                    <>
                        <button onClick={dashboard}>Dashboard</button>
                        <button onClick={logout}>Log out</button>
                    </>
                );
            }
        } else {
            return (
                <>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Log in</button>
                </>
            );
        }
    };

    return <nav>{renderHeaderLinks()}</nav>;
}
