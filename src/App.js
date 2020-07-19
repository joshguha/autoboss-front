import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";

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

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
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

        checkLoggedIn();
    }, []);

    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <Header />
                    <div>
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
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}
