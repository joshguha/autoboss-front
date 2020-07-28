import React, { useState, useContext } from "react";
import Axios from "axios";
import DateTimePicker from "react-datetime-picker";
import ErrorNotice from "../misc/ErrorNotice";
import UserContext from "../../contexts/UserContext";
import TasksContext from "../../contexts/TasksContext";

export default function InputTaskForm() {
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [dueDate, setDueDate] = useState();

    const { userData } = useContext(UserContext);
    const { tasksData, setTasksData } = useContext(TasksContext);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const taskRes = await Axios.post(
                "http://localhost:5000/tasks/",
                {
                    description,
                    due: dueDate,
                },
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
            if (taskRes.data) {
                setDescription("");
                setDueDate();
                setTasksData([...tasksData, taskRes.data]);
            }
        } catch (e) {
            console.log(e.response.data.msg);
            e.response.data.msg && setError(e.response.data.msg);
        }
    };

    return (
        <div className="form">
            <h2>Add a task</h2>

            <form onSubmit={submit}>
                <label className="form__label" htmlFor="task-description">
                    Description
                </label>
                <textarea
                    className="form__input input-task-form__text-area"
                    rows="4"
                    cols="50"
                    id="task-description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label className="form__label" htmlFor="due-date-picker">
                    Due
                </label>
                <div className="input-task-form__container">
                    <DateTimePicker
                        id="due-date-picker"
                        disableClock={true}
                        value={dueDate}
                        format={"d/M/y h:mm a"}
                        onChange={(dueDate) => setDueDate(dueDate)}
                    />
                    <input
                        className="input-task-form__button"
                        disabled={description.trim().length === 0}
                        type="submit"
                        value="+ Add Task"
                    />
                </div>
                <ErrorNotice message={error} />
            </form>
        </div>
    );
}
