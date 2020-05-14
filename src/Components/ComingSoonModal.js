import React, {
    useEffect,
    useState
} from 'react';

/* Components */
import { Modal } from 'react-bootstrap';

/* Logo */
import Logo from '../CustomIcons/noResults.png';

const ComingSoonModal = ({ show, onHide }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Body>
                <div className="reserveModalContainer">
                    <img src={Logo} style={{width: '125px'}} />
                    <h6 className="boldText">Naš tim aktivno radi na ovoj funkciji</h6>
                    <p style={{marginBottom: '0px'}}>Biće dostupna u nekom od narednih ažuriranja.</p>
                    <p>Hvala na strpljenju!</p>
                    <div
                        className="detailsRow clickableRow w-50"
                        onClick={() => {
                            onHide();
                        }}
                    >
                        <h1 className="detailRowText boldText">OK</h1>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ComingSoonModal;