import React, { useState, useContext } from "react";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import UserContext from "../../contexts/UserContext";

export default function InputTaskForm() {
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const { userData } = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const taskRes = await Axios.post(
                "http://localhost:5000/tasks/",
                {
                    description,
                },
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
            if (taskRes.data) {
                setDescription("");
            }
        } catch (e) {
            console.log(e);
            e.response.data.msg && setError(e.response.data.msg);
        }
    };

    return (
        <div>
            <ErrorNotice message={error} />
            <form className="form" onSubmit={submit}>
                <label htmlFor="task-description">Description</label>
                <textarea
                    rows="4"
                    cols="50"
                    id="task-description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input type="submit" value="+" />
            </form>
        </div>
    );
}
