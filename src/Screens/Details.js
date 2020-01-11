/* React */
import React, { useState } from 'react';
import '../App.css';
/* Libraries */
import _ from 'lodash';
import moment from 'moment';

import { Modal, Carousel } from 'react-bootstrap';

// import data from '../data/kafici.js';


function Details(props) {

    /* useEffect(() => {
        console.log('herrerre')
    }, []) */

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

    const renderCarousel = () => {
        return (
            <Carousel>
                {
                    ['kafic1.jpg', 'kafic2.jpg', 'kafic3.jpg'].map((item, index) => {
                        return <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={'./slike/carouselMock/' + item}
                                alt={(index + 1) + '. slika'}
                            />
                            {/* <Carousel.Caption>
                                <h3>{'Glavni tekst ' + (index + 1)}</h3>
                                <p>{'Tekst opisa ' + (index + 1)}</p>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                    })
                }
            </Carousel>
        )
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
                    <span>Nazad</span>
                </div>
                <h1 className="detailsTitle boldText">{props.data.title}</h1>
                <img src={'./slike/' + props.data.logo} className="detailsLogo" />
            </div>
            <div className="detailsRow">
                <h1 className="detailRowText greyText boldText">
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
            {
                renderCarousel()
            }
            <div className="detailsRow">
                <i className="material-icons detailIcon greyText">
                    access_time
                </i>
                {getRadnoVreme()}
            </div>
            <div
                className="detailsRow clickableRow"
                onClick={() => {
                    window.open(props.data.details.lokacija, '_blank');
                }}
            >
                <i className="material-icons detailIcon">
                    map
                </i>
                <h1 className="detailRowText">Prikaži na mapi</h1>
            </div>
            <div className="detailAbout">
                <div className="detailsRowSimple">
                    <i className="material-icons detailIcon greyText">
                        info
                    </i>
                    <h1 className="detailRowText greyText">O mestu</h1>
                </div>
                <p className="detailsAboutText">{props.data.details.opis}</p>
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
