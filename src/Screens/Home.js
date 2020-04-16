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

/* Libraries */
import _ from 'lodash';
import queryString from 'query-string';

/* Animations */
import Fade from 'react-reveal/Fade';
import FlipMove from 'react-flip-move';

/* Components & LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AbsoluteWrapper from '../Components/AbsoluteWrapper';

/* Images */
import vinyl from '../slike/vinyl.png';
import Square from '../slike/Square.jpg';
import dnevnaSoba from '../slike/dnevnaSoba.jpg';
import durangoCaffe from '../slike/durangoCaffe.png';

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

const getSrc = (title) => {
    switch (title) {
        case 'vinyl': {
            return vinyl;
        };
        case 'Square': {
            return Square;
        };
        case 'dnevnaSoba': {
            return dnevnaSoba;
        };
        case 'durangoCaffe': {
            return durangoCaffe;
        };
        default: {
            return Square;
        }
    }
}

const getTrimmedTitle = (title, n) => {
    if (title.length > 13) {
        return title.slice(0, 13) + '...';
    }

    return title;
}

const Separator = () => {
    return (
        <div className="listSeparator">Zatvoreni</div>
    )
}

const LabelBadge = ({ label = 'ZATVORENO', color = '#B0B0B0' }) => {
    return (
        <div
            className="listBadge"
            style={{ backgroundColor: color }}
        >
            {label}
        </div>
    )
}

const FavoritBadge = () => {
    return (
        <div
            className="favoritBadgeContainer"
        >
            <i
                className="material-icons-outlined favoritBadge"
                style={{
                    fontSize: '18px'
                }}
            >
                star
            </i>
        </div>
    )
}

const List = ({ history }) => {
    const { filteredData, sortedOpen, sortedClosed, loading, User } = useContext(DataContext);

    if (!(Array.isArray(filteredData) && filteredData.length)) {
        if (loading) return null;

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
        >
            {
                sortedOpen.map(Kafic => {
                    return (
                        <div
                            key={Kafic.id}
                            className="normalObject button"
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
                                    <img className="listLogo" src={getSrc(Kafic.logo.split('.')[0])} />
                                    <h1 className="linetitle ">{getTrimmedTitle(Kafic.title, 10)}</h1>
                                    <p className="lineFreeSeats boldText greyText">
                                        {Kafic.brojSlobodnihMesta}
                                    </p>
                                    <i
                                        className="material-icons-outlined peopleIcon"
                                        style={{
                                            color: Kafic.brojSlobodnihMesta > 0
                                                ? '#3185FC'
                                                : '#C50505'
                                        }}
                                    >
                                        people
                            </i>
                                </div>
                            </Fade>
                            {
                                User.Favourites.indexOf(Kafic.id) !== -1 && <FavoritBadge />
                            }
                        </div>
                    )
                })
            }
        </FlipMove>
        <Separator />
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
                        className="closedObject button"
                        onClick={() => {
                            history.push(`/durango/app/${Kafic.id}`);
                        }}
                    >
                        <div className="singleLine">
                            <img className="listLogo" src={getSrc(Kafic.logo.split('.')[0])} />
                            <h1 className="linetitle">{getTrimmedTitle(Kafic.title, 10)}</h1>
                            <p className="lineFreeSeats boldText greyText">
                                {Kafic.brojSlobodnihMesta}
                            </p>
                            <i
                                className="material-icons-outlined peopleIcon"
                                style={{
                                    color: '#B0B0B0'
                                }}
                            >
                                people
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
    const { toggleFilters, changeSearch, loading, filters } = useContext(DataContext);

    const isTurnedOn = () => {
        return filters.indexOf('omiljeni') !== -1
    }

    return (
        <Fragment>
            <div className="mainHeader">
                <img src={Logo} className="logoHeader" />
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
        <AbsoluteWrapper>
            <div className="App">
                <MainScreen history={props.history} />
            </div>
        </AbsoluteWrapper>
    );
};

export default Home;