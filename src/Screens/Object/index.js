import React, { useEffect, useState, useContext, Fragment } from 'react';

/* Libraries */
import moment from 'moment';
import _ from 'lodash';
import { isOpen } from '../../library/common';

/* Animations */
import Zoom from 'react-reveal/Zoom';
import Pulse from 'react-reveal/Pulse';
import Jump from 'react-reveal/Jump';

/* Router */
import { useParams } from "react-router-dom";

/* Default Logo */
import defaultLogo from '../../CustomIcons/defaultLogo.png';

/* Context */
import ObjectContext, { ObjectProvider } from '../../Context/objectContext';

const Restaurant = ({ history }) => {
    const { id } = useParams();

    const { Data, loading } = useContext(ObjectContext);

    const [data, setData] = useState({});
    const [currentNumber, setCurrentNumber] = useState(3);

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
        if (data.freeSpots || data.freeSpots === 0) {
            setCurrentNumber(data.freeSpots);
        }
    }, [data]);

    const getRadnoVreme = () => {
        let day = moment().isoWeekday() - 1;
        const open = isOpen(data.details.workingHours[day]);

        return <p className="randoVremeParagraph">
            <span className="greyText">{open ? 'Otvoreno: ' : 'Zatvoreno: '}</span>
            <span style={{ color: open ? '#009A1F' : 'orangered' }}>{data.details.workingHours[day]}</span>
        </p>;
    }

    const updateFreeSeats = (value) => {
        if (!value) return;

        setData({
            ...data,
            freeSpots: value
        })
    }

    return (
        <Fragment>
            {
                data && data.id && <div className="IP-Container">
                    <div className="IP-data-loaded">
                        <div>
                            <div className="IP-dataLoaded">
                                <div className="detailsSubheader">
                                    <div>
                                        <Zoom cascade>
                                            <h1 className="detailsTitle boldText">{data.title}</h1>
                                        </Zoom>
                                        {getRadnoVreme()}
                                    </div>
                                    <Zoom
                                        top
                                        duration={1000}
                                    >
                                        <div>
                                            <img
                                                src={
                                                    data.logo
                                                        ? `${process.env.PUBLIC_URL}/slike/mockLogos/${data.logo}`
                                                        : defaultLogo
                                                }
                                                className={
                                                    `detailsLogo reveal-focus-${
                                                    data.freeSpots && isOpen(data.details.workingHours[moment().isoWeekday() - 1]) > 0
                                                        ? 'blue'
                                                        : 'orange'
                                                    }`
                                                }
                                            />
                                        </div>
                                    </Zoom>
                                </div>
                                <div className="IP-center-upper">
                                    <h5>Trenutno slobodno </h5>
                                    <Jump spy={currentNumber}>
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
                                    </Jump>
                                    <h5>od ukupno {data.totalSpots}</h5>
                                    {/* <div className="IP-center-ukupnoMesta">{data.totalSpots}</div> */}
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
            }
        </Fragment>
    );
};

export default Restaurant;