import React from "react";

const InputMessage = ({ currentMessage, setCurrentMessage, sendMessage }) => {
    return (
        <form className="form" onSubmit={sendMessage}>
            <input
                className="message__input"
                type="text"
                placeholder="Type a message..."
                value={currentMessage}
                onChange={(event) => setCurrentMessage(event.target.value)}
                onKeyPress={(event) =>
                    event.key === "Enter" && currentMessage.trim()
                        ? sendMessage
                        : null
                }
            />
            <input
                className="message__send"
                disabled={currentMessage.trim().length === 0}
                type="submit"
                value="Send"
            />
        </form>
    );
};

export default InputMessage;
