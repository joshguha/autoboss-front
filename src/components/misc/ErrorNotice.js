import React from "react";

export default function ErrorNotice(props) {
    return (
        <div>
            <span className="error-notice">{props.message}</span>
        </div>
    );
}
