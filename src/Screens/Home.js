/* React */
import React, { useState, useEffect, Fragment } from 'react';
/* Data */
import mockData from '../data/kafici';
import Logo from '../ExtendedLogo/Logo.png';
import noResultsIcon from '../CustomIcons/noResults.png';
/* Libraries */
import _ from 'lodash';
import queryString from 'query-string';
/* Pages */
import Details from './Details';
import LoginScreen from './LoginScreen';
/* Animations */
import Slide from 'react-reveal/Slide';
// import Zoom from 'react-reveal/Zoom';
/* LOGIN */
/* LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

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

const Home = props => {
    const [data, setData] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [filtered, setFiltered] = useState([...data]);
    const [loaded, setLoaded] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        let User = JSON.parse(localStorage.getItem('User')),
            authorized = false;

        if (User && User.id) {
            authorized = true;
        }

        /* if (authorized) {
          fetch('http://178.17.17.197:7000/lista-kafica')
            .then(response => response.json())
            .then(data => {
              console.log(data)
              if (!data || !data.length) {
                setData(mockData);
              } else {
                //Doing this just to show loader for a little bit :)
                setTimeout(() => {
                  setData(data);
                }, 1500)
              }
            }).catch(() => {
              console.log('error')
              setData(mockData);
            });
        } */

        // setData(mockData);


        if (authorized) {
            setTimeout(() => {
                setData(mockData);
                setLoaded(true);
            }, 1200)
        } else {
            props.history.push('/login');
        }

    }, []);

    useEffect(() => {
        setFiltered(filterBySearch());
    }, [search, data]);

    useEffect(() => {
        setNoResults(filtered.length === 0 && data.length);
    }, [filtered]);

    /* useEffect(() => {
        let int = null;
        clearInterval(int);
        int = setInterval(() => {
            setData(simulateUpdateData())
        }, 1000)
    }, []); */

    /* const simulateUpdateData = () => {
        return [...data].map(item => {
            return {
                ...item,
                brojSlobodnihMesta: getNewNumber(item.brojSlobodnihMesta)
            }
        })
    } */

    /* const getNewNumber = (old) => {
        return Math.floor(Math.random() * 10) > 5 ? old + 1 : old - 1;
    } */

    const isAuthorized = () => {
        let User = JSON.parse(localStorage.getItem('User'));

        if (User && User.id) {
            return true;
        }

        return false;
    }

    const filterBySearch = (arr = data) => {
        let filtered = arr.filter(({ title }) => {
            return title.trim().toLowerCase().indexOf(search.trim().toLowerCase()) > -1;
        });

        return _.orderBy(filtered, 'brojSlobodnihMesta', 'desc');
    }

    const Search = () => {
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

    const List = () => {
        return noResults
            ? <div className="noResults boldText">
                <h1>
                    Mesto koje tražite nije pronađeno
                </h1>
                {/* <i
                    className="material-icons noResultsIcon"
                >
                    sentiment_very_dissatisfied
        </i> */}
                <img className="noResultsIcon" src={noResultsIcon} />
            </div>
            : filtered.map((Kafic) => {
                return <div
                    key={Kafic.id}
                    className="singleLine button"
                    onClick={() => {
                        props.history.push(`/${Kafic.id}`);
                    }}
                >
                    <img className="listLogo" src={'./slike/' + Kafic.logo} />
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

    const ListAndSearch = () => {
        return (
            <Fragment>
                <div className="mainHeader">
                    <img src={Logo} className="logoHeader" />
                    {
                        Search()
                    }
                </div>
                <div className="listHolder">
                    {
                        List()
                    }
                </div>
            </Fragment>
        )
    }

    const mainScreen = () => {
        return (
            <div className="list">
                {
                    ListAndSearch()
                }
            </div>
        )
    }

    return (
        <div className="App">
            <Fragment>
                {
                    mainScreen()
                }
            </Fragment>
            <div className="loader">
                <Loader
                    type="Grid"
                    color="#3185FC"
                    height={100}
                    width={100}
                    visible={data.length === 0 && !loaded}
                />
            </div>
        </div>
    );
};

export default Home;