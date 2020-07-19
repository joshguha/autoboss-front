import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const Messages = ({ messages, userID }) => (
    <ScrollToBottom>
        {messages.map((message, i) => (
            <div key={i}>
                <Message message={message} userID={userID} />
            </div>
        ))}
    </ScrollToBottom>
);

export default Messages;
