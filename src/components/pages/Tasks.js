import React from "react";
import Sidebar from "../layout/Sidebar";
import Task from "../layout/Task";
import InputTaskForm from "../layout/InputTaskForm";

export default function Tasks() {
    return (
        <div>
            <Sidebar />
            <div>
                <InputTaskForm />
                <Task />
                <Task />
                <Task />
            </div>
        </div>
    );
}
