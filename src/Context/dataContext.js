import React, {
    useEffect,
    useContext,
    useState
} from 'react';
import kafici from '../data/kafici';

/* Packages & libraries */
import _ from 'lodash';
import { isOpen } from '../library/common';

/* Router */
import { useParams } from "react-router-dom";

/* LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';


let DataContext;

const { Provider, Consumer } = DataContext = React.createContext({});

const DataProvider = (props) => {
    let { id } = useParams();
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
        let User = JSON.parse(localStorage.getItem('User')),
            authorized = false,
            timeout;

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


        if (authorized) {
            timeout = setTimeout(() => {
                console.log('loaded')
                setData(kafici);
                setLoading(false);
            }, 1200)
        } else {
            props.history.push('/durango/app-login');
        }

        return () => {
            clearTimeout(timeout);
        }
    }

    useEffect(() => {
        // updateFromServer();
        updateWithMockData();
    }, []);

    useEffect(() => {
        filterBySearch(search);
        
        if (filters.indexOf('omiljeni') !== -1) {
            filterByOmiljeni();
        }

    }, [search, Data, filters]);

    useEffect(() => {
        setSortedOpen([...filteredData.filter(item => isOpen(item.details.radnoVreme))]);
        setSortedClosed([...filteredData.filter(item => !isOpen(item.details.radnoVreme))]);
    }, [filteredData]);

    useEffect(() => {
        let int = null;

        int = setInterval(() => {
            setData(simulateUpdateData())
            // console.log(simulateUpdateData())
        }, 600)

        return () => {
            clearInterval(int);
        }
    }, [Data]);

    const simulateUpdateData = () => {
        let IDs = _.map(Data, 'id'),
            randomIDs = _.slice(_.shuffle(IDs), _.random(4));

        return [...Data].map(item => {
            if (_.includes(randomIDs, item.id) && isOpen(item.details.radnoVreme)) {
                return {
                    ...item,
                    brojSlobodnihMesta: getNewNumber(item.brojSlobodnihMesta)
                }
            }

            return {
                ...item
            }
        })
    }

    const getNewNumber = (old) => {
        let bulk = Math.floor(Math.random() * 4);
        return Math.floor(Math.random() * 10) > 5 || old < 3 ? old + bulk : old - bulk;
    }

    const isAuthorized = () => {
        let User = JSON.parse(localStorage.getItem('User'));

        if (User && User.id) {
            return true;
        }

        return false;
    }

    const filterBySearch = (search = '') => {
        let filtered = Data.filter(({ title }) => {
            return title.trim().toLowerCase().indexOf(search.trim().toLowerCase()) > -1;
        });

        setFilteredData(_.orderBy(filtered, 'brojSlobodnihMesta', 'desc'));
    };

    const filterByOmiljeni = () => {
        let filtered = Data.filter(({ favorit }) => favorit);

        setFilteredData(_.orderBy(filtered, 'brojSlobodnihMesta', 'desc'));
    };

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
                Data,
                filteredData,
                sortedOpen,
                sortedClosed,
                search,
                changeSearch,
                changeData,
                loading,
                filterBySearch,
                toggleFilters,
                currentData,
                setCurrentData
            }}
        >
            {props.children}
            <LoaderComponent />
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