import React from "react";
import Sidebar from "../layout/Sidebar";
import Metrics from "../layout/Metrics";
import Notifications from "../layout/Notifications";

export default function Dashboard() {
    return (
        <div>
            <Sidebar />
            <div>
                <Metrics />
                <Notifications />
            </div>
        </div>
    );
}
