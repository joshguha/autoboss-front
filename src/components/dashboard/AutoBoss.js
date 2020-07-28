import React, { useContext } from "react";
import Typical from "react-typical";
import UserContext from "../../contexts/UserContext";

export default function AutoBoss() {
    const { userData } = useContext(UserContext);
    if ("speechSynthesis" in window) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = userData.user.notification;
        window.speechSynthesis.speak(msg);
    }
    return (
        <div className="autoboss">
            <img
                className="autoboss__image"
                src="/img/AutoBoss.png"
                alt="AutoBoss"
            />
            <h1 className="autoboss__text">
                <Typical
                    loop={1}
                    wrapper="b"
                    steps={[userData.user.notification]}
                />
            </h1>
        </div>
    );
}
