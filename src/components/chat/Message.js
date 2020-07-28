import React, { useContext } from "react";
import ReactEmoji from "react-emoji";
import UserContext from "../../contexts/UserContext";

const Message = ({ message: { body, author } }) => {
    const { userData } = useContext(UserContext);
    let isSentByCurrentUser = false;

    if (author._id === userData.user._id) {
        isSentByCurrentUser = true;
    }

    return isSentByCurrentUser ? (
        <div className="message-sent__container">
            <p className="message__author message-sent">{`${author.firstName} ${author.lastName}`}</p>
            <div className="message__box">
                <p className="message__text">{ReactEmoji.emojify(body)}</p>
            </div>
        </div>
    ) : (
        <div className="message-received__container">
            <div className="message__box">
                <p className="message__text">
                    {ReactEmoji.emojify(body)}
                </p>
            </div>
            <p className="message__author message-received">{`${author.firstName} ${author.lastName}`}</p>
        </div>
    );
};

export default Message;
