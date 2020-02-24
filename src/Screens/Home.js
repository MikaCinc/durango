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
import Slide from 'react-reveal/Slide';
/* LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

/* Images */
import vinyl from '../slike/vinyl.png';
import Square from '../slike/Square.jpg';
import dnevnaSoba from '../slike/dnevnaSoba.jpg';

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
        default: {
            return Square;
        }
    }
}

const List = ({ history }) => {
    const { filteredData, noResults } = useContext(DataContext);

    if (!(Array.isArray(filteredData) && filteredData.length)) {
        return null;
    }

    if (noResults) {
        return (
            <div className="noResults boldText">
                <h1>
                    Mesto koje tražite nije pronađeno
                </h1>
                <img className="noResultsIcon" src={noResultsIcon} />
            </div>
        )
    }

    return filteredData.map((Kafic) => {
        return <div
            key={Kafic.id}
            className="singleLine button"
            onClick={() => {
                history.push(`/durango/app/${Kafic.id}`);
            }}
        >
            <img className="listLogo" src={getSrc(Kafic.logo.split('.')[0])} />
            <h1 className="linetitle boldText">{Kafic.title}</h1>
            <p className="lineFreeSeats boldText greyText">
                {Kafic.brojSlobodnihMesta}
            </p>
            <i
                className="material-icons peopleIcon"
                style={{
                    color: Kafic.brojSlobodnihMesta > 0 ? '#3185FC' : '#C50505',
                }}
            >
                people
          </i>
        </div>
    })
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
            <Fragment>
                <MainScreen history={props.history} />
            </Fragment>
            <div className="loader">
                <LoaderComponent />
            </div>
        </div>
    );
};

export default Home;