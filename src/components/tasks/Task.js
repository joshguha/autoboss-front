import React, { useState, useEffect } from "react";
import moment from "moment";

export default function Task(props) {
    const [editable, setEditable] = useState(false);
    const [description, setDescription] = useState(props.task.description);

    useEffect(() => {
        setDescription(props.task.description);
    }, [props.task.description]);

    return (
        <div>
            <hr />
            {editable ? (
                <input
                    type="text"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    onBlur={() => {
                        props.updateTask(
                            props.task,
                            description,
                            props.task.completed
                        );
                        setEditable(false);
                    }}
                />
            ) : (
                <p onClick={() => setEditable(true)}>
                    {props.task.description}
                </p>
            )}
            <p>
                Created at:{" "}
                {moment(props.task.createdAt).format("HH:mm - Do MMM YYYY")}
            </p>
            {props.task.due && (
                <p>
                    Due: {moment(props.task.due).format("hh:mm - Do MMM YYYY")}
                </p>
            )}
            <input
                type="checkbox"
                id="completed"
                checked={props.task.completed}
                onChange={() => {
                    props.updateTask(
                        props.task,
                        props.task.description,
                        !props.task.completed
                    );
                }}
            />

            <button
                onClick={() => {
                    props.deleteTask(props.task);
                }}
            >
                Delete
            </button>
        </div>
    );
}
