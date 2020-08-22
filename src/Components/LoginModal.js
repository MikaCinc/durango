import React from 'react';

/* Components */
import { Modal } from 'react-bootstrap';

/* Logo */
import Img from '../CustomIcons/logInModal.png';

const LoginModal = ({ show, onHide, history }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Body>
                <div className="modalContainer">
                    <img src={Img} style={{ width: '125px' }} alt="icon" />
                    <h6 className="boldText">Durango je bolji kada si ulogovan</h6>
                    <p>Uloguj se pomoću Google, Facebook(uskoro) ili Instagram(uskoro) naloga da bi koristio ovu i mnoge druge mogućnosti</p>
                    <div className="modalOptionsContainer">
                        <button
                            className="buttonConfirm"
                            onClick={() => {
                                history.push('/app/login');
                                onHide();
                            }}
                        >
                            <h1 className="boldText">OK</h1>
                        </button>
                        <button
                            className="buttonCancel"
                            onClick={() => {
                                onHide();
                            }}
                        >
                            <h1 className="boldText">Ne sada</h1>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default LoginModal;