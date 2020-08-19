import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import { useBeforeunload } from "react-beforeunload";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Header from "./components/layout/Header";
import UserContext from "./contexts/UserContext";
import PrivateRoute from "./routers/PrivateRoute";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/pages/NotFound";
import Tasks from "./components/pages/Tasks";
import Connections from "./components/pages/Connections";
import Chatroom from "./components/pages/Chatroom";
import CreateChat from "./components/pages/CreateChat";
import ProfilePicture from "./components/pages/ProfilePicture";

import "./styles/styles.scss";

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useBeforeunload(async () => {
        if (userData.token) {
            const res = await Axios.post(
                "https://autoboss-back.herokuapp.com/users/logout",
                null,
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
            if (res.data) console.log(res.data);
        }
        return;
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");

            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post(
                "https://autoboss-back.herokuapp.com/users/tokenIsValid",
                null,
                { headers: { "x-auth-token": token } }
            );
            if (tokenRes.data) {
                const userRes = await Axios.get(
                    "https://autoboss-back.herokuapp.com/users/",
                    { headers: { "x-auth-token": token } }
                );

                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <Header />
                    <div className="page">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <PrivateRoute
                                path="/dashboard"
                                component={Dashboard}
                            />
                            <PrivateRoute path="/tasks" component={Tasks} />
                            <PrivateRoute
                                path="/connections"
                                component={Connections}
                            />
                            <PrivateRoute path="/chat" component={Chatroom} />
                            <PrivateRoute
                                path="/create-chat"
                                component={CreateChat}
                            />
                            <PrivateRoute
                                path="/profilepic"
                                component={ProfilePicture}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}
