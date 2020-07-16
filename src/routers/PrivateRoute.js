import React, { useContext } from "react";
import { Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import LoginForm from "../components/auth/LoginForm";

export default function PrivateRoute({ component: Component, ...rest }) {
    const { userData } = useContext(UserContext);

    return (
        <Route
            {...rest}
            component={(props) =>
                userData.user ? (
                    <>
                        <Component {...props} />
                    </>
                ) : (
                    <LoginForm />
                )
            }
        />
    );
}
