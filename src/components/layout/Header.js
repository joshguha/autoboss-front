import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

export default function Header() {
    return (
        <header className="header">
            <Link to="/">
                <h1 className="header__title">AutoBoss</h1>
            </Link>
            <AuthOptions />
        </header>
    );
}
