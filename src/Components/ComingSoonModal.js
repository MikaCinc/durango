import React, {
    useEffect,
    useState
} from 'react';

/* Components */
import { Modal } from 'react-bootstrap';

/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

const ComingSoonModal = (props) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

    }, []);

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            centered
        >
            <Modal.Body>
                    <img src={Logo} className="reserveModalLogo" />
                    <h3 className="boldText reserveModalTitle">Naš tim aktivno radi na ovoj funkciji</h3>
                    <div
                        className="detailsRow clickableRow w-50"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        <h1 className="detailRowText boldText">OK</h1>
                    </div>
            </Modal.Body>
        </Modal>
    )
}

export default ComingSoonModal;