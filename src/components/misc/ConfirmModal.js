import React from "react";
import Modal from "react-modal";

export default function ConfirmModal({
    modalIsOpen,
    setModalIsOpen,
    message,
    action,
}) {
    Modal.setAppElement("#root");

    return (
        <div>
            <Modal className="modal" isOpen={modalIsOpen}>
                <p className="modal__body">{message}</p>
                <button className="modal__button" onClick={action}>
                    Confirm
                </button>
                <button
                    className="modal__button"
                    onClick={() => setModalIsOpen(false)}
                >
                    Go back
                </button>
            </Modal>
        </div>
    );
}
