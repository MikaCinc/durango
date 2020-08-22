import React, { useEffect, useState, useContext, Fragment } from 'react';

/* Libraries */
import _ from 'lodash';
import { isOpen, getTodaysWorkingHours, getApiUrl } from '../../library/common';
import moment from 'moment';

/* Components */
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

/* Animations */
import Zoom from 'react-reveal/Zoom';
import Pulse from 'react-reveal/Pulse';
import Jello from 'react-reveal/Jello';

/* Default Logo */
import defaultLogo from '../../CustomIcons/defaultLogo.png';

/* Context */
import ObjectContext from '../../Context/objectContext';

const Restaurant = ({ history }) => {
    const { data, setData, setErrorModalMessage, refreshTokenFunction, setNotUpdatedRecently } = useContext(ObjectContext);
    const [currentNumber, setCurrentNumber] = useState(data.freeSpots);
    const [lastUpdatedlabel, setLastUpdatedlabel] = useState(moment(data.spotsUpdatedAt).fromNow());
    const [labelColor, setLabelColor] = useState('linear-gradient(to top right, #ad080f 0%, #ff0000 100%)');

    useEffect(() => {
        if (!data || !data.id) {
            return;
        };

        if (currentNumber === data.freeSpots) {
            return;
        }

        if (currentNumber || currentNumber === 0) {
            postNewFreeSeatsNumber();
        }

    }, [currentNumber]);

    useEffect(() => {
        if (data.freeSpots || data.freeSpots === 0) {
            setCurrentNumber(data.freeSpots);
        }
    }, [data]);

    useEffect(() => {
        if (!data || !data.spotsUpdatedAt) {
            return;
        }
        let interval,
            reminderInterval;

        const updateLabel = () => {
            let updatedAt = moment(data.spotsUpdatedAt),
                hoursTillUpdated = moment.duration(moment().diff(updatedAt)).asHours();

            if (hoursTillUpdated <= 1) {
                setLabelColor(`linear-gradient(to top right, #00c6fb 0%, #005bea 100%)`);
            } else if (hoursTillUpdated > 1 && hoursTillUpdated <= 5) {
                setLabelColor(`linear-gradient(to top right, #f83600 0%, #f9d423 100%)`);
            } else if (hoursTillUpdated > 5 && hoursTillUpdated <= 8) {
                setLabelColor(`linear-gradient(to top right, #ff0844 0%, #ffb199 100%)`);
            } else if (hoursTillUpdated > 8) {
                setLabelColor(`linear-gradient(to top right, #ad080f 0%, #ff0000 100%)`);
            }
            setLastUpdatedlabel(updatedAt.fromNow());
        }

        updateLabel();
        interval = setInterval(() => {
            updateLabel();
            // clearInterval(interval);
        }, 1000);

        const shouldShowReminder = () => {
            let updatedAt = moment(data.spotsUpdatedAt),
                hoursTillUpdated = moment.duration(moment().diff(updatedAt)).asHours();

            if (hoursTillUpdated > 1) {
                setNotUpdatedRecently(true);
            }
        }

        shouldShowReminder();
        reminderInterval = setInterval(() => {
            shouldShowReminder();
        }, 10 * 60 * 1000);

        return () => {
            clearInterval(interval);
            clearInterval(reminderInterval);
        };
    }, [data.spotsUpdatedAt]);

    const postNewFreeSeatsNumber = () => {
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
            body: JSON.stringify({ freeSpots: currentNumber })
        }).then(response => {
            return response.json();
        }).then(response => {
            const { data, error, message } = response;
            if (error && data.tokenExpired) {
                refreshTokenFunction(postNewFreeSeatsNumber);
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

    const getWorkingHours = () => {
        let timeForDay = getTodaysWorkingHours(data.details.workingHours);
        if (!timeForDay) {
            return <p className="randoVremeParagraph">
                <span style={{ color: 'orangered' }}>ZATVORENO</span>
            </p>
        }
        const open = isOpen(data.details.workingHours, data.isManualyClosed);

        return <p className="randoVremeParagraph">
            <span className="greyText">{open ? 'Otvoreno: ' : 'Zatvoreno: '}</span>
            <span style={{ color: open ? '#009A1F' : 'orangered' }}>{timeForDay}</span>
        </p>;
    }

    const getLastUpdatedLabel = () => {
        return <div
            className="greyText"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            Poslednje ažuriranje broja:
            <div
                style={{
                    background: labelColor,
                    borderRadius: '15px',
                    color: 'white',
                    padding: '7px',
                    margin: '5px'
                }}
            >
                {lastUpdatedlabel}
            </div>
        </div>
    }

    return (
        <Fragment>
            <div className="IP-Container">
                <div className="IP-data-loaded">
                    <div>
                        <div className="IP-dataLoaded">
                            <div className="detailsSubheader">
                                <div>
                                    <Zoom cascade>
                                        <h1 className="detailsTitle boldText">{data.title}</h1>
                                    </Zoom>
                                    {getWorkingHours()}
                                </div>
                                <Zoom
                                    top
                                    duration={1000}
                                >
                                    <div>
                                        <img
                                            src={
                                                data.logo
                                                    ? `${getApiUrl() + data.logo}`
                                                    : defaultLogo
                                            }
                                            className={
                                                `detailsLogo reveal-focus-${
                                                data.freeSpots && isOpen(data.details.workingHours, data.isManualyClosed) > 0
                                                    ? 'blue'
                                                    : 'orange'
                                                }`
                                            }
                                            alt="logo"
                                        />
                                    </div>
                                </Zoom>
                            </div>
                            <div className="IP-center-upper">
                                <h5
                                    style={
                                        {
                                            textAlign: 'right',
                                        }
                                    }
                                >
                                    Trenutno slobodno
                                </h5>
                                <Jello spy={data.freeSpots}>
                                    <OverlayTrigger
                                        placement={'top'}
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                Ovaj broj slobodnih mesta korisnici vide u aplikaciji u ovom trenutku
                                            </Tooltip>
                                        }
                                    >
                                        <input
                                            className="IP-input"
                                            type="number"
                                            min={0}
                                            max={10}
                                            value={currentNumber}
                                            onChange={
                                                (e) => {
                                                    let { value, min, max } = e.target;
                                                    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
                                                    setCurrentNumber(value);
                                                }
                                            }
                                        />
                                    </OverlayTrigger>
                                </Jello>
                                <h5>od ukupno {data.totalSpots}</h5>
                                {/* <div className="IP-center-ukupnoMesta">{data.totalSpots}</div> */}
                            </div>
                            {getLastUpdatedLabel()}
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
                                        }}
                                    >
                                        Nemamo mesta
                                        </button>
                                </div>
                                <div className="IP-center-container">
                                    <Pulse>
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
                                    </Pulse>
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
                </div>
            </div>
        </Fragment>
    );
};

export default Restaurant;