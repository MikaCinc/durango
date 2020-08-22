import React, {
    useEffect,
    useContext,
    useState
} from 'react';

import openSocket from 'socket.io-client';

/* Packages & libraries */
import { getApiUrl, getSocketUrl } from '../library/common';
import moment from 'moment';

/* LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

/* Components */
import ErrorModal from '../Components/ErrorModal';
import SuccessModal from '../Components/SuccessModal';
import ObjectManuallyOpenCloseModal from '../Components/ObjectManuallyOpenCloseModal';
import NotUpdatedRecentlyModal from '../Components/NotUpdatedRecentlyModal';


let ObjectContext;
let interval;

const { Provider, Consumer } = ObjectContext = React.createContext({});

const ObjectProvider = (props) => {
    // One object
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(localStorage.getItem('durangoEmail'));
    const [authorized, setAuthorized] = useState(false);
    // Modals
    const [ErrorModalMessage, setErrorModalMessage] = useState('');
    const [SuccessModalMessage, setSuccessModalMessage] = useState('');
    const [showObjectManuallyOpenCloseModal, setShowObjectManuallyOpenCloseModal] = useState(false);
    const [notUpdatedRecently, setNotUpdatedRecently] = useState(false);

    useEffect(() => {
        const socket = openSocket(getSocketUrl());
        const onChange = ({ id, freeSpots, spotsUpdatedAt }) => {
            return setData((current) => {
                if (current.id === id && current.freeSpots !== freeSpots) {
                    return {
                        ...current,
                        freeSpots,
                        spotsUpdatedAt
                    };
                }
                return current;
            });
        }
        socket.on('freeSpotsChanged', onChange);

        const onChangeVolume = ({ id, volume }) => {
            return setData((current) => {
                if (current.id === id && current.details.volume !== volume) {
                    return {
                        ...current,
                        details: {
                            ...current.details,
                            volume
                        }
                    };
                }
                return current;
            });
        }
        socket.on('volumeChanged', onChangeVolume);

        const onChangeClosed = ({ id, isManualyClosed }) => {
            return setData((current) => {
                if (current.id === id) {
                    return {
                        ...current,
                        isManualyClosed
                    }
                }
                return current;
            });
        }
        socket.on('isManualyClosedChanged', onChangeClosed);

        document.title = 'Durango IP';

        let accessToken = localStorage.getItem('durangoAccessToken');
        let refreshToken = localStorage.getItem('durangoRefreshToken');

        if (!accessToken || !refreshToken) {
            return props.history.push('/inputPanel/login');
        };

        checkIfAuthorized();

        startRefreshInterval();

        return () => {
            clearInterval(interval);
        }
    }, []);

    const startRefreshInterval = () => {
        interval = setInterval(() => {
            refreshTokenFunction();
        }, 60 * 10 * 1000);
    }

    const checkIfAuthorized = () => {
        let accessToken = localStorage.getItem('durangoAccessToken');
        let refreshToken = localStorage.getItem('durangoRefreshToken');

        if (!accessToken || !refreshToken) {
            props.history.push('/inputPanel/login');
            return;
        }

        fetch(getApiUrl() + '/places/me', {
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
                refreshTokenFunction(checkIfAuthorized);
                return;
            }

            setData(response.data);

            setAuthorized(true);
            setLoading(false);

            props.history.push('/inputPanel/' + response.data.id);
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    }

    const refreshTokenFunction = (callback) => {
        fetch(getApiUrl() + '/places/refreshtoken', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('durangoAccessToken'),
            }),
            body: JSON.stringify({ refreshToken: localStorage.getItem('durangoRefreshToken') })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if (response.error) {
                clearInterval(interval);
                localStorage.removeItem('durangoAccessToken');
                localStorage.removeItem('durangoRefreshToken');
                props.history.push('/inputPanel/login');
                return;
            }

            localStorage.setItem('durangoAccessToken', response.data.token.accessToken);
            localStorage.setItem('durangoRefreshToken', response.data.token.refreshToken);

            if (callback) {
                callback();
            };
        }).catch(({ message }) => {
            setErrorModalMessage(message);
            // @todo should this be enabled here?
            // clearInterval(interval);
            // localStorage.removeItem('durangoAccessToken');
            // localStorage.removeItem('durangoRefreshToken');
            // props.history.push('/inputPanel/login');
            return;
        });
    }

    return (
        <Provider
            value={{
                loading,
                setLoading,
                setAuthorized,
                setErrorModalMessage,
                setSuccessModalMessage,
                setData,
                data,
                email,
                setEmail,
                startRefreshInterval,
                refreshTokenFunction,
                authorized,
                setShowObjectManuallyOpenCloseModal,
                setNotUpdatedRecently
            }}
        >
            {props.children}
            <LoaderComponent />
            {
                data && data.id && <ObjectManuallyOpenCloseModal
                    show={showObjectManuallyOpenCloseModal}
                    onHide={() => { setShowObjectManuallyOpenCloseModal(false); }}
                    history={props.history}
                />
            }
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
            <NotUpdatedRecentlyModal
                show={notUpdatedRecently}
                onHide={() => { setNotUpdatedRecently(false); }}
            />
        </Provider>
    )
}

const ObjectConsumer = (props) => {
    return (
        <Consumer>
            {context => {
                if (!context) {
                    throw new Error('Using ObjectConsumer outside of ObjectProvider');
                }

                return props.children(context);
            }}
        </Consumer>
    )
}

const LoaderComponent = () => {
    const { loading } = useContext(ObjectContext);

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
    ObjectProvider,
    ObjectConsumer
};

export default ObjectContext;