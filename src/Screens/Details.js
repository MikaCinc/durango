/* React */
import React, {
    useState,
    useEffect,
    useContext,
    Fragment
} from 'react';
import '../App.css';

/* Libraries */
import _ from 'lodash';

/* Icons */
// import Star from '../icons/star.svg';
// import StarOutline from '../icons/starOutline.svg';
import Star from '../icons/star.svg';
import StarOutline from '../icons/star_white_border.svg';
import Info from '../icons/info.svg';

/* Router */
import { useParams } from "react-router-dom";

/* Library */
import { isOpen } from '../library/common';
import moment from 'moment';

/* Components */
import Claps from '../Components/Claps';
import AbsoluteWrapper from '../Components/AbsoluteWrapper';

/* Animations */
import Bounce from 'react-reveal/Bounce';
import Roll from 'react-reveal/Roll';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

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
    const { Data, loading, changeData, setCurrentData, User, toggleFavourite } = useContext(DataContext);
    const [data, setData] = useState({ ...placeholderObj });
    const [timer, setTimer] = useState('');

    useEffect(() => {
        let findData = { ..._.find(Data, { 'id': parseInt(id, 10) }) || placeholderObj };

        setData(findData);
        setCurrentData(findData);
    }, [Data]);


    useEffect(() => {
        let interval;

        const updateTimer = () => {
            setTimer(
                moment.utc(moment(User.Reservation.Time, 'HH:mm').diff(moment(), 'seconds') * 1000).format('mm:ss')
            );
        }

        if (isReserved(data)) {
            updateTimer();
            interval = setInterval(() => {
                updateTimer();
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [data]);

    const isFavourite = () => {
        return User.Favourites.indexOf(data.id) !== -1
    }

    const getRadnoVreme = () => {
        const open = isOpen(data.details.radnoVreme);

        return <p className="randoVremeParagraph">
            <span className="greyText">{open ? 'Otvoreno: ' : 'Zatvoreno: '}</span>
            <span style={{ color: open ? '#009A1F' : '#C50505' }}>{data.details.radnoVreme}</span>
        </p>;
    }

    const isReserved = (obj) => {
        if (!User.Reservation) {
            return false;
        }

        // Is current time behind Reserved Time
        let flag = moment(User.Reservation.Time, 'HH:mm').isAfter();

        if (User.Reservation.ID === obj.id && flag) {
            return true;
        }

        return false;
    }

    const restOfPage = () => {
        return (
            <Fragment>
                <div className="detailsSubheader">
                    <div>
                        <h1 className="detailsTitle boldText">{data.title}</h1>
                        {/* <i className="material-icons-outlined greyText">
                        access_time
                    </i> */}
                        {getRadnoVreme()}
                    </div>
                    <Roll
                        right
                        duration={500}
                    >
                        <div>
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
                    </Roll>
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
                        {/* / {data.brojMesta} */}
                    </h1>
                    <i className="material-icons-outlined detailIcon">
                        people
                </i>
                </div>
                <div
                    className="detailsRow clickableRow"
                    onClick={() => {
                        // handleShow()
                        props.history.push(`/durango/app/${data.id}/reserve`);
                    }}
                >
                    <h1 className="detailRowText boldText">
                        {
                            isReserved(data)
                                ? `Rezervisano: ${timer}`
                                : 'Napravi rezervaciju'
                        }
                    </h1>
                    <i className="material-icons-outlined detailIconClickable">
                        book
                </i>
                </div>
                <div className="detailsRow clickableRow" onClick={() => {
                    props.history.push(`/durango/app/${data.id}/more`);
                }}>
                    <h1 className="detailRowText boldText">O mestu</h1>
                    {/* <i className="material-icons-outlined detailIconClickable">
                        info
                </i> */}
                    <img src={Info} className="svgIconSmaller detailIconClickable" />
                </div>
                <div className="detailsRow clickableRow" onClick={() => {
                    toggleFavourite(data.id);
                }}>
                    <h1 className="detailRowText boldText">
                        {
                            isFavourite()
                                ? 'Ukloni iz omiljenih'
                                : 'Dodaj u omiljene'
                        }
                    </h1>
                    <Bounce
                        spy={User.Favourites}
                    >
                        <img src={isFavourite() ? Star : StarOutline} className="svgIconSmaller detailIconClickable" />
                        {/* <i
                            className="material-icons detailIconClickable"
                            style={{ color: isFavourite() ? 'gold' : '' }}
                        >
                            {isFavourite() ? 'star' : 'star_outline'}
                        </i> */}
                    </Bounce>
                </div>
            </Fragment>
        )
    }

    return (
        !loading && restOfPage()
    );
}

export default Details;
