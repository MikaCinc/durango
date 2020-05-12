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

/* Icons */
import BackArrow from '../icons/backArrow.svg';

/* Animations */
import { CSSTransition, TransitionGroup } from 'react-transition-group';

/* Context */
import ObjectContext, { ObjectProvider } from '../Context/objectContext';

const routes = [
    { path: '/durango/inputPanel/:id', Component: Restaurant },
    { path: '/durango/inputPanel/:id/settings', Component: ObjectSettings },
]

const InputPanelStackOfScreens = (props) => {
    let { id } = useParams();
    // const { location } = useContext(__RouterContext);

    const { Data, loading } = useContext(ObjectContext);

    useEffect(() => {
        if (!Data || !Data.length) {
            return;
        }
        if (!id) {
            props.history.push('/durango/inputPanel/login');
        }

        let findData = { ..._.find(Data, { 'id': parseInt(id, 10) }) };

        if (!findData.id) {
            props.history.replace(`/durango/inputPanel/login`);
        } else {
            props.history.replace(`/durango/inputPanel/${findData.id}`);
        }
    }, [Data]);

    return (
        <Fragment>
            {
                <IPHeader history={props.history} />
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
            {
                // !loading && data && <Claps data={data} />
            }
        </Fragment>
    )
}

export default InputPanelStackOfScreens;