import React, { useEffect, useState } from 'react';

/* Libraries */
import moment from 'moment';
import _ from 'lodash';
import { isOpen } from '../../library/common';

/* Router */
import { useParams } from "react-router-dom";

/* Data */
import Logo from '../../ExtendedLogo/Logo.png';
import kafici from '../../data/kafici';

const Restaurant = ({ history }) => {
    let { id } = useParams();

    // const [id, setId] = useState(null)
    const [currentTime, setCurrentTime] = useState(moment());
    const [data, setData] = useState({});

    useEffect(() => {
        let ID = id;
        let findData = {};
        if (id) {
            findData = { ..._.find(kafici, { 'id': parseInt(ID, 10) }) };
        }

        while (!ID || !findData.id) {
            ID = prompt("Unesi ID svog objekta:");
            findData = { ..._.find(kafici, { 'id': parseInt(ID, 10) }) };

            if (!findData.id) {
                alert("Nije pronađen objekat sa ovim ID-em");
            } else {
                history.replace(`/durango/inputPanel/${findData.id}`);
            }
        }

        setData(findData);
    }, []);

    useEffect(() => {
        let interval = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const getRadnoVreme = () => {
        const open = isOpen(data.details.radnoVreme);

        return <p className="randoVremeParagraph">
            <span className="greyText">{open ? 'Otvoreno: ' : 'Zatvoreno: '}</span>
            <span style={{ color: open ? '#009A1F' : '#C50505' }}>{data.details.radnoVreme}</span>
        </p>;
    }

    const updateFreeSeats = (value) => {
        if (!value) return;

        setData({
            ...data,
            brojSlobodnihMesta: value
        })
    }

    return (
        <div className="IP-Container">
            <div className="detailsHeader">
                <div
                    className="IP-time"
                >
                    {currentTime.format("HH:mm:ss")}
                </div>
                <img src={Logo} className="detailsDurangoLogo" />
            </div>
            <div className="page container">
                {
                    data.id && <div className="IP-dataLoaded">
                        <div className="detailsSubheader">
                            <div>
                                <h1 className="detailsTitle boldText">{data.title}</h1>
                                {getRadnoVreme()}
                            </div>
                            <img
                                src={
                                    `${process.env.PUBLIC_URL}/slike/mockLogos/${data.logo}`
                                }
                                className={
                                    `detailsLogo reveal-focus-${
                                    data.brojSlobodnihMesta && isOpen(data.details.radnoVreme) > 0
                                        ? 'blue'
                                        : 'red'
                                    }`
                                }
                            />
                        </div>
                        <div className="IP-counter-container">
                            <div className="IP-input-sideButton">
                                <button className="IP-input-nemaMesta IP-clickable">
                                    Nemamo mesta
                                </button>
                            </div>
                            <div className="IP-dial-container">
                                {
                                    [..._.range(1, 10)].map(i => {
                                        return (
                                            <button key={i} className="IP-dial-button IP-clickable">{i}</button>
                                        )
                                    })
                                }
                            </div>
                            <div className="IP-input-sideButton">
                                <button className="IP-input-imaMesta IP-clickable">
                                    Imamo 10+ mesta
                                </button>
                            </div>
                            {/* <p>Ukupan broj mesta: {data.brojMesta}</p>
                            <p>Broj slobodnih mesta:</p>
                            <input
                                value={data.brojSlobodnihMesta}
                                onChange={(e) => updateFreeSeats(e.target.value)}
                            />

                            <h1>Zauzeto</h1>
                            {
                                [5, 4, 3, 2, 1].map(i =>
                                    <button
                                        key={i}
                                        style={{ backgroundColor: 'red' }}
                                        onClick={(e) => {
                                            updateFreeSeats(data.brojSlobodnihMesta - i);
                                        }}
                                    >
                                        {i}
                                    </button>
                                )
                            }
                            <h1>Oslobođeno</h1>
                            {
                                [5, 4, 3, 2, 1].map(i =>
                                    <button
                                        key={i}
                                        style={{ backgroundColor: 'green' }}
                                        onClick={(e) => {
                                            updateFreeSeats(data.brojSlobodnihMesta + i);
                                        }}
                                    >
                                        {i}
                                    </button>
                                )
                            }
                            <br />
                            <button style={{ backgroundColor: 'blue', color: 'white' }}>Ima 10+ mesta</button> */}

                        </div>
                    </div>
                }
            </div>
            <div className="IP-zatvoriOtvoriContainer">Zatvori</div>
            <div className="IP-volumeContainer">Glasnoća</div>
        </div>

    );
};

export default Restaurant;