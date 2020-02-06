/* React */
import React, { useState } from 'react';
import '../App.css';
/* Libraries */
import _ from 'lodash';
import moment from 'moment';
/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

import { Modal, Carousel } from 'react-bootstrap';

// import data from '../data/kafici.js';

function Details(props) {

    const [seats, setSeats] = useState(3);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const getRadnoVreme = () => {
        let time = props.data.details.radnoVreme,
            timeStart = time.split(' - ')[0],
            timeEnd = time.split(' - ')[1],
            currentTime = moment(),
            flag = false,
            sFlag = false,
            lowerLimit = '05:00';

        if (currentTime.isBetween(moment('00:00', 'HH:mm'), moment(lowerLimit, 'HH:mm'))) {
            sFlag = true;
        };

        if (moment(timeEnd, 'HH:mm').isBetween(moment('00:00', 'HH:mm'), moment(lowerLimit, 'HH:mm'))) {
            flag = true;
        };

        if (currentTime.isBetween(moment(timeStart, 'HH:mm').subtract(sFlag ? 1 : 0, 'days'), moment(timeEnd, 'HH:mm').add(flag ? 1 : 0, 'days'))) {
            return <p>
                <span className="greyText">Otvoreno: </span>
                <span style={{ color: '#009A1F' }}>{time}</span>
            </p>
        };


        return <p className="randoVremeParagraph">
            <span className="greyText">Zatvoreno: </span>
            <span style={{ color: '#C50505' }}>{time}</span>
        </p>;
    }

    return (
        <div>
            <div className="detailsHeader">
                <div
                    className="goBack"
                    onClick={() => {
                        props.setSelected(null)
                    }}
                >
                    <i className="material-icons">
                        arrow_back_ios
                    </i>
                </div>
                <img src={Logo} className="detailsDurangoLogo" />
            </div>
            <div className="detailsSubheader">
                <div>
                    <h1 className="detailsTitle boldText">{props.data.title}</h1>
                    {/* <i className="material-icons greyText">
                        access_time
                    </i> */}
                    {getRadnoVreme()}
                </div>
                <img src={'./slike/' + props.data.logo} className="detailsLogo" />
            </div>
            <div className="detailsRow">
                <h1 className="detailRowText">
                    Slobodnih mesta:
                    <span style={{
                        color: props.data.brojSlobodnihMesta > 0 ? '#3185FC' : '#9A031E',
                    }}>
                        {
                            ' ' + props.data.brojSlobodnihMesta + ' '
                        }
                    </span>
                    / {props.data.brojMesta}
                </h1>
                <i className="material-icons detailIcon">
                    people
                </i>
            </div>
            <div
                className="detailsRow clickableRow"
                onClick={() => {
                    handleShow()
                }}
            >
                <h1 className="detailRowText boldText">Napravi rezervaciju</h1>
                <i className="material-icons detailIconClickable">
                    book
                </i>
            </div>
            <div className="detailsRow clickableRow">
                <h1 className="detailRowText boldText">O mestu</h1>
                <i className="material-icons detailIconClickable">
                    info
                </i>
            </div>

            <Modal
                show={showModal}
                onHide={handleClose}
                centered
            >
                <Modal.Body>
                    <div className="modalInputDiv w-50">
                        <h5 className="greyText boldText">Broj mesta</h5>
                        <p className="modalInputText greyText ">
                            <span
                                className="clickable"
                                onClick={() => {
                                    if (seats > 1) {
                                        setSeats(seats - 1)
                                    }
                                }}
                            > - </span>
                            <span>{seats}</span>
                            <span
                                className="clickable"
                                onClick={() => {
                                    setSeats(seats + 1)
                                }}
                            > + </span>
                        </p>
                    </div>
                    <div className="modalInputDiv">
                        <h5 className="greyText boldText">Datum & vreme</h5>
                        <p className="greyText modalInputTextDate">
                            12/01/2020 21:30
                        </p>
                    </div>
                    <button
                        className="buttonReserve boldText"
                        onClick={() => {
                            handleClose()
                        }}
                    >
                        Rezerviši
                        </button>
                    <button
                        className="buttonCancel boldText"
                        onClick={() => {
                            handleClose()
                        }}
                    >
                        Odustani
                        </button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Details;
