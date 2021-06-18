import React from 'react';

/* Components */
import { Modal } from 'react-bootstrap';

/* Logo */
import Img from '../CustomIcons/serverErrorModal.png';

const ErrorModal = ({ show, onHide, message }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            className="acrylicDarkBackdrop"
            centered
        >
            <Modal.Body>
                <div className="modalContainer">
                    <img src={Img} style={{ width: '125px' }} alt="icon" />
                    <h6 className="boldText">Došlo je do greške</h6>
                    <p>{message}</p>
                    <button
                        className="detailsRow clickableRow w-50"
                        onClick={() => {
                            onHide();
                        }}
                    >
                        <h1 className="detailRowText boldText">OK</h1>
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ErrorModal;