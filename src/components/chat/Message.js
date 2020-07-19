import React from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message: { body, author }, userID }) => {
    let isSentByCurrentUser = false;

    if (author._id === userID) {
        isSentByCurrentUser = true;
    }

    return isSentByCurrentUser ? (
        <div>
            <p>{`${author.firstName} ${author.lastName}`}</p>
            <div>
                <p>{ReactEmoji.emojify(body)}</p>
            </div>
        </div>
    ) : (
        <div>
            <div>
                <p>{ReactEmoji.emojify(body)}</p>
            </div>
            <p>{`${author.firstName} ${author.lastName}`}</p>
        </div>
    );
};

export default Message;
