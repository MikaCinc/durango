import React, {
    useEffect,
    useContext,
    useState,
    Fragment
} from 'react';

/* Libraries */
import _ from 'lodash';
import { getApiUrl } from '../library/common';

/* Components */
import IPHeader from '../Components/IPHeader';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

/* Router */
import {
    useParams,
    Route,
    Switch,
} from "react-router-dom";

/* Pages / Screens */
import Restaurant from '../Screens/Object/index';
import ObjectSettings from '../Screens/Object/ObjectSettings';

/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

/* Animations */
import Zoom from 'react-reveal/Zoom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

/* Context */
import ObjectContext from '../Context/objectContext';

const routes = [
    { path: '/inputPanel/:id', Component: Restaurant },
    { path: '/inputPanel/:id/settings', Component: ObjectSettings },
]

const InputPanelStackOfScreens = (props) => {
    let { id } = useParams();

    const { data, setData, setShowObjectManuallyOpenCloseModal, refreshTokenFunction, setErrorModalMessage } = useContext(ObjectContext);
    const [volume, setVolume] = useState();

    useEffect(() => {
        if (!id || !data || !data.id) {
            return;
        }

        setVolume(data.details.volume);
    }, [data]);

    useEffect(() => {
        if (!data || !data.id) {
            return;
        };

        if (volume === data.details.volume) {
            return;
        }

        postNewVolume();
    }, [volume]);

    const postNewVolume = () => {
        let accessToken = localStorage.getItem('durangoAccessToken');
        if (!accessToken) {
            props.history.push('/inputPanel/login');
        }

        const obj = {
            details: {
                volume
            }
        };

        fetch(getApiUrl() + '/places/' + data.id, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify({ ...obj })
        }).then(response => {
            return response.json();
        }).then(({ data, error, message }) => {
            if (error && data.tokenExpired) {
                refreshTokenFunction(postNewVolume);
                return;
            }

            if (error) {
                setErrorModalMessage(message);
                return;
            }
            setData({
                ...data
            });
        }).catch(({ message }) => {
            console.log('error', message);
            setErrorModalMessage(message);
        });
    }

    const renderOpenCloseButton = () => {
        let label = data.isManualyClosed
            ? 'Otvori'
            : 'Zatvori';
        let tooltip = data.isManualyClosed
            ? 'Otvorite kafić da bi korisnici mogli da vide broj slobodnih mesta'
            : 'Koristiti ovo dugme samo u slučaju vanrednog prestanka rada kafića(npr. renoviranje).';
        let className = data.isManualyClosed
            ? 'IP-Settings-Open-Object'
            : 'IP-Settings-Close-Object';

        return (
            <Zoom left>
                <div className="IP-zatvoriOtvoriContainer">
                    <OverlayTrigger
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                {tooltip}
                            </Tooltip>
                        }
                    >
                        <button
                            className={className}
                            onClick={() => setShowObjectManuallyOpenCloseModal(true)}
                        >
                            {label}
                        </button>
                    </OverlayTrigger>
                </div>
            </Zoom >
        )
    }

    const getVolumeTooltip = (level) => {
        switch (level) {
            case 'Tiho': {
                return 'U objektu je tiha muzika, pogodna za razgovore i sastanke.';
            };
            case 'Umereno': {
                return 'U objektu je umereno glasna muzika, pogodna za ćaskanje sa društvom';
            };
            case 'Glasno': {
                return 'U objektu je glasna muzika, pogodnija za žurke i svirke.';
            };
            default: {
                return '';
            }
        }
    }

    const renderFixedButtons = () => {
        if (!data || !data.id) return null;

        const { location: { pathname } } = props.history;

        let splitted = pathname.split('/');

        if (['settings'].indexOf(splitted[splitted.length - 1]) !== -1) {
            return null;
        }

        return (
            <Fragment>
                {renderOpenCloseButton()}
                <Zoom bottom>
                    <div className="IP-volumeContainer">
                        {
                            ['Tiho', 'Umereno', 'Glasno'].map((level, i) => {
                                return (
                                    <OverlayTrigger
                                        key={level}
                                        placement={'top'}
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                {getVolumeTooltip(level)}
                                            </Tooltip>
                                        }
                                    >
                                        <button
                                            key={level}
                                            className={`IP-volume-level ${volume === i + 1 ? 'IP-volume-active' : ''}`}
                                            onClick={() => {
                                                setVolume(i + 1);
                                            }}
                                        >
                                            {level}
                                        </button>
                                    </OverlayTrigger>
                                )
                            })
                        }
                    </div>
                </Zoom>
            </Fragment>
        )
    }

    const restOfPage = () => {
        return (
            <Fragment>
                {
                    <IPHeader history={props.history} dataFromStack={data} />
                }
                <div className="container">
                    <TransitionGroup>
                        <CSSTransition
                            in={true}
                            timeout={300}
                            classNames="page"
                            unmountOnExit
                            key={props.history.location.key} // Bez ovoga neće!
                        >
                            <Switch location={props.history.location}>
                                {
                                    routes.map(({ path, Component }) => (
                                        <Route
                                            key={path}
                                            exact
                                            path={path}
                                            render={
                                                ({ match }) => (
                                                    <div className="page">
                                                        <Component match={match} history={props.history} />
                                                        {
                                                            renderFixedButtons()
                                                        }
                                                    </div>
                                                )
                                            }
                                        />
                                    ))
                                }
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            {
                data && data.id && restOfPage()
            }
        </Fragment>
    )
}

export default InputPanelStackOfScreens;