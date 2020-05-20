import React, {
    useEffect,
    useContext,
    useState
} from 'react';

/* Data */
import kafici from '../data/kafici';
import UserMock from '../data/user';

/* Components */
import ComingSoonModal from '../Components/ComingSoonModal';

/* Packages & libraries */
import _ from 'lodash';
import { isOpen } from '../library/common';

/* Router */
import { useParams } from "react-router-dom";

/* LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import moment from 'moment';


let DataContext;

const { Provider, Consumer } = DataContext = React.createContext({});

const DataProvider = (props) => {
    // let { id } = useParams();
    // User
    const [User, setUser] = useState(
        {
            ...JSON.parse(localStorage.getItem('User'))
        }
    );
    // Original data
    const [Data, setData] = useState([]);
    // Filtered
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([]);
    // Sorted
    const [sortedOpen, setSortedOpen] = useState([]);
    const [sortedClosed, setSortedClosed] = useState([]);
    // Current page/data
    const [currentData, setCurrentData] = useState({});
    // Coming soon modal
    const [showComingSoonModal, setShowComingSoonModal] = useState(false);
    // Timer za rezervaciju
    const [timer, setTimer] = useState(null);

    const [loading, setLoading] = useState(true);
    // const [authorized, setAuthorized] = useState(false);

    /* const updateFromServer = () => {
        return fetch("/update/all")
            .then(({ data }) => {
                setLoading(false)
                return setData([...data]);
            })
            .catch(({ message }) => {
                return toast.error(message);
            });
    } */

    const updateWithMockData = () => {
        let authorized = isAuthorized(),
            timeout;

        if (authorized && User && User.ID) {
            fetch('http://durango.devffwd.nl:3000/api/places')
                .then(response => response.json())
                .then(response => {
                    const { data } = response;
                    console.log(data)
                    if (!data || !data.length) {
                        console.log('nešto ga nema data');
                        setData(kafici);
                    } else {
                        //Doing this just to show loader for a little bit :)
                        // setTimeout(() => {
                        //     setData(data);
                        // }, 1500)
                        setData(data);
                        setLoading(false);
                    }
                }).catch(({ message }) => {
                    // Za sada ako bude greška postavi mockData
                    setData(kafici);
                    console.log('error', message);
                });
        } else {
            props.history.push('/durango/app-login');
        };


        /* if (authorized && User && User.ID) {
            timeout = setTimeout(() => {
                setData(kafici);
                setLoading(false);
            }, 1200)
        } else {
            props.history.push('/durango/app-login');
        } */

        return () => {
            clearTimeout(timeout);
        }
    }

    useEffect(() => {
        updateWithMockData();
    }, []);

    useEffect(() => {
        // updateFromServer();
        // updateWithMockData(); OVO NE DIRAJ
        /* Experiment @todo */

        if (!User) {
            return;
        }

        function compareKeys(a, b) {
            var aKeys = Object.keys(a).sort();
            var bKeys = Object.keys(b).sort();
            return JSON.stringify(aKeys) === JSON.stringify(bKeys);
        }

        if (!compareKeys(User, UserMock)) {
            // localStorage.removeItem('User');
            setUser({
                ...UserMock,
                ...User
            })
            return;
        }

        localStorage.setItem('User', JSON.stringify(User));
    }, [User]);

    useEffect(() => {
        filterBySearch(search);

        if (filters.indexOf('omiljeni') !== -1) {
            filterByOmiljeni();
        }

    }, [search, Data, filters]);

    useEffect(() => {
        let day = moment().isoWeekday() - 1;
        setSortedOpen(
            [
                ...filteredData.filter(
                    item => isOpen(item.details.workingHours[day])
                )
            ]
        );
        setSortedClosed(
            [
                ...filteredData.filter(
                    item => !isOpen(item.details.workingHours[day])
                )
            ]
        );
    }, [filteredData]);

    useEffect(() => {
        let int = null;

        int = setInterval(() => {
            setData(simulateUpdateData());
        }, 900)

        return () => {
            clearInterval(int);
        }
    }, [Data]);

    useEffect(() => {
        let int;

        if (timer === 900) {
            int = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(int);
        }

        // console.log(timer)

        return () => {
            clearInterval(int);
        }
    }, [timer]);

    const simulateUpdateData = () => {
        let IDs = _.map(Data, 'id'),
            randomIDs = _.slice(_.shuffle(IDs), 0, 5),
            day = moment().isoWeekday() - 1;;

        return [...Data].map(item => {
            if (_.includes(randomIDs, item.id) && isOpen(item.details.workingHours[day])) {
                return {
                    ...item,
                    freeSpots: getNewNumber(item.freeSpots),
                    spotsUpdatedAt: moment().valueOf(),
                    details: {
                        ...item.details,
                        volume: _.random(1, 3)
                    }
                }
            }

            return {
                ...item
            }
        })
    }

    const getNewNumber = (old) => {
        let bulk = Math.floor(Math.random() * 4);
        return Math.floor(Math.random() * 10) > 5 || old < 3
            ? old > 10
                ? old - bulk
                : old + bulk
            : old - bulk;
    }

    const isAuthorized = () => {
        let User = JSON.parse(localStorage.getItem('User'));

        if (User && User.ID) {
            return true;
        }

        return false;
    }

    const filterBySearch = (search = '') => {
        let filtered = Data.filter(({ title }) => {
            return title.trim().toLowerCase().indexOf(search.trim().toLowerCase()) > -1;
        });

        setFilteredData(_.orderBy(filtered, 'freeSpots', 'desc'));
    };

    const filterByOmiljeni = () => {
        let filtered = Data.filter(({ id }) => User.Favourites.indexOf(id) !== -1);

        setFilteredData(_.orderBy(filtered, 'freeSpots', 'desc'));
    };

    const toggleFavourite = (fav) => {
        let nextState = { ...User };

        if (nextState.Favourites.indexOf(fav) === -1) {
            nextState = {
                ...User,
                Favourites: [
                    ...nextState.Favourites,
                    fav
                ]
            }
        } else {
            nextState.Favourites = nextState.Favourites.filter(f => f !== fav);
        }

        return setUser(nextState);
    }

    const fastReserve = (ID, Time) => {
        let nextState = { ...User };

        // console.log(ID, Time);

        if (nextState.Reservation.ID) {
            //@todo provera
        }

        nextState = {
            ...User,
            Reservation: {
                ID,
                Time
            }
        }

        // setTimer(900);

        return setUser(nextState);
    }

    const changeData = ({ id, ...restOfData }) => {
        let nextState = [...Data];

        if (!!_.find(Data, { id })) {
            nextState = Data.map((item) => {
                if (item.id === id) {
                    return { id, ...restOfData };
                }

                return item;
            });
        } else {
            nextState = [{ id, ...restOfData }, ...nextState];
        }

        return setData(nextState);
    }

    const changeClaps = ({ ID, userAplauza }) => {
        let nextState = {
            ...User,
            Claps: [
                ...User.Claps,
                {
                    ID,
                    userAplauza
                }
            ]
        }

        return setUser(nextState);
    }

    const changeSearch = (value) => {
        setSearch(value);
    }

    const toggleFilters = (value) => {
        let nextFilters = [...filters];

        if (nextFilters.indexOf(value) === -1) {
            nextFilters.push(value);
        } else {
            nextFilters = nextFilters.filter(f => f !== value);
        }

        return setFilters(nextFilters);
    }

    return (
        <Provider
            value={{
                User,
                changeClaps,
                toggleFavourite,
                Data,
                filteredData,
                sortedOpen,
                sortedClosed,
                search,
                changeSearch,
                changeData,
                loading,
                filterBySearch,
                filters,
                toggleFilters,
                currentData,
                setCurrentData,
                fastReserve,
                // setTimer,
                timer,
                setShowComingSoonModal
            }}
        >
            {props.children}
            <LoaderComponent />
            <ComingSoonModal show={showComingSoonModal} onHide={() => { setShowComingSoonModal(false); }} />
        </Provider>
    )
}

const DataConsumer = (props) => {
    return (
        <Consumer>
            {context => {
                if (!context) {
                    throw new Error('Using DataConsumer outside of DataProvider');
                }

                return props.children(context);
            }}
        </Consumer>
    )
}

const LoaderComponent = () => {
    const { loading } = useContext(DataContext);

    return <div className="loader">
        <Loader
            type="Grid"
            color="#3185FC"
            height={100}
            width={100}
            visible={loading}
        />
    </div>
}

export {
    DataProvider,
    DataConsumer
};

export default DataContext;