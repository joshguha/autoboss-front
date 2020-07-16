import React from "react";

export default function ErrorNotice(props) {
    return (
        <div>
            <span>{props.message}</span>
        </div>
    );
}
