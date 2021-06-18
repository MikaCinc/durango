import React, {
    useEffect,
    useContext,
    useState
} from 'react';

/* Data */
import kafici from '../data/kafici';
import UserMock from '../data/user';

import openSocket from 'socket.io-client';

/* Components */
import ComingSoonModal from '../Components/ComingSoonModal';
import ErrorModal from '../Components/ErrorModal';
import SuccessModal from '../Components/SuccessModal';
import LoginModal from '../Components/LoginModal';
import FeedbackModal from '../Components/FeedbackModal';

/* Packages & libraries */
import _, { filter } from 'lodash';
import { isOpen, getApiUrl, getSocketUrl } from '../library/common';

/* Router */
import { useParams } from "react-router-dom";

/* LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import moment from 'moment';

let DataContext;
let refreshInterval;

const { Provider, Consumer } = DataContext = React.createContext({});

const DataProvider = (props) => {
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
    const [sortBy, setSortBy] = useState('spotsUpdatedAt');
    const [sortedOpen, setSortedOpen] = useState([]);
    const [sortedClosed, setSortedClosed] = useState([]);
    // Additional settings
    const [info, setInfo] = useState('');
    // Modals
    const [showComingSoonModal, setShowComingSoonModal] = useState(false);
    const [ErrorModalMessage, setErrorModalMessage] = useState('');
    const [SuccessModalMessage, setSuccessModalMessage] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    // Timer za rezervaciju
    const [timer, setTimer] = useState(null);

    const [loading, setLoading] = useState(true);

    const updateFromServer = () => {
        let authorized = isAuthorized(),
            timeout;

        fetch(getApiUrl() + '/places', { mode: 'cors' })
            .then(response => response.json())
            .then(response => {
                const { data, message } = response;
                if (!data || !data.length) {
                    setLoading(false);
                    setErrorModalMessage(message);
                    // setData(kafici);
                } else {
                    setData(data);
                    setLoading(false);
                }
            }).catch(({ message }) => {
                setData(kafici); // @edited
                setLoading(false);
                setErrorModalMessage('Greška na serveru, pokušajte ponovo malo kasnije...')
                console.error(message);
            });

        return () => {
            clearTimeout(timeout);
        }
    }

    useEffect(() => {
        // updateFromServer(); @edited
        setData(kafici);
        setLoading(false);

        document.title = 'Durango - Insider Preview';

        // const socket = openSocket(getSocketUrl());
        // const onChange = ({ id, ...rest }) => {
        //     return setData((current) => current.map((item) => {
        //         if (item.id === id) {
        //             return {
        //                 ...item,
        //                 ...rest
        //             }
        //         }
        //         return item;
        //     }))
        // }
        // socket.on('freeSpotsChanged', onChange);

        // const onChangeVolume = ({ id, volume }) => {
        //     return setData((current) => current.map((item) => {
        //         if (item.id === id) {
        //             return {
        //                 ...item,
        //                 details: {
        //                     ...item.details,
        //                     volume
        //                 }
        //             }
        //         }
        //         return item;
        //     }))
        // }
        // socket.on('volumeChanged', onChangeVolume);

        // const onChangeTotalClaps = (data) => {
        //     console.log(data)
        //     return setData((current) => current.map((item) => {
        //         if (item.id === data.id) {
        //             return {
        //                 ...item,
        //                 details: {
        //                     ...item.details,
        //                     totalClaps: data.totalClaps,
        //                     numberOfGrades: data.numberOfGrades
        //                 }
        //             }
        //         }
        //         return item;
        //     }))
        // }
        // socket.on('totalClapsChanged', onChangeTotalClaps);

        // const onChangeClosed = ({ id, isManualyClosed }) => {
        //     return setData((current) => current.map((item) => {
        //         if (item.id === id) {
        //             return {
        //                 ...item,
        //                 isManualyClosed
        //             }
        //         }
        //         return item;
        //     }))
        // }
        // socket.on('isManualyClosedChanged', onChangeClosed);

        /* let accessToken = localStorage.getItem('userAccessToken');
        let refreshToken = localStorage.getItem('userRefreshToken');

        if (!accessToken || !refreshToken) {
            localStorage.removeItem('User');
            return;
        }; */

        // checkUser();
        // startRefreshInterval(); @edited

        return () => {
            clearInterval(refreshInterval);
        }
    }, []);

    useEffect(() => {
        let LSsA = localStorage.getItem('info');
        if(!LSsA) {
            return;
        }

        setInfo(LSsA);
    }, []);

    useEffect(() => {
        let localInitUser = localStorage.getItem('user');
        if(!localInitUser || !localInitUser.id) {
            setUser(UserMock);
            // localStorage.setItem('user')
            return;
        }

        setUser(localInitUser);
    }, []);

    useEffect(() => {
        localStorage.setItem('info', info);
    }, [info]);

    const startRefreshInterval = () => {
        refreshInterval = setInterval(() => {
            refreshTokenFunction();
        }, 60 * 10 * 1000);
    }

    const refreshTokenFunction = (callback) => {
        fetch(getApiUrl() + '/users/refreshtoken', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userAccessToken'),
            }),
            body: JSON.stringify({ refreshToken: localStorage.getItem('userRefreshToken') })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if (response.error) {
                clearInterval(refreshInterval);
                localStorage.removeItem('User');
                localStorage.removeItem('userAccessToken')
                localStorage.removeItem('userRefreshToken')
                setUser({});
                return;
            }

            localStorage.setItem('userAccessToken', response.data.token.accessToken);
            localStorage.setItem('userRefreshToken', response.data.token.refreshToken);

            if (callback) {
                callback();
            };
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    }

    const checkUser = () => {
        let accessToken = localStorage.getItem('userAccessToken');
        let refreshToken = localStorage.getItem('userRefreshToken');

        if (!User || !User.id || !accessToken) {
            // localStorage.removeItem('User');
            return;
        }

        fetch(getApiUrl() + '/users/me', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }),
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if (response.error) {
                refreshTokenFunction(checkUser);
                return;
            }
            let finalizedUserObject = {
                ...User,
                ...response.data
            };

            setUser(finalizedUserObject);
            localStorage.setItem('User', JSON.stringify(finalizedUserObject));
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    }

    const editUserOnServer = () => {
        let accessToken = localStorage.getItem('userAccessToken');
        let refreshToken = localStorage.getItem('userRefreshToken');

        fetch(getApiUrl() + '/users/' + User.id, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }),
            body: JSON.stringify({
                favourites: User.favourites,
                claps: User.claps
            })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);

            if (response.error) {
                refreshTokenFunction(editUserOnServer);
                return;
            }

            setUser({
                ...User,
                ...response.data
            });

            localStorage.setItem('User', JSON.stringify({
                ...User,
                ...response.data
            }));

        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    }

    useEffect(() => {
        console.log(User)
        if (!User || !User.id) {
            // localStorage.removeItem('User');
            return;
        }
        // Samo ako je deepcompare za user i localstorage user različit
        if (_.isEqual(User, { ...JSON.parse(localStorage.getItem('User')) })) {
            return;
        }

        localStorage.setItem("user", User);
        // editUserOnServer(); // @edited
    }, [User]);

    useEffect(() => {
        if (!search) {
            setFilteredData(Data);
        }

        filterBySearch(search);

        if (filters.indexOf('omiljeni') !== -1) {
            filterByOmiljeni();
        }

    }, [search, Data, filters]);

    useEffect(() => {
        let sortingFiltered = _.orderBy(filteredData, sortBy, 'desc');
        setSortedOpen(
            [
                ...sortingFiltered.filter(
                    item => isOpen(item.details.workingHours, item.isManualyClosed)
                )
            ]
        );
        setSortedClosed(
            [
                ...sortingFiltered.filter(
                    item => !isOpen(item.details.workingHours, item.isManualyClosed)
                )
            ]
        );
    }, [filteredData, sortBy]);

    useEffect(() => {
        let int = null;

        int = setInterval(() => {
            // setData(simulateUpdateData());
        }, 1500);

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
            randomIDs = _.slice(_.shuffle(IDs), 0, 1);

        return [...Data].map(item => {
            if (_.includes(randomIDs, item.id) && isOpen(item.details.workingHours, item.isManualyClosed)) {
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
        if (search.length < 2) {
            return;
        };

        let filtered = Data.filter(({ title }) => {
            return title.trim().toLowerCase().indexOf(search.trim().toLowerCase()) > -1;
        });

        setFilteredData(filtered);
    };

    const filterByOmiljeni = () => {
        let filtered = Data.filter(({ id }) => User.favourites.indexOf(id) !== -1);

        setFilteredData(filtered);
    };

    const toggleFavourite = (fav) => {
        let nextState = { ...User };

        if (nextState.favourites.indexOf(fav) === -1) {
            nextState = {
                ...User,
                favourites: [
                    ...nextState.favourites,
                    fav
                ]
            }
        } else {
            nextState.favourites = nextState.favourites.filter(f => f !== fav);
        }

        return setUser(nextState);
    }

    const fastReserve = (id, time) => {
        let nextState = { ...User };

        // console.log(ID, Time);

        if (nextState.reservation.id) {
            //@todo provera
        }

        nextState = {
            ...User,
            reservation: {
                id,
                time
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
                    return {
                        id,
                        ...item,
                        ...restOfData
                    };
                }

                return item;
            });
        } else {
            nextState = [{ id, ...restOfData }, ...nextState];
        }

        return setData(nextState);
    }

    const changeClaps = ({ id, userClaps }) => {
        let nextState = {
            ...User,
            claps: [
                ...User.claps,
                {
                    id,
                    userClaps
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
                setUser,
                startRefreshInterval,
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
                sortBy,
                setSortBy,
                info, 
                setInfo,
                fastReserve,
                // setTimer,
                timer,
                setShowComingSoonModal,
                setErrorModalMessage,
                setSuccessModalMessage,
                setShowLoginModal,
                setShowFeedbackModal
            }}
        >
            {props.children}
            <LoaderComponent />
            <ComingSoonModal
                show={showComingSoonModal}
                onHide={() => { setShowComingSoonModal(false); }}
            />
            <ErrorModal
                show={ErrorModalMessage.length > 0}
                message={ErrorModalMessage}
                onHide={() => { setErrorModalMessage(''); }}
            />
            <SuccessModal
                show={SuccessModalMessage.length > 0}
                message={SuccessModalMessage}
                onHide={() => { setSuccessModalMessage(''); }}
            />
            <LoginModal
                show={showLoginModal}
                onHide={() => { setShowLoginModal(false); }}
                history={props.history}
            />
            <FeedbackModal
                show={showFeedbackModal}
                onHide={() => { setShowFeedbackModal(false); }}
            />
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