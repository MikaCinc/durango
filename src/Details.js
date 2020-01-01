/* React */
import React, { useState } from 'react';
import './App.css';
/* Libraries */
import _ from 'lodash';
import moment from 'moment';

import { Button, Modal } from 'react-bootstrap';


function Details(props) {

    /* useEffect(() => {
        console.log('herrerre')
    }, []) */

    const [seats, setSeats] = useState(3);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const getRadnoVreme = () => {
        let time = props.data.Details.RadnoVreme,
            timeStart = time.split(' - ')[0],
            timeEnd = time.split(' - ')[1],
            currentTime = moment(),
            flag = false;

        if (moment(timeEnd, 'HH:mm').isBetween(moment('00:00', 'HH:mm'), moment('05:00', 'HH:mm'))) {
            flag = true;
        };

        if (currentTime.isBetween(moment(timeStart, 'HH:mm'), moment(timeEnd, 'HH:mm').add(flag ? 1 : 0, 'days'))) {
            return <h1
                className="detailRowText"
            >
                <span className="greyText">Otvoreno: </span>
                <span style={{ color: '#009A1F' }}>{time}</span>
            </h1>
        };


        return <h1 className="detailRowText">
            <span className="greyText">Zatvoreno: </span>
            <span style={{ color: '#C50505' }}>{time}</span>
        </h1>;
    }

    return (
        <div>
            <div className="detailsHeader">
                <img src={'./slike/' + props.data.Logo} className="detailsLogo" />
                <h1 className="detailsTitle">{props.data.Title}</h1>
                <div
                    className="goBack"
                    onClick={() => {
                        props.setSelected(null)
                    }}
                >
                    <i className="material-icons">
                        arrow_back_ios
                    </i>
                    <span>Nazad</span>
                </div>
            </div>
            <div className="detailsRow">
                <h1 className="greyText">
                    Slobodnih mesta:
                    <span style={{
                        color: props.data.BrojSlobodnihMesta > 0 ? '#3261D5' : '#ff0000',
                    }}>
                        {
                            ' ' + props.data.BrojSlobodnihMesta + ' '
                        }
                    </span>
                    / {props.data.BrojMesta}
                </h1>
            </div>
            <div
                className="detailsRow clickableRow"
                onClick={() => {
                    handleShow()
                }}
            >
                <i className="material-icons detailIcon">
                    book
                </i>
                <h1 className="detailRowText">Napravi rezervaciju</h1>
            </div>
            <div className="detailsRow clickableRow" onClick={() => {
                window.open(props.data.Details.Lokacija, '_blank');
            }}>
                <i className="material-icons detailIcon">
                    map
                </i>
                <h1 className="detailRowText">Prikaži na mapi</h1>
            </div>
            <div className="detailsRow">
                <i className="material-icons detailIcon greyText">
                    access_time
                </i>
                {getRadnoVreme()}
            </div>
            <div className="detailAbout">
                <div className="detailsRowSimple">
                    <i className="material-icons detailIcon greyText">
                        info
                    </i>
                    <h1 className="detailRowText greyText">O mestu</h1>
                </div>
                <p className="detailsAboutText">{props.data.Details.Opis}</p>
            </div>

            <Modal
                show={showModal}
                onHide={handleClose}
                centered
            >
                <Modal.Body>
                    <div className="modalUpper">
                        <div className="modalInputDiv greyText">
                            <p>Broj mesta</p>
                            <p><span onClick={() => {
                                if (seats > 1) {
                                    setSeats(seats - 1)
                                }
                            }}> - </span>{seats}<span onClick={() => {
                                setSeats(seats + 1)
                            }}> + </span></p>
                        </div>
                        <div className="modalInputDiv greyText">
                            Vreme
                        </div>
                    </div>
                    <div className="modalLower">
                        <button
                            className="buttonReserve"
                            onClick={() => {
                                handleClose()
                            }}
                        >
                            Rezerviši
                        </button>
                        <button
                            className="buttonCancel"
                            onClick={() => {
                                handleClose()
                            }}
                        >
                            Odustani
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Details;
