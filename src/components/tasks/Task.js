import React, { useState, useEffect } from "react";
import moment from "moment";

export default function Task(props) {
    const [editable, setEditable] = useState(false);
    const [description, setDescription] = useState(props.task.description);
    const [completed, setCompleted] = useState(props.task.completed);

    useEffect(() => {
        setDescription(props.task.description);
        setCompleted(props.task.completed);
    }, [props.task.description, props.task.completed]);

    return (
        <div className="task box">
            <div>
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
                        Due:{" "}
                        {moment(props.task.due).format("hh:mm - Do MMM YYYY")}
                    </p>
                )}
            </div>

            <div className="task__functions">
                <label class="task__checkbox path">
                    <input
                        type="checkbox"
                        id="completed"
                        checked={completed}
                        onChange={() => {
                            setCompleted(!completed);
                            setTimeout(() => {
                                props.updateTask(
                                    props.task,
                                    props.task.description,
                                    !props.task.completed
                                );
                            }, 1000);
                        }}
                    />
                    <svg viewBox="0 0 21 21">
                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                    </svg>
                </label>

                <img
                    className="delete"
                    src="/img/bin.png"
                    alt="delete"
                    onClick={() => {
                        setTimeout(() => {
                            props.deleteTask(props.task);
                        }, 50);
                    }}
                />
            </div>
        </div>
    );
}
