import React, {
    useState,
    useContext
} from 'react';

/* Components */
import { Modal } from 'react-bootstrap';

/* Packages & Libraries */
import { getApiUrl } from '../library/common';
import moment from 'moment';

/* Logo */
import Img from '../CustomIcons/workInProgress.png';

/* Context */
import DataContext from '../Context/dataContext';

const FeedbackModal = ({ show, onHide }) => {
    const { setErrorModalMessage, setSuccessModalMessage } = useContext(DataContext);
    const [feedback, setFeedback] = useState("");

    const sendRequest = () => {

        if (!feedback) {
            return;
        }

        fetch(getApiUrl() + '/feedback/new', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                content: feedback,
                date: moment().unix()
            })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            // console.log(response);

            setFeedback('');

            if (response.error) {
                return setErrorModalMessage(response.message);
            }

            return setSuccessModalMessage('Povratne informacije uspešno prosleđene, hvala!')
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            className="acrylicDarkBackdrop"
            // dialogClassName="acrylicDarkBackdrop"
            // backdropClassName="acrylicDarkBackdrop"
            centered
        >
            <Modal.Body>
                <div className="modalContainer">
                    <img src={Img} style={{ width: '125px' }} alt="icon" />
                    <h6 className="boldText">Naš tim jako ceni tvoje mišljenje!</h6>
                    <p>
                        Ukoliko imaš predlog za unapređenje Durango aplikacije
                        ili bilo kakve druge povratne informacije, biće nam drago da čujemo.
                    </p>
                    <textarea
                        className="IP-Settings-TextArea IP-Settings-Input"
                        value={feedback}
                        onChange={(e) => {
                            setFeedback(e.target.value);
                        }}
                    />
                    <div className="modalOptionsContainer">
                        <button
                            className="buttonConfirm"
                            onClick={() => {
                                onHide();
                                sendRequest();
                            }}
                        >
                            <h1 className="boldText">Pošalji</h1>
                        </button>
                        <button
                            className="buttonCancel"
                            onClick={() => {
                                onHide();
                            }}
                        >
                            <h1 className="boldText">Odustani</h1>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default FeedbackModal;