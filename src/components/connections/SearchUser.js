import React, { useState, useContext } from "react";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import UserContext from "../../contexts/UserContext";

export default function SearchUser({ setFoundUser }) {
    const [searchField, setSearchField] = useState("");
    const [error, setError] = useState("");
    const { userData } = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (!searchField) {
                setError("Please enter user email");
                return;
            }
            const res = await Axios.post(
                "http://localhost:5000/users/search",
                {
                    email: searchField,
                },
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
            setError(res.data.msg);
            if (res.data._id) {
                setFoundUser(res.data);
            } else {
                setFoundUser({});
            }
        } catch (e) {
            console.log(e);
        }
        setSearchField("");
    };

    return (
        <div>
            <h2>Search for connections</h2>
            <form className="form" onSubmit={submit}>
                <input
                    className="form__input"
                    id="search-user"
                    type="email"
                    value={searchField}
                    placeholder="Search by email"
                    onChange={(e) => setSearchField(e.target.value)}
                />
                {error && <ErrorNotice message={error} />}
                <input type="submit" value="Search" />
            </form>
        </div>
    );
}
