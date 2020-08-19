import React, { useContext, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import ConfirmModal from "../misc/ConfirmModal";

const InfoBar = ({ name, _id }) => {
    const { userData, setUserData } = useContext(UserContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory();

    const action = async () => {
        try {
            const res = await Axios.delete("https://autoboss-back.herokuapp.com/chat", {
                data: { _id },
                headers: { "x-auth-token": userData.token },
            });
            if (res.data) {
                setUserData({
                    ...userData,
                    user: {
                        ...userData.user,
                        chatrooms: userData.user.chatrooms.filter(
                            (chatroom) => chatroom._id !== _id
                        ),
                    },
                });
                history.push("/dashboard");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const modalProps = {
        modalIsOpen,
        setModalIsOpen,
        message: `Are you sure you want to delete "${name}"?`,
        action,
    };
    return (
        <div className="info-bar">
            <ConfirmModal {...modalProps} />
            <h3>{name}</h3>
            <img
                className="delete info-bar__delete"
                src="/img/bin.png"
                alt="delete"
                onClick={() => {
                    setModalIsOpen(true);
                }}
            />
        </div>
    );
};

export default InfoBar;
