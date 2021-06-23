/* React */
import React, {
    useState,
    useEffect,
    Fragment,
    useContext
} from 'react';

/* Data */
import Logo from '../ExtendedLogo/LogoBetaV3.png';
import noResultsIcon from '../CustomIcons/noResults.png';
import errorIcon from '../CustomIcons/errorModal.png';
import noFavoritesIcon from '../CustomIcons/noFavorites.png';
import defaultLogo from '../CustomIcons/defaultLogo.png';
import defaultAvatar from '../CustomIcons/defaultAvatar.png';

/* Libraries */
import moment from 'moment';
import { getApiUrl } from '../library/common';
import _ from 'lodash';

/* Animations */
import Fade from 'react-reveal/Fade';
import Spin from 'react-reveal/Spin';
import FlipMove from 'react-flip-move';

/* Icons */
import Star from '../icons/star.svg';
import Seat from '../icons/seat.svg';
import SeatGray from '../icons/seat_gray.svg';
import SeatRed from '../icons/seatRed.svg';
import SeatDarkRed from '../icons/seatDarkRed.svg';
import SeatOrange from '../icons/seat_orange.svg';
import GearBlue from '../icons/gearBlue.svg';
import Audio from '../icons/audioBlue.svg';
import AudioLight from '../icons/audioLightblue.svg';

import CaffeIcon from '../icons/MainIcons/armchair.png';
import BilliardIcon from '../icons/MainIcons/pool-table.png';

/* Components & LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

/* Context */
import DataContext from '../Context/dataContext';

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
        if (!User || !User.reservation || !obj) {
            return false;
        }

        // Is current time behind Reserved Time
        let flag = moment(User.reservation.time, 'HH:mm').isAfter();

        if (flag && User.reservation.id === obj.id) {
            return true;
        }

        return false;
    }

    useEffect(() => {
        if (!Reservation) {
            return;
        };

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
    }, [Reservation]);

    return (
        <div
            className="listBadge"
            style={
                {
                    backgroundColor: color,
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
            <img src={Star} className="svgIconSmallest favoritBadge" alt="icon" />
        </div>
    )
}

const UpdatedBadge = ({ color = 'white', object }) => {
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

    const getLabelColor = () => {
        let hoursTillUpdated = moment.duration(moment().diff(moment(object.spotsUpdatedAt))).asHours(),
            labelColor;

        if (hoursTillUpdated <= 1) {
            labelColor = `linear-gradient(to top right, #00c6fb 0%, #005bea 100%)`;
        } else if (hoursTillUpdated > 1 && hoursTillUpdated <= 5) {
            labelColor = `linear-gradient(to top right, #f83600 0%, #f9d423 100%)`;
        } else if (hoursTillUpdated > 5 && hoursTillUpdated <= 8) {
            labelColor = `linear-gradient(to top right, #ff0844 0%, #ffb199 100%)`;
        } else if (hoursTillUpdated > 8) {
            labelColor = `linear-gradient(to top right, #ad080f 0%, #ff0000 100%)`;
        }

        return labelColor;
    }

    return (
        <div
            className="updatedBadge"
            style={
                {
                    color,
                    background: getLabelColor()
                }
            }
        >
            <p>{label}</p>
            {/* <img src={watchBlue} className="svgIconSmallest updatedBadgeIcon" /> */}
        </div>
    )
}

const List = ({ history }) => {
    const { Data, filteredData, sortedOpen, sortedClosed, loading, User, filters, info } = useContext(DataContext);

    if ((!Data || !Data.length) && !loading) {
        return (
            <div className="noResults boldText">
                <h1>
                    Greška na serveru, pokušajte malo kasnije
                </h1>
                <img className="noResultsIcon" src={errorIcon} alt="icon" />
            </div>
        )
    }

    const isReserved = (obj) => {
        if (!User || !User.reservation) {
            return false;
        }

        // Is current time behind Reserved Time
        let flag = moment(User.reservation.time, 'HH:mm').isAfter();

        if (flag && User.reservation.id === obj.id) {
            return true;
        }

        return false;
    }

    const getSeatIcon = (object) => {
        /* let hoursTillUpdated = moment.duration(moment().diff(moment(object.spotsUpdatedAt))).asHours(),
            seatInColor; */

        /* if (hoursTillUpdated <= 1) {
            seatInColor = Seat;
        } else if (hoursTillUpdated > 1 && hoursTillUpdated <= 5) {
            seatInColor = SeatOrange;
        } else if (hoursTillUpdated > 5 && hoursTillUpdated <= 8) {
            seatInColor = SeatRed;
        } else if (hoursTillUpdated > 8) {
            seatInColor = SeatDarkRed;
        } */

        let icon;
        switch(object.type) {
            case 'caffe': icon = CaffeIcon; break;
            case 'billiard': icon = BilliardIcon; break;
            default: icon = CaffeIcon;
        }

        return <img
            src={icon}
            className="svgIcon"
            alt="icon"
        />
    }

    const getInfoForTile = (Kafic) => {
        if (!info) {
            return null;
        }

        switch (info) {
            case 'address': {
                return <p className="greyText mb-0">{Kafic.details.address}</p>;
            }
            case 'volume': {
                return (
                    <span className="d-flex">
                        {
                            [1, 2, 3].map((i) => {
                                return (
                                    <img
                                        key={i}
                                        src={
                                            _.inRange(i, 0, Kafic.details.volume + 1)
                                                ? Audio
                                                : AudioLight
                                        }
                                        className="svgIconSmaller"
                                        alt="icon"
                                    />
                                )
                            })
                        }
                    </span>
                )
            }
            case 'claps': {
                return (
                    <div>
                        {
                            Kafic.details.totalClaps || '0'
                        }
                        <span className="ml-1" role="img" aria-label="claps">👏</span>
                    </div>
                )
            }
            default: return null;
        }
    }

    if (!(Array.isArray(filteredData) && filteredData.length)) {
        if (loading) return null;

        if (filters.indexOf('omiljeni') !== -1) {
            return (
                <div className="noResults boldText">
                    <h1>
                        Objekte koje označite zvezdicom pojaviće se ovde kao omiljeni
                    </h1>
                    <img className="noResultsIcon" src={noFavoritesIcon} alt="icon" />
                </div>
            )
        }

        return (
            <div className="noResults boldText">
                <h1>
                    Mesto koje tražite nije pronađeno
                </h1>
                <img className="noResultsIcon" src={noResultsIcon} alt="icon" />
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
                                history.push(`/app/${Kafic.id}`);
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
                                                // ? `${getApiUrl() + Kafic.logo}`
                                                ? `${process.env.PUBLIC_URL + '/slike/mockLogos/' + Kafic.logo}`
                                                : defaultLogo
                                        }
                                        alt="icon"
                                    />
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                        className="linetitle"
                                    >
                                        <h1>{getTrimmedTitle(Kafic.title, 15)}</h1>
                                        {
                                            // showAddresses && <p className="greyText mb-0">{Kafic.details.address}</p>
                                        }
                                        {
                                            info && getInfoForTile(Kafic)
                                        }
                                    </div>
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
                                        {getSeatIcon(Kafic)}
                                    </i>
                                    {
                                        isReserved(Kafic) && <LabelBadge
                                            label="REZERVISANO"
                                            color="#005bea"
                                            Reservation={User.reservation}
                                            object={Kafic}
                                        />
                                    }
                                </div>
                            </Fade>
                            {
                                User && User.id && User.favourites.indexOf(Kafic.id) !== -1 && <FavoritBadge color="#005bea" />
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
        >
            {
                sortedClosed.map(Kafic => {
                    return <div
                        key={Kafic.id}
                        className="closedObject singleLineContainer"
                        onClick={() => {
                            history.push(`/app/${Kafic.id}`);
                        }}
                    >
                        <div className="singleLine">
                            <img
                                className="listLogo"
                                src={
                                    Kafic.logo
                                        // ? `${getApiUrl() + Kafic.logo}`
                                        ? `${process.env.PUBLIC_URL + '/slike/mockLogos/' + Kafic.logo}`
                                        : defaultLogo
                                }
                                alt="icon"
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                                className="linetitle"
                            >
                                <h1>{getTrimmedTitle(Kafic.title, 15)}</h1>
                                {
                                    info && getInfoForTile(Kafic)
                                }
                            </div>
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
                                <img src={CaffeIcon} className="svgIcon" alt="icon" />
                            </i>
                            <LabelBadge
                                Reservation={null}
                                object={null}
                            />
                        </div>
                        {
                            User && User.id && User.favourites.indexOf(Kafic.id) !== -1 && <FavoritBadge />
                        }
                    </div>
                })
            }
        </FlipMove>
    </Fragment>
}

const ListAndSearch = ({ history }) => {
    const {
        toggleFilters,
        changeSearch,
        loading,
        filters,
        User,
        setShowLoginModal,
        sortBy,
        info,
        setInfo,
        setSortBy
    } = useContext(DataContext);
    const [isSticky, setSticky] = useState(false);

    const isTurnedOn = () => {
        return filters.indexOf('omiljeni') !== -1
    }

    const handleScroll = () => {
        setSticky(window.pageYOffset !== 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getAvatarSrc = () => {
        let accessToken = localStorage.getItem('userAccessToken');
        if (!User || !accessToken || !User.imageUrl) {
            return defaultAvatar;
        }

        return User.imageUrl;
    }

    return (
        <Fragment>
            <div className={`mainHeader ${isSticky ? 'acrylic' : ''}`}>
                <div>
                    <img src={Logo} className="logoHeader" alt="icon" />
                    <div
                        className="avatarContainer"
                        onClick={() => { history.push('/app/settings') }}
                    >
                        <img src={getAvatarSrc()} className="avatar" alt="icon" />
                        <Spin duration={500}>
                            <img src={GearBlue} className="avatarGears" alt="icon" />
                        </Spin>
                    </div>
                    <Search />
                </div>
            </div>
            {
                !loading && <div className="filtersContainer">
                    {/* <div className="filtersMask"></div> */}
                    <div className="filterChipContainer chip">
                        <div
                            className={`filterChip ${isTurnedOn() ? 'filterChipActive' : ''}`}
                            onClick={() => {
                                if (!User || !User.id) {
                                    setShowLoginModal(true);
                                    return;
                                }
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
                    <div className="sortChipContainer chip">
                        <div
                            className={`sortChip ${sortBy === 'spotsUpdatedAt' ? '' : 'sortChipActive'}`}
                            onClick={() => {
                                if (sortBy === 'spotsUpdatedAt') {
                                    setSortBy('freeSpots');
                                    return;
                                }

                                setSortBy('spotsUpdatedAt');
                            }}
                        >
                            Sortirano po
                            <span className="boldText ml-1">
                                {
                                    sortBy === 'spotsUpdatedAt' ? 'ažurnosti' : 'broju mesta'
                                }
                            </span>
                        </div>
                    </div>
                    <div className="addressesChipContainer chip">
                        <div
                            className={`addressesChip ${info === 'address' ? 'addressesChipActive' : ''}`}
                            onClick={() => {
                                setInfo(info === 'address' ? '' : 'address');
                            }}
                        >
                            {
                                info === 'address' ? 'Ukloni adrese' : 'Prikaži adrese'
                            }
                        </div>
                    </div>
                    <div className="volumeChipContainer chip">
                        <div
                            className={`volumeChip ${info === 'volume' ? 'volumeChipActive' : ''}`}
                            onClick={() => {
                                setInfo(info === 'volume' ? '' : 'volume');
                            }}
                        >
                            {
                                info === 'volume' ? 'Ukloni glasnoću' : 'Prikaži glasnoću'
                            }
                        </div>
                    </div>
                    <div className="clapsChipContainer chip">
                        <div
                            className={`clapsChip ${info === 'claps' ? 'clapsChipActive' : ''}`}
                            onClick={() => {
                                setInfo(info === 'claps' ? '' : 'claps');
                            }}
                        >
                            {
                                info === 'claps' ? 'Ukloni 👏' : 'Prikaži 👏'
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
    const {
        setShowFeedbackModal
    } = useContext(DataContext);

    return (
        <div className="App">
            <MainScreen history={props.history} />
            <div
                className="feedbackContainer acrylicDarkBlue"
                onClick={() => {
                    setShowFeedbackModal(true);
                }}
            >
                Tvoje mišljenje
                <span
                    className="ml-1"
                    role="img"
                    aria-label="feedback"
                >
                    📋
                </span>
            </div>
        </div>
    );
};

export default Home;