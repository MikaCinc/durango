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
import { isOpen } from '../library/common';

/* Animations */
import Slide from 'react-reveal/Slide';

/* Components & LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import Badge from 'react-bootstrap/Badge'

/* Images */
import vinyl from '../slike/vinyl.png';
import Square from '../slike/Square.jpg';
import dnevnaSoba from '../slike/dnevnaSoba.jpg';
import durangoCaffe from '../slike/durangoCaffe.png';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

const Search = () => {
    const { changeSearch } = useContext(DataContext);

    const [search, setSearch] = useState('');

    useEffect(() => {
        changeSearch(search);
    }, [search]);

    return (
        <div className="search">
            <i className="material-icons searchIcon">
                search
            </i>
            <input
                className="searchInput"
                placeholder="Pretraži..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }} />
            {
                search && <i
                    className="material-icons resetSearchIcon"
                    onClick={() => {
                        setSearch('');
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

const LabelBadge = ({ label = 'ZATVORENO', color = 'gray' }) => {
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
                className="material-icons favoritBadge"
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
    const { filteredData, sortedOpen, sortedClosed, loading } = useContext(DataContext);

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
        {
            sortedOpen.map(Kafic => {
                return <div
                    key={Kafic.id}
                    className="singleLine button"
                    onClick={() => {
                        history.push(`/durango/app/${Kafic.id}`);
                    }}
                >
                    <img className="listLogo" src={getSrc(Kafic.logo.split('.')[0])} />
                    <h1 className="linetitle ">{getTrimmedTitle(Kafic.title, 10)}</h1>
                    <p className="lineFreeSeats boldText greyText">
                        {Kafic.brojSlobodnihMesta}
                    </p>
                    <i
                        className="material-icons peopleIcon"
                        style={{
                            color: Kafic.brojSlobodnihMesta > 0
                                ? '#3185FC'
                                : '#C50505'
                        }}
                    >
                        people
                    </i>
                    {
                        Kafic.favorit && <FavoritBadge />
                    }
                </div>
            })
        }
        <Separator />
        {
            sortedClosed.map(Kafic => {
                return <div
                    key={Kafic.id}
                    className="singleLine button closedObject"
                    onClick={() => {
                        history.push(`/durango/app/${Kafic.id}`);
                    }}
                >
                    <img className="listLogo" src={getSrc(Kafic.logo.split('.')[0])} />
                    <h1 className="linetitle">{getTrimmedTitle(Kafic.title, 10)}</h1>
                    <p className="lineFreeSeats boldText greyText">
                        {Kafic.brojSlobodnihMesta}
                    </p>
                    <i
                        className="material-icons peopleIcon"
                        style={{
                            color: 'gray'
                        }}
                    >
                        people
                    </i>
                    {
                        Kafic.favorit && <FavoritBadge />
                    }
                    <LabelBadge />
                </div>
            })
        }
    </Fragment>
}

const ListAndSearch = ({ history }) => {
    return (
        <Fragment>
            <div className="mainHeader">
                <img src={Logo} className="logoHeader" />
                <Search />
            </div>
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

const LoaderComponent = () => {
    const { loading } = useContext(DataContext);

    return <Loader
        type="Grid"
        color="#3185FC"
        height={100}
        width={100}
        visible={loading}
    />
}

const Home = props => {
    return (
        <div className="App">
            <MainScreen history={props.history} />
        </div>
    );
};

export default Home;