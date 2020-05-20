import React, {
    useEffect,
    useContext,
    useState,
    Fragment
} from 'react';

/* Libraries */
import _ from 'lodash';
import moment from 'moment';

/* Components */
import IPHeader from '../Components/IPHeader';
import AbsoluteWrapper from '../Components/AbsoluteWrapper';

/* Router */
import {
    useParams,
    Route,
    Switch,
    __RouterContext
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
import ObjectContext, { ObjectProvider } from '../Context/objectContext';

const routes = [
    { path: '/durango/inputPanel/:id', Component: Restaurant },
    { path: '/durango/inputPanel/:id/settings', Component: ObjectSettings },
]

const InputPanelStackOfScreens = (props) => {
    let { id } = useParams();

    const { Data, loading } = useContext(ObjectContext);
    const [data, setData] = useState();
    const [volume, setVolume] = useState(2);

    useEffect(() => {
        if (!Data || !Data.length) {
            return;
        }
        if (!id) {
            props.history.push('/durango/inputPanel/login');
        }

        let findData = { ..._.find(Data, { 'id': id }) };

        if (!findData.id) {
            props.history.replace(`/durango/inputPanel/login`);
        } else {
            setData(findData);
            props.history.replace(`/durango/inputPanel/${findData.id}`);
        }
    }, [Data]);

    useEffect(() => {
        // Request na server
    }, [volume]);

    const renderFixedButtons = () => {
        if (!data || !data.id) return null;

        const { location: { pathname } } = props.history;

        let splitted = pathname.split('/');

        if (['settings'].indexOf(splitted[splitted.length - 1]) !== -1) {
            return null;
        }

        return (
            <Fragment>
                <div className="IP-zatvoriOtvoriContainer">Zatvori</div>
                <Zoom bottom cascade>
                    <div className="IP-volumeContainer">
                        {
                            ['Tiho', 'Umereno', 'Glasno'].map((level, i) => {
                                return (
                                    <button
                                        key={level}
                                        className={`IP-volume-level ${volume === i + 1 ? 'IP-volume-active' : ''}`}
                                        onClick={() => {
                                            setVolume(i + 1);
                                        }}
                                    >
                                        {level}
                                    </button>
                                )
                            })
                        }
                    </div>
                </Zoom>
            </Fragment>
        )
    }

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
                                                    <Component match={match} history={props.history} dataFromStack={data} />
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

export default InputPanelStackOfScreens;