import React from "react";
import Sidebar from "../layout/Sidebar";
import Connection from "../layout/Connection";

export default function Connections() {
    return (
        <div>
            <Sidebar />
            Here are all your connections!
            <Connection />
            <Connection />
            <Connection />
            <Connection />
        </div>
    );
}