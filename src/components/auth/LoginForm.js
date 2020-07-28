import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../contexts/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        setPassword("");
        try {
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login",
                {
                    email,
                    password,
                }
            );

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            if (!props.private) {
                history.push("/dashboard");
            }
        } catch (e) {
            if (e.response.data.msg) {
                e.response.data.msg && setError(e.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h2>Log in</h2>
            {error && <ErrorNotice message={error} />}
            <form className="form" onSubmit={submit}>
                <label className="form__label" htmlFor="login-email">
                    Email
                </label>
                <input
                    className="form__input"
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="form__label" htmlFor="login-password">
                    Password
                </label>
                <input
                    className="form__input"
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input type="submit" value="Log in" />
            </form>
        </div>
    );
}
