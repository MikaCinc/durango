import React, {
    useContext
} from 'react';

/* Library */
import { getApiUrl } from '../library/common';

/* Components */
import { Modal } from 'react-bootstrap';

/* Logo */
import Img from '../CustomIcons/workInProgress.png';

/* Context */
import ObjectContext from '../Context/objectContext';

const ObjectManuallyOpenCloseModal = ({ show, onHide, history }) => {
    const { setData, data, setErrorModalMessage, refreshTokenFunction } = useContext(ObjectContext);

    const manuallyCloseObject = () => {
        let flag = true;

        if (data.isManualyClosed) {
            flag = false;
        };

        let accessToken = localStorage.getItem('durangoAccessToken');
        if (!accessToken) {
            history.push('/inputPanel/login');
        }

        fetch(getApiUrl() + '/places/' + data.id, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify({ isManualyClosed: flag })
        }).then(response => {
            return response.json();
        }).then(({ data, error, message }) => {
            if (error && data.tokenExpired) {
                refreshTokenFunction(manuallyCloseObject);
                return;
            }

            if (error) {
                setErrorModalMessage(message);
                return;
            }
            setData({
                ...data
            });
        }).catch(({ message }) => {
            console.log('error', message);
            setErrorModalMessage(message);
        });
    }

    const renderOpenCloseText = () => {
        let text = data.isManualyClosed
            ? 'Vaš objekat je trenutno manuelno zatvoren, klikom na dugme OTVORI svim korisnicima će biti prikazan kao otvoren u radnom vremenu'
            : 'Ukoliko manuelno zatvorite objekat klikom na ovo dugme, naš algoritam će ignorisati radno vreme i Vaš objekat će uvek korisnicima biti prikazan kao zatvoren, sve dok ga ponovo ne otvorite manuelno klikom na isto ovo dugme'

        return (
            <p>{text}</p>
        )
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Body>
                <div className="modalContainer">
                    <img src={Img} style={{ width: '125px' }} />
                    <h6 className="boldText">Upozorenje</h6>
                    {
                        renderOpenCloseText()
                    }
                    <div className="modalOptionsContainer">
                        <button
                            className="buttonConfirm"
                            onClick={() => {
                                manuallyCloseObject();
                                onHide();
                            }}
                        >
                            <h1 className="boldText">Nastavi</h1>
                        </button>
                        <button
                            className="buttonCancel"
                            onClick={() => {
                                onHide();
                            }}
                        >
                            <h1 className="boldText">Otkaži</h1>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ObjectManuallyOpenCloseModal;