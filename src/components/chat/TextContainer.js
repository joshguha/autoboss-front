import React from "react";

const TextContainer = ({ users }) => (
    <div className="box">
        {users ? (
            <div>
                <h3>Chatroom Users:</h3>
                <div>
                    {users.map(({ firstName, lastName }, index) => (
                        <p key={index}>{`${firstName} ${lastName}`}</p>
                    ))}
                </div>
            </div>
        ) : null}
    </div>
);

export default TextContainer;
