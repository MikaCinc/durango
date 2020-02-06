/* React */
import React, { useState, useEffect } from 'react';
import '../App.css';
/* Libraries */
import _ from 'lodash';
import moment from 'moment';
/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

import { Modal, Carousel } from 'react-bootstrap';

import { useParams } from "react-router-dom";

import mockData from '../data/kafici.js';

/* Images */
import vinyl from '../slike/vinyl.png';
import Square from '../slike/Square.jpg';
import dnevnaSoba from '../slike/dnevnaSoba.jpg';

const placeholderObj = {
    id: 0,
    title: '',
    logo: '',
    brojMesta: 0,
    brojSlobodnihMesta: 0,
    details: {
        opis: '',
        slike: '',
        radnoVreme: '',
        lokacija: '',
        meni: ''
    }
}

function Details(props) {
    let { id } = useParams();

    const [data, setData] = useState({ ...placeholderObj });
    const [seats, setSeats] = useState(3);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        let findData = { ..._.find(mockData, { 'id': parseInt(id, 10) }) || placeholderObj };

        setData(findData);
    }, []);

    const getRadnoVreme = () => {
        let time = data.details.radnoVreme,
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
            return <p className="randoVremeParagraph">
                <span className="greyText">Otvoreno: </span>
                <span style={{ color: '#009A1F' }}>{time}</span>
            </p>
        };


        return <p className="randoVremeParagraph">
            <span className="greyText">Zatvoreno: </span>
            <span style={{ color: '#C50505' }}>{time}</span>
        </p>;
    }

    const getSrc = (title) => {
        switch(title) {
            case 'vinyl': {
                return vinyl;
            };
            case 'Square': {
                return Square;
            };
            case 'dnevnaSoba': {
                return dnevnaSoba;
            };
            default: {
                return Square;
            }
        }
    }

    return (
        <div>
            <div className="detailsHeader">
                <div
                    className="goBack"
                    onClick={() => {
                        // props.setSelected(null)
                        props.history.push('/durango/home')
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
                    <h1 className="detailsTitle boldText">{data.title}</h1>
                    {/* <i className="material-icons greyText">
                        access_time
                    </i> */}
                    {getRadnoVreme()}
                </div>
                <img src={getSrc(data.logo.split('.')[0])} className="detailsLogo" />
            </div>
            <div className="detailsRow">
                <h1 className="detailRowText">
                    Slobodnih mesta:
                    <span style={{
                        color: data.brojSlobodnihMesta > 0 ? '#3185FC' : '#9A031E',
                    }}>
                        {
                            ' ' + data.brojSlobodnihMesta + ' '
                        }
                    </span>
                    / {data.brojMesta}
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
            <div className="detailsRow clickableRow" onClick={() => {
                props.history.push(`/durango/${data.id}/more`);
            }}>
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
