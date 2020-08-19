import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../contexts/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    const { setUserData } = useContext(UserContext);

    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = {
                email,
                password,
                passwordCheck,
                firstName,
                lastName,
            };
            await Axios.post("https://autoboss-back.herokuapp.com/users/register", newUser);

            const loginRes = await Axios.post(
                "https://autoboss-back.herokuapp.com/users/login",
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
            history.push("/dashboard");
        } catch (e) {
            e.response.data.msg && setError(e.response.data.msg);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form className="form" onSubmit={submit}>
                <label className="form__label" htmlFor="register-first-name">
                    First name
                </label>
                <input
                    className="form__input"
                    id="register-first-name"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="form__label" htmlFor="register-last-name">
                    Last name
                </label>
                <input
                    className="form__input"
                    id="register-last-name"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label className="form__label" htmlFor="register-email">
                    Email
                </label>
                <input
                    className="form__input"
                    id="register-email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="form__label" htmlFor="register-password">
                    Password
                </label>
                <input
                    className="form__input"
                    id="register-password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className="form__input"
                    type="password"
                    placeholder="Verify password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                />
                {error && <ErrorNotice message={error} />}

                <input type="submit" value="Register" />
            </form>
        </div>
    );
}
