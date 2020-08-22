import React from 'react';

/* Components */
import { Modal } from 'react-bootstrap';

/* Logo */
import Img from '../CustomIcons/noResults.png';

const NotUpdatedRecentlyModal = ({ show, onHide, history }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Body>
                <div className="modalContainer">
                    <img src={Img} style={{ width: '125px' }} />
                    <h6 className="boldText">Obaveštenje</h6>
                    <p>
                        Niste ažurirali broj slobodnih mesta duže od sat vremena i pozicija Vašeg kafića je verovatno pala na listi svih kafića u aplikaciji.
                        <b> Ažurirajte</b> broj kako bi Vaš kafić bio ponovo na <b>vrhu liste</b>.
                    </p>
                    <button
                        className="detailsRow clickableRow w-50"
                        onClick={() => {
                            onHide();
                        }}
                    >
                        <h1 className="detailRowText boldText">Ažuriraću</h1>
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default NotUpdatedRecentlyModal;