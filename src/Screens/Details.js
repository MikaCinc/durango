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
import Info from '../icons/infoWhite.svg';
import Book from '../icons/bookWhite.svg';
import Seat from '../icons/seat.svg';
import SeatGray from '../icons/seat_gray.svg';
import SeatOrange from '../icons/seat_orange.svg';
import NearMe from '../icons/nearMeWhite.svg';

/* Default Logo */
import defaultLogo from '../CustomIcons/defaultLogo.png';

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
    totalSpots: 0,
    freeSpots: 0,
    details: {
        description: '',
        images: '',
        workingHours: '',
        location: '',
        menu: ''
    }
}

const UkupnoMestaBadge = ({ color = 'white', object }) => {
    // moment().locale('sr'); @todo

    return (
        <div
            className="updatedBadge"
            style={
                {
                    top: 0,
                    right: 0,
                    bottom: 'auto',
                    left: 'auto',
                    color,
                    fontSize: '12px',
                    background: object.freeSpots === 0
                        ? 'linear-gradient(to bottom left, #f83600 0%, #f9d423 100%)'
                        : 'linear-gradient(to bottom left, #00c6fb 0%, #005bea 100%)'
                }
            }
        >
            <p>Ukupno mesta: {object.totalSpots}</p>
        </div>
    )
}

const UpdatedBadge = ({ color = 'white', object }) => {
    // moment().locale('sr'); @todo

    return (
        <div
            className="updatedBadge"
            style={
                {
                    color,
                    fontSize: '12px',
                    background: object.freeSpots === 0
                        ? 'linear-gradient(to top right, #f83600 0%, #f9d423 100%)'
                        : 'linear-gradient(to top right, #00c6fb 0%, #005bea 100%)'
                }
            }
        >
            <p>Poslednje ažuriranje u: {moment(object.spotsUpdatedAt).format('HH:mm:ss')}</p>
            {/* <img src={watchBlue} className="svgIconSmallest updatedBadgeIcon" /> */}
        </div>
    )
}

function Details(props) {
    let { id } = useParams();
    const { Data, loading, changeData, setCurrentData, User, toggleFavourite, setShowComingSoonModal } = useContext(DataContext);
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
        let day = moment().isoWeekday() - 1;
        const open = isOpen(data.details.workingHours[day]);

        return <p className="randoVremeParagraph">
            <span className="greyText">{open ? 'Otvoreno: ' : 'Zatvoreno: '}</span>
            <span style={{ color: open ? '#009A1F' : 'orangered' }}>{data.details.workingHours[day]}</span>
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
        let day = moment().isoWeekday() - 1;

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
                                    data.logo
                                        ? `${process.env.PUBLIC_URL}/slike/mockLogos/${data.logo}`
                                        : defaultLogo
                                }
                                className={
                                    `detailsLogo reveal-focus-${
                                    data.freeSpots && isOpen(data.details.workingHours[day]) > 0
                                        ? 'blue'
                                        : 'orange'
                                    }`
                                }
                            />
                        </div>
                    </Roll>
                </div>
                <div className="detailsRowMax">
                    <h1 className="detailRowText">
                        Slobodnih mesta:
                    <span style={{
                            color: data.freeSpots > 0 ? '#3185FC' : 'orangered',
                        }}>
                            {
                                ` ${
                                data.freeSpots >= 10
                                    ? '10+'
                                    : data.freeSpots
                                } `
                            }
                        </span>
                        {/* / {data.totalSpots} */}
                    </h1>
                    <img
                        src={
                            data.freeSpots > 0
                                ? Seat
                                : SeatOrange
                        }
                        className="svgIcon"
                    />
                    {
                        data.spotsUpdatedAt && <UpdatedBadge
                            color="white"
                            object={data}
                        />
                    }
                    {
                        data.totalSpots && <UkupnoMestaBadge
                            color="white"
                            object={data}
                        />
                    }
                </div>
                <div
                    className="detailsRow clickableRow"
                    onClick={() => {
                        setShowComingSoonModal(true);
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
                    <img
                        src={Book}
                        className="svgIconSmaller"
                    />
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
                <div
                    className="detailsRow clickableRow"
                    onClick={() => {
                        window.open(data.details.location, '_blank');
                    }}
                >
                    <h1 className="detailRowText boldText">Prikaži na mapi</h1>
                    <img
                        src={NearMe}
                        className="svgIconSmaller"
                    />
                </div>
            </Fragment>
        )
    }

    return (
        !loading && data.id && restOfPage()
    );
}

export default Details;
