import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function Home() {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    
    return <div>Home</div>;
}
