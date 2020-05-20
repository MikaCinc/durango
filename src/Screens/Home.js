/* React */
import React, {
    useState,
    useEffect,
    Fragment,
    useContext
} from 'react';

/* Data */
import Logo from '../ExtendedLogo/Logo.png';
import noResultsIcon from '../CustomIcons/noResults.png';
import noFavoritesIcon from '../CustomIcons/noFavorites.png';
import defaultLogo from '../CustomIcons/defaultLogo.png';

/* Libraries */
import _ from 'lodash';
import queryString from 'query-string';
import moment from 'moment';

/* Animations */
import Fade from 'react-reveal/Fade';
import Spin from 'react-reveal/Spin';
import FlipMove from 'react-flip-move';

/* Icons */
import Star from '../icons/star.svg';
import Seat from '../icons/seat.svg';
import SeatGray from '../icons/seat_gray.svg';
import SeatOrange from '../icons/seat_orange.svg';
import GearBlue from '../icons/gearBlue.svg';
import watchBlue from '../icons/watchBlue.svg';

/* Components & LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AbsoluteWrapper from '../Components/AbsoluteWrapper';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

const Search = () => {
    const { search, changeSearch } = useContext(DataContext);

    return (
        <div className="search">
            <i className="material-icons-outlined searchIcon">
                search
            </i>
            <input
                className="searchInput"
                placeholder="Pretraži..."
                value={search}
                onChange={(e) => {
                    changeSearch(e.target.value);
                }}
            />
            {
                search && <i
                    className="material-icons-outlined resetSearchIcon"
                    onClick={() => {
                        changeSearch('');
                    }}
                >
                    close
                </i>
            }
        </div>
    )
}

const getTrimmedTitle = (title, n) => {
    if (title.length > n) {
        return title.slice(0, n) + '...';
    }

    return title;
}

const Separator = () => {
    return (
        <div className="listSeparator">Zatvoreni</div>
    )
}

const LabelBadge = ({ label = 'ZATVORENO', color = '#596164', Reservation, object }) => {
    const { User } = useContext(DataContext);

    const [timer, setTimer] = useState('');

    const isReserved = (obj) => {
        if (!User.Reservation || !obj) {
            return false;
        }

        // Is current time behind Reserved Time
        let flag = moment(User.Reservation.Time, 'HH:mm').isAfter();

        if (flag && User.Reservation.ID === obj.id) {
            return true;
        }

        return false;
    }

    useEffect(() => {
        let interval;

        const updateTimer = () => {
            setTimer(
                moment.utc(moment(Reservation.Time, 'HH:mm').diff(moment(), 'seconds') * 1000).format('mm:ss')
            );
        }

        if (isReserved(object)) {
            updateTimer();
            interval = setInterval(() => {
                updateTimer();
                if (!isReserved(object)) {
                    // Timer is over!
                    // Do something
                    // And clearInterval
                    clearInterval(interval);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="listBadge"
            style={
                {
                    backgroundColor: color,
                    // backgroundImage: color,
                    // color:
                }
            }
        >
            {
                label === 'REZERVISANO' ? label + ' | ' + timer : label
            }
        </div>
    )
}

const FavoritBadge = ({ color = '#596164' }) => {
    return (
        <div
            className="favoritBadgeContainer"
            style={
                {
                    backgroundColor: color
                }
            }
        >
            {/* <i
                className="material-icons-outlined favoritBadge"
                style={{
                    fontSize: '18px'
                }}
            >
                star
            </i> */}

            <img src={Star} className="svgIconSmallest favoritBadge" />
        </div>
    )
}

const UpdatedBadge = ({ color = 'white', object }) => {
    // moment().locale('sr'); @todo

    const [label, setLabel] = useState(moment(object.spotsUpdatedAt).fromNow());

    useEffect(() => {
        let interval;

        const updateLabel = () => {
            setLabel(moment(object.spotsUpdatedAt).fromNow());
        }

        updateLabel();
        interval = setInterval(() => {
            updateLabel();
            // clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [object.spotsUpdatedAt]);


    return (
        <div
            className="updatedBadge"
            style={
                {
                    color,
                    background: object.freeSpots === 0
                        ? 'linear-gradient(to top right, #f83600 0%, #f9d423 100%)'
                        : 'linear-gradient(to top right, #00c6fb 0%, #005bea 100%)'
                }
            }
        >
            <p>{label}</p>
            {/* <img src={watchBlue} className="svgIconSmallest updatedBadgeIcon" /> */}
        </div>
    )
}

const List = ({ history }) => {
    const { filteredData, sortedOpen, sortedClosed, loading, User, filters } = useContext(DataContext);

    const isReserved = (obj) => {
        if (!User.Reservation) {
            return false;
        }

        // Is current time behind Reserved Time
        let flag = moment(User.Reservation.Time, 'HH:mm').isAfter();

        if (flag && User.Reservation.ID === obj.id) {
            return true;
        }

        return false;
    }

    if (!(Array.isArray(filteredData) && filteredData.length)) {
        if (loading) return null;

        if (filters.indexOf('omiljeni') !== -1) {
            return (
                <div className="noResults boldText">
                    <h1>
                        Objekte koje označite zvezdicom pojaviće se ovde kao omiljeni
                    </h1>
                    <img className="noResultsIcon" src={noFavoritesIcon} />
                </div>
            )
        }

        return (
            <div className="noResults boldText">
                <h1>
                    Mesto koje tražite nije pronađeno
                </h1>
                <img className="noResultsIcon" src={noResultsIcon} />
            </div>
        )
    }

    return <Fragment>
        <FlipMove
            duration={300}
            easing="ease-out"
            appearAnimation="none"
            enterAnimation="none"
            leaveAnimation="none"
            staggerDurationBy={100}
        // verticalAlignment="bottom"
        // maintainContainerHeight="true"
        >
            {
                sortedOpen.map(Kafic => {
                    return (
                        <div
                            key={Kafic.id}
                            className={`singleLineContainer ${isReserved(Kafic) ? 'reservedObject' : "normalObject"} ${Kafic.preporuka ? 'preporukaObject' : ""}`}
                            onClick={() => {
                                history.push(`/durango/app/${Kafic.id}`);
                            }}
                        >
                            <Fade
                                key={Kafic.id}
                                duration={300}
                                bottom
                                opposite
                                cascade
                            >
                                <div className="singleLine">
                                    <img
                                        className="listLogo"
                                        src={
                                            Kafic.logo
                                                ? `${process.env.PUBLIC_URL}/slike/mockLogos/${Kafic.logo}`
                                                : defaultLogo
                                        }
                                    />
                                    <h1 className="linetitle ">{getTrimmedTitle(Kafic.title, 15)}</h1>
                                    <p className="lineFreeSeats boldText greyText">
                                        {
                                            Kafic.freeSpots >= 10
                                                ? '10+'
                                                : Kafic.freeSpots
                                        }
                                    </p>
                                    <i
                                        className="material-icons-outlined peopleIcon"
                                    >
                                        <img
                                            src={
                                                Kafic.freeSpots > 0
                                                    ? Seat
                                                    : SeatOrange
                                            }
                                            className="svgIcon"
                                        />
                                    </i>
                                    {
                                        isReserved(Kafic) && <LabelBadge
                                            label="REZERVISANO"
                                            color="#005bea"
                                            Reservation={User.Reservation}
                                            object={Kafic}
                                        />
                                    }
                                </div>
                            </Fade>
                            {
                                User.Favourites.indexOf(Kafic.id) !== -1 && <FavoritBadge color="#005bea" />
                            }
                            {
                                Kafic.spotsUpdatedAt && <UpdatedBadge
                                    color="white"
                                    object={Kafic}
                                />
                            }
                        </div>
                    )
                })
            }
        </FlipMove>
        {sortedClosed.length > 0 && <Separator />}
        <FlipMove
            duration={300}
            easing="ease-out"
            appearAnimation="none"
            enterAnimation="none"
            leaveAnimation="none"
            staggerDurationBy={100}
        // verticalAlignment="bottom"
        // maintainContainerHeight="true"
        >
            {
                sortedClosed.map(Kafic => {
                    return <div
                        key={Kafic.id}
                        className="closedObject singleLineContainer"
                        onClick={() => {
                            history.push(`/durango/app/${Kafic.id}`);
                        }}
                    >
                        <div className="singleLine">
                            <img
                                className="listLogo"
                                src={
                                    Kafic.logo
                                        ? `${process.env.PUBLIC_URL}/slike/mockLogos/${Kafic.logo}`
                                        : defaultLogo
                                }
                            />
                            <h1 className="linetitle">{getTrimmedTitle(Kafic.title, 15)}</h1>
                            <p className="lineFreeSeats boldText greyText">
                                {
                                    Kafic.freeSpots >= 10
                                        ? '10+'
                                        : Kafic.freeSpots
                                }
                            </p>
                            <i
                                className="material-icons-outlined peopleIcon"
                                style={{
                                    color: '#B0B0B0'
                                }}
                            >
                                {/* people */}
                                {/* event_seat */}
                                <img src={SeatGray} className="svgIcon" />
                            </i>
                            <LabelBadge />
                        </div>
                        {
                            User.Favourites.indexOf(Kafic.id) !== -1 && <FavoritBadge />
                        }
                    </div>
                })
            }
        </FlipMove>
    </Fragment>
}

const ListAndSearch = ({ history }) => {
    const { toggleFilters, changeSearch, loading, filters, User } = useContext(DataContext);

    const isTurnedOn = () => {
        return filters.indexOf('omiljeni') !== -1
    }

    return (
        <Fragment>
            <div className="mainHeader">
                <img src={Logo} className="logoHeader" />
                <div
                    className="avatarContainer"
                    onClick={() => { history.push('/durango/app/settings') }}
                >
                    <img src={User.imageUrl} className="avatar" />
                    <Spin duration={500}>
                        <img src={GearBlue} className="avatarGears" />
                    </Spin>
                </div>
                <Search />
            </div>
            {
                !loading && <div className="filtersContainer">
                    <div className="filterChipContainer">
                        <div
                            className={`filterChip ${isTurnedOn() ? 'filterChipActive' : ''}`}
                            onClick={() => {
                                toggleFilters('omiljeni');
                                changeSearch('');
                            }}
                        >
                            {
                                isTurnedOn()
                                    ? 'Prikaži sve'
                                    : 'Prikaži omiljene'
                            }
                        </div>
                    </div>
                </div>
            }
            <div className="listHolder">
                <List history={history} />
            </div>
        </Fragment>
    )
}

const MainScreen = ({ history }) => {
    return (
        <div className="list">
            <ListAndSearch history={history} />
        </div>
    )
}

const Home = props => {
    return (
        // <div className="container">
        <div className="App">
            <MainScreen history={props.history} />
        </div>
        // </div>
    );
};

export default Home;