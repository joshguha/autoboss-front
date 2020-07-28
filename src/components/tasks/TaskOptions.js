import React, { useState, useContext, useEffect } from "react";
import TasksContext from "../../contexts/TasksContext";

export default function TaskOptions() {
    const { tasksData, setFilteredTasksData } = useContext(TasksContext);
    const [sortBy, setSortBy] = useState("date-created");
    const [order, setOrder] = useState("newest-first");
    const [incomplete, setIncomplete] = useState("incomplete-only");

    useEffect(() => {
        let filteredData = [...tasksData];

        if (incomplete === "incomplete-only") {
            filteredData = filteredData.filter(({ completed }) => !completed);
        }

        if (sortBy === "date-created" && order === "newest-first") {
            filteredData = filteredData.sort(
                (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
            );
        } else if (sortBy === "date-created" && order === "oldest-first") {
            filteredData = filteredData.sort(
                (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
            );
        } else if (sortBy === "date-due" && order === "early-to-late") {
            filteredData = filteredData.sort((a, b) => {
                if (a.due && b.due) {
                    return Date.parse(a.due) - Date.parse(b.due);
                } else if (a.due) {
                    return -1;
                } else if (b.due) {
                    return +1;
                } else {
                    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
                }
            });
        } else {
            filteredData = filteredData.sort((a, b) => {
                if (a.due && b.due) {
                    return Date.parse(b.due) - Date.parse(a.due);
                } else if (a.due) {
                    return -1;
                } else if (b.due) {
                    return +1;
                } else {
                    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
                }
            });
        }
        setFilteredTasksData(filteredData);
    }, [sortBy, order, incomplete, tasksData, setFilteredTasksData]);

    return (
        <div className="task-options box">
            <label className="task-options__label" htmlFor="sort-by">
                Sort by:
            </label>
            <select
                className="task-options__select"
                name="sort-by"
                id="sort-by"
                value={sortBy}
                onChange={(e) => {
                    setSortBy(e.target.value);
                    if (e.target.value === "date-created") {
                        setOrder("newest-first");
                    } else {
                        setOrder("early-to-late");
                    }
                }}
            >
                <option value="date-created">Date created</option>
                <option value="date-due">Date due</option>
            </select>
            <label className="task-options__label" htmlFor="order">
                Order:
            </label>
            {sortBy === "date-created" ? (
                <select
                    className="task-options__select"
                    name="order"
                    id="order"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                >
                    <option value="newest-first">Newest to Oldest</option>
                    <option value="oldest-first">Oldest to Newest</option>
                </select>
            ) : (
                <select
                    className="task-options__select"
                    name="order"
                    id="order"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                >
                    <option value="early-to-late">Earliest to Latest</option>
                    <option value="late-to-early">Latest to Earliest</option>
                </select>
            )}
            <select
                className="task-options__select"
                name="incomplete"
                id="incomplete"
                value={incomplete}
                onChange={(e) => setIncomplete(e.target.value)}
            >
                <option value="incomplete-only">Incomplete only</option>
                <option value="all">All</option>
            </select>
        </div>
    );
}
