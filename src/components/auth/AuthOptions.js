import React, { useContext } from "react";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    let location = useLocation();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const dashboard = () => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");

            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post(
                "http://localhost:5000/users/tokenIsValid",
                null,
                { headers: { "x-auth-token": token } }
            );
            if (tokenRes.data) {
                const userRes = await Axios.get(
                    "http://localhost:5000/users/",
                    { headers: { "x-auth-token": token } }
                );

                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        };

        checkLoggedIn().then(() => {
            history.push("/dashboard");
        });
    };
    const logout = async () => {
        if (userData.token) {
            await Axios.post("http://localhost:5000/users/logout", null, {
                headers: { "x-auth-token": userData.token },
            });
        }
        history.push("/");
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
    };

    const renderHeaderLinks = () => {
        if (userData.user) {
            if (location.pathname === "/dashboard") {
                return (
                    <nav className="header__auth-options">
                        <button onClick={logout}>Log out</button>
                    </nav>
                );
            } else {
                return (
                    <nav className="header__auth-options">
                        <button onClick={dashboard}>Dashboard</button>
                        <button onClick={logout}>Log out</button>
                    </nav>
                );
            }
        } else {
            return (
                <nav className="header__auth-options">
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Log in</button>
                </nav>
            );
        }
    };

    return <nav>{renderHeaderLinks()}</nav>;
}
