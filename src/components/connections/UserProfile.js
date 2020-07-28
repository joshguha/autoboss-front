import React, { useState } from "react";

export default function UserProfile({ user, button, fn, button2, fn2 }) {
    const [message, setMessage] = useState("");
    const [isButton, setIsButton] = useState(button);
    const [isButton2, setIsButton2] = useState(button2);

    const submit = () => fn(user, setIsButton, setIsButton2, setMessage);
    const submit2 = () => fn2(user, setIsButton, setIsButton2, setMessage);
    return (
        <div className="user-profile box">
            <div>
                <h3>{`${user.firstName} ${user.lastName}`}</h3>
                <p>{user.email}</p>
            </div>
            <div className="user-profile__container">
                {isButton ? (
                    <button className="user-profile__button" onClick={submit}>
                        {button}
                    </button>
                ) : (
                    <p>{message}</p>
                )}
                {isButton2 ? (
                    <button className="user-profile__button" onClick={submit2}>
                        {button2}
                    </button>
                ) : null}
            </div>
        </div>
    );
}
