import React, { useEffect, useState, useContext } from 'react';

/* Libraries */
import moment from 'moment';
import _ from 'lodash';
import { isOpen } from '../../library/common';

/* Router */
import { useParams } from "react-router-dom";

/* Default Logo */
import defaultLogo from '../../CustomIcons/defaultLogo.png';

/* Data */
import Logo from '../../ExtendedLogo/Logo.png';
import kafici from '../../data/kafici';

/* Context */
import ObjectContext, { ObjectProvider } from '../../Context/objectContext';

const Restaurant = ({ history }) => {
    const { id } = useParams();

    const { Data, loading } = useContext(ObjectContext);

    // const [id, setId] = useState(null)
    const [currentTime, setCurrentTime] = useState(moment());
    const [data, setData] = useState({});
    const [currentNumber, setCurrentNumber] = useState(3);
    const [volume, setVolume] = useState(2);

    useEffect(() => {
        if (!Data || !Data.length) return;
        
        let findData;

        if (id) {
            findData = { ..._.find(Data, { 'id': parseInt(id, 10) }) };
        }

        if (findData.id) {
            setData(findData);
        } /* else {
            history.push('/durango/inputPanel/login');
        } */

    }, [Data]);

    useEffect(() => {
        // Request na server
    }, [currentNumber]);

    useEffect(() => {
        // Request na server
    }, [volume]);

    useEffect(() => {
        if (data.brojSlobodnihMesta || data.brojSlobodnihMesta === 0) {
            setCurrentNumber(data.brojSlobodnihMesta);
        }
    }, [data]);

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
            <span style={{ color: open ? '#009A1F' : 'orangered' }}>{data.details.radnoVreme}</span>
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
                <div className="IP-time">
                    {currentTime.format("HH:mm:ss")}
                </div>
                <img src={Logo} className="detailsDurangoLogo" />
                <i
                    className="material-icons IP-settings-icon"
                    onClick={() => {
                        history.push('/durango/inputPanel/' + data.id + '/settings');
                    }}
                >
                    settings
                </i>
            </div>
            {
                data && data.id && <div className="IP-data-loaded">
                    <div className="page container">
                        <div className="IP-dataLoaded">
                            <div className="detailsSubheader">
                                <div>
                                    <h1 className="detailsTitle boldText">{data.title}</h1>
                                    {getRadnoVreme()}
                                </div>
                                <img
                                    src={
                                        data.logo
                                            ? `${process.env.PUBLIC_URL}/slike/mockLogos/${data.logo}`
                                            : defaultLogo
                                    }
                                    className={
                                        `detailsLogo reveal-focus-${
                                        data.brojSlobodnihMesta && isOpen(data.details.radnoVreme) > 0
                                            ? 'blue'
                                            : 'orange'
                                        }`
                                    }
                                />
                            </div>
                            <div className="IP-counter-container">
                                <div className="IP-input-sideButton">
                                    <button
                                        className={
                                            `IP-input-nemaMesta IP-clickable ${
                                            currentNumber === 0
                                                ? 'IP-input-selected'
                                                : ''
                                            }`
                                        }
                                        onClick={() => {
                                            setCurrentNumber(0)
                                        }}>
                                        Nemamo mesta
                                </button>
                                </div>
                                <div className="IP-center-container">
                                    <div className="IP-center-upper">
                                        <input
                                            className="IP-input"
                                            type="number"
                                            value={currentNumber}
                                            onChange={
                                                (e) => {
                                                    let value = e.target.value;
                                                    if (!value) {
                                                        setCurrentNumber(0);
                                                        return;
                                                    }

                                                    if (value <= 10 && value >= 0) {
                                                        setCurrentNumber(parseInt(value, 10));
                                                    }
                                                }
                                            }
                                        />
                                        <div className="IP-center-ukupnoMesta">{data.brojMesta}</div>
                                    </div>
                                    <div className="IP-dial-container">
                                        {
                                            [..._.range(1, 10)].map(i => {
                                                return (
                                                    <button
                                                        key={i}
                                                        className={
                                                            `IP-dial-button IP-clickable ${
                                                            currentNumber === i
                                                                ? 'IP-input-selected'
                                                                : ''
                                                            }`
                                                        }
                                                        onClick={() => {
                                                            setCurrentNumber(i)
                                                        }}
                                                    >
                                                        {i}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="IP-input-sideButton">
                                    <button
                                        className={
                                            `IP-input-imaMesta IP-clickable ${
                                            currentNumber === 10
                                                ? 'IP-input-selected'
                                                : ''
                                            }`
                                        }
                                        onClick={() => {
                                            setCurrentNumber(10)
                                        }}
                                    >
                                        Imamo 10+ mesta
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="IP-zatvoriOtvoriContainer">Zatvori</div>
                    <div className="IP-volumeContainer">
                        <div className="IP-volume-label">
                            Glasnoća
                        </div>
                        {
                            ['Tiho', 'Umereno', 'Glasno'].map((level, i) => {
                                return (
                                    <div
                                        key={level}
                                        className={`IP-volume-level ${volume === i + 1 ? 'IP-volume-active' : ''}`}
                                        onClick={() => {
                                            setVolume(i + 1);
                                        }}
                                    >
                                        {level}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Restaurant;