/* React */
import React, { useState, useEffect, Fragment } from 'react';
/* Data */
import mockData from '../data/kafici';
// import Logo from './Logo.png';
import Logo2 from '../ExtendedLogo/Logo2.png';
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
    const [authorized, setAuthorized] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [filtered, setFiltered] = useState([...data]);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
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
            }, 1500)
        }

    }, [authorized]);

/*     useEffect(() => {
        console.log(window.location.href)
    }, [window.location.href]) */

    useEffect(() => {
        let query = queryString.parse(window.location.search);

        if (query.view) {
            setSelected(parseInt(query.view, 10));
        };
    }, []);

    useEffect(() => {
        if (selected) {
            window.history.pushState({}, '', window.location.pathname + "?" + queryString.stringify({ 'view': selected }));
        } else {
            window.history.pushState({}, '', window.location.pathname);
        }
    }, [selected]);

    useEffect(() => {
        setFiltered(filterBySearch());
    }, [search, data]);

    useEffect(() => {
        setNoResults(filtered.length === 0 && data.length);
    }, [filtered]);


    const filterBySearch = (arr = data) => {
        let filtered = arr.filter(({ title }) => {
            return title.trim().toLowerCase().indexOf(search.trim().toLowerCase()) > -1;
        });

        return _.orderBy(filtered, 'brojSlobodnihMesta', 'desc');
    }

    const Search = () => {
        return (
            <div className="search">
                <i className="material-icons" id="searchIcon">
                    search
          </i>
                <input
                    className="searchInput"
                    placeholder="Pretraži..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }} />
            </div>
        )
    }

    const List = () => {
        return noResults
            ? <div className="noResults boldText">
                <h1>
                    Mesto koje tražite nije pronađeno
          </h1>
                <i
                    className="material-icons noResultsIcon"
                >
                    sentiment_very_dissatisfied
        </i>
            </div>
            : filtered.map((Kafic) => {
                return <div
                    key={Kafic.id}
                    className="singleLine button"
                    onClick={() => {
                        setSelected(Kafic.id)
                    }}
                >
                    <img className="listLogo" src={'./slike/' + Kafic.logo} />
                    <h1 className="linetitle boldText">{Kafic.title}</h1>
                    <p className="lineFreeSeats boldText greyText">
                        {Kafic.brojSlobodnihMesta} / {Kafic.brojMesta}
                    </p>
                    <i
                        className="material-icons peopleIcon"
                        style={{
                            color: Kafic.brojSlobodnihMesta > 0 ? '#3185FC' : '#9A031E',
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
                    <img src={Logo2} className="logoHeader" />
                    {
                        Search()
                    }
                </div>
                {
                    List()
                }
            </Fragment>
        )
    }

    const mainScreen = () => {
        return (
            <Slide
                when={!selected}
                collapse
                left
                duration={300}
            >
                <div className="list">
                    {
                        !selected && ListAndSearch()
                    }
                </div>
            </Slide>
        )
    }

    const detailsScreen = () => {
        return (
            <Slide
                when={selected}
                collapse
                right
                delay={10}
                duration={300}
            >
                <div className='details'>
                    {
                        selected && <Details data={_.find(data, { 'id': selected }) || placeholderObj} setSelected={setSelected} />
                    }
                </div>
            </Slide>
        )
    }

    const loginScreen = () => {
        return (
            <LoginScreen
                authorized={authorized}
                setAuthorized={setAuthorized}
            />
        )
    }

    return (
        <div className="App">
            {
                authorized && <Fragment>
                    {
                        mainScreen()
                    }
                    {

                        detailsScreen()
                    }
                </Fragment>
            }
            {
                !authorized && <Fragment>
                    {
                        loginScreen()
                    }
                </Fragment>
            }
            <div className="loader">
                <Loader
                    type="Grid"
                    color="#3261D5"
                    height={100}
                    width={100}
                    visible={data.length === 0 && authorized}
                />
            </div>
        </div>
    );
};

export default Home;