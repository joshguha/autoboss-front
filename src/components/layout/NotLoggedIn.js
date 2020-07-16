import React from "react";
import { Link } from "react-router-dom";

export default function NotLoggedIn() {
    return (
        <div>
            Click <Link to="/login">here</Link> to Login
        </div>
    );
}
