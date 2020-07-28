import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

export default function Messages({ messages }) {
    return (
        <ScrollToBottom className="messages-scroll">
            {messages.map((message, i) => (
                <div key={i}>
                    <Message message={message} />
                </div>
            ))}
        </ScrollToBottom>
    );
}
