import React, { useState } from "react";
import FoundUser from "./FoundUser";
import SearchUser from "./SearchUser";
export default function NewConnectionForm() {
    const [foundUser, setFoundUser] = useState({});
    return (
        <div>
            <SearchUser setFoundUser={setFoundUser} />
            {foundUser._id && (
                <FoundUser foundUser={foundUser} setFoundUser={setFoundUser} />
            )}
        </div>
    );
}
