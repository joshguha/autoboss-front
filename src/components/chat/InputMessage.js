import React, { useContext } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const InputMessage = ({
    currentMessage,
    setCurrentMessage,
    messages,
    setMessages,
}) => {
    const { userData } = useContext(UserContext);
    const { pathname } = useLocation();

    const submit = async (e) => {
        e.preventDefault();
        setCurrentMessage("");
        try {
            const url = `http://localhost:5000${pathname}`;
            const res = await Axios.post(
                url,
                {
                    body: currentMessage.trim(),
                },
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
            if (res.data) {
                setMessages([...messages, res.data]);
            }
        } catch (e) {
            console.log(e.response.data.msg);
        }
    };
    return (
        <form className="form" onSubmit={submit}>
            <input
                className="input"
                type="text"
                placeholder="Type a message..."
                value={currentMessage}
                onChange={(event) => setCurrentMessage(event.target.value)}
                onKeyPress={(event) => (event.key === "Enter" ? submit : null)}
            />
            <input
                disabled={currentMessage.trim().length === 0}
                type="submit"
                value="Send"
            />
        </form>
    );
};

export default InputMessage;
