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
import DataContext, { DataProvider } from '../Context/dataContext';

const routes = [
    { path: '/durango/app/:id', name: 'Details', Component: Details },
    { path: '/durango/app/:id/more', name: 'MoreDetails', Component: MoreDetails },
    { path: '/durango/app/:id/reserve', name: 'Reserve', Component: Reserve },
]

const ObjectProfileStackOfScreens = (props) => {
    let { id } = useParams();

    const { Data, loading } = useContext(DataContext);
    const [data, setData] = useState();

    useEffect(() => {
        let findData = { ..._.find(Data, { 'id': parseInt(id, 10) }) };

        setData(findData);
    }, [Data]);

    const getBackURL = () => {
        const { history: { location: { pathname } } } = props;

        let splitted = pathname.split('/');

        if (['more', 'reserve'].indexOf(splitted[splitted.length - 1]) !== -1) {
            return `/durango/app/${data.id}`;
        } else {
            return `/durango/app/home`;
        }
    }

    return (
        <Fragment>
            {
                data && <DetailsHeader history={props.history} back={getBackURL()} />
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
                                                    <Component history={props.history} />
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

            {/* <Route key={2} exact path="/durango/app/:id" component={Details} />
                <Route key={3} exact path="/durango/app/:id/more" component={MoreDetails} />
                <Route key={4} exact path="/durango/app/:id/reserve" component={Reserve} /> */}
            {
                !loading && data && <Claps data={data} history={props.history} />
            }
        </Fragment>
    )
}

export default ObjectProfileStackOfScreens;