import React from "react";
import Sidebar from "../layout/Sidebar";
import Metrics from "../dashboard/Metrics";
import AutoBoss from "../dashboard/AutoBoss";

export default function Dashboard() {
    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                <AutoBoss />
                <Metrics />
            </div>
        </div>
    );
}
