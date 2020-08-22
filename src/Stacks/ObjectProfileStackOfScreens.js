import React, {
    useEffect,
    useContext,
    useState,
    Fragment
} from 'react';

/* Libraries */
import _ from 'lodash';

/* Components */
import Claps from '../Components/Claps';
import DetailsHeader from '../Components/DetailsHeader';

/* Router */
import {
    useParams,
    Route,
    Switch,
} from "react-router-dom";

/* Pages / Screens */
import Details from '../Screens/Details';
import MoreDetails from '../Screens/MoreDetails';
import Reserve from '../Screens/Reserve';

/* Animations */
import { CSSTransition, TransitionGroup } from 'react-transition-group';

/* Context */
import DataContext from '../Context/dataContext';

const routes = [
    { path: '/app/:id', name: 'Details', Component: Details },
    { path: '/app/:id/more', name: 'MoreDetails', Component: MoreDetails },
    { path: '/app/:id/reserve', name: 'Reserve', Component: Reserve },
]

const ObjectProfileStackOfScreens = (props) => {
    let { id } = useParams();

    const { Data, loading } = useContext(DataContext);
    const [data, setData] = useState();

    useEffect(() => {
        if(!Data || !Data.length) {
            return;
        };

        let findData = { ..._.find(Data, { 'id': id }) };

        if (!findData || !findData.id) {
            props.history.push('/app/home');
        }

        setData(findData);
    }, [Data]);

    const getBackURL = () => {
        const { history: { location: { pathname } } } = props;

        if(!data || !data.id) {
            return `/app/home`;
        };

        let splitted = pathname.split('/');

        if (['more', 'reserve'].indexOf(splitted[splitted.length - 1]) !== -1) {
            return `/app/${data.id}`;
        } else {
            return `/app/home`;
        }
    }

    const restOfPage = () => {
        return (
            <Fragment>
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
                                                    <div className="page" style={{ maxWidth: '600px' }}>
                                                        <Component history={props.history} data={data} />
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
                <Claps data={data} history={props.history} />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <DetailsHeader history={props.history} back={getBackURL()} showAvatar />
            {
                !loading && data && data.id && restOfPage()
            }
        </Fragment>
    )
}

export default ObjectProfileStackOfScreens;