import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Sidebar from "../layout/Sidebar";
import Task from "../tasks/Task";
import InputTaskForm from "../tasks/InputTaskForm";
import TaskOptions from "../tasks/TaskOptions";
import TasksContext from "../../contexts/TasksContext";
import UserContext from "../../contexts/UserContext";

export default function Tasks() {
    const [tasksData, setTasksData] = useState([]);
    const [filteredTasksData, setFilteredTasksData] = useState([]);
    const { userData } = useContext(UserContext);

    const updateTask = async (
        alteredTask,
        alteredDescription,
        alteredCompleted
    ) => {
        alteredTask.description = alteredDescription;
        alteredTask.completed = alteredCompleted;
        setTasksData(
            tasksData.map((task) => {
                if (task._id === alteredTask._id) {
                    return alteredTask;
                } else {
                    return task;
                }
            })
        );

        try {
            const url = `https://autoboss-back.herokuapp.com/tasks/${alteredTask._id}`;
            await Axios.patch(
                url,
                {
                    description: alteredDescription,
                    completed: alteredCompleted,
                },
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
        } catch (e) {
            console.log(e);
        }
    };

    const deleteTask = async (taskToDelete) => {
        const url = `https://autoboss-back.herokuapp.com/tasks/${taskToDelete._id}`;
        const deleteRes = await Axios.delete(url, {
            headers: { "x-auth-token": userData.token },
        });

        if (deleteRes.data) {
            setTasksData(
                tasksData.filter((task) => task._id !== taskToDelete._id)
            );
        } else {
            console.log(deleteRes);
        }
    };

    useEffect(() => {
        const retrieveTasks = async () => {
            const tasksRes = await Axios.get("https://autoboss-back.herokuapp.com/tasks/", {
                headers: { "x-auth-token": userData.token },
            });

            if (tasksRes.data) {
                setTasksData(tasksRes.data);
            }
        };

        retrieveTasks();
    }, [userData.token]);

    return (
        <TasksContext.Provider
            value={{
                tasksData,
                setTasksData,
                setFilteredTasksData,
            }}
        >
            <div className="container">
                <Sidebar />
                <div className="content">
                    <InputTaskForm />
                    <TaskOptions />
                    {filteredTasksData.length === 0 ? (
                        <div className="box">
                            <p className="task__message">No tasks to show</p>
                        </div>
                    ) : (
                        filteredTasksData.map((task, index) => {
                            return (
                                <Task
                                    key={index}
                                    task={task}
                                    updateTask={updateTask}
                                    deleteTask={deleteTask}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </TasksContext.Provider>
    );
}
