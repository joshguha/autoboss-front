import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { PieChart } from "react-minimal-pie-chart";

export default function Metrics() {
    const { userData } = useContext(UserContext);
    const timeLoggedInToday = userData.user.timeLoggedInToday;

    const hours = Math.floor(timeLoggedInToday / 3600000);
    const minutes = Math.floor((timeLoggedInToday - hours * 3600000) / 60000);
    const seconds = Math.floor(
        (timeLoggedInToday - hours * 3600000 - minutes * 60000) / 1000
    );
    const renderMessage = (hours, minutes, seconds) => {
        if (hours === 0 && minutes === 0) {
            return `${seconds} seconds`;
        }
        if (hours === 0) {
            return (
                `${minutes} minute` +
                (minutes > 1 ? "s" : "") +
                ` and ${seconds} seconds`
            );
        }
        return (
            `${hours} hour` +
            (hours > 1 ? "s" : "") +
            `, ${minutes} minute` +
            (minutes > 1 ? "s" : "") +
            ` and ${seconds} seconds`
        );
    };

    return (
        <div className="metrics">
            {timeLoggedInToday ? (
                <>
                    <div className="metrics__text">
                        <h2>Time logged in:</h2>
                        <p>{`You have been logged in for ${renderMessage(
                            hours,
                            minutes,
                            seconds
                        )} out of 7 hours today.`}</p>
                    </div>
                    <div className="metrics__pie">
                        <PieChart
                            data={[
                                {
                                    title: "Time worked",
                                    value:
                                        timeLoggedInToday > 25200000
                                            ? 25200000
                                            : timeLoggedInToday,
                                    color: "#5471b8",
                                },
                                {
                                    title: "Time left",
                                    value: 25200000 - timeLoggedInToday,
                                    color: "#a3b1d4",
                                },
                            ]}
                        />
                    </div>
                </>
            ) : null}
        </div>
    );
}
