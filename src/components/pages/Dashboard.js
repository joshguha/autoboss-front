import React from "react";
import Sidebar from "../layout/Sidebar";
import Metrics from "../dashboard/Metrics";
import Notifications from "../dashboard/Notifications";

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
