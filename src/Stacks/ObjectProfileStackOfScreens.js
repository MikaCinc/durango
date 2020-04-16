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

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

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
            <Switch>
                <Route key={2} exact path="/durango/app/:id" component={Details} />
                <Route key={3} exact path="/durango/app/:id/more" component={MoreDetails} />
                <Route key={4} exact path="/durango/app/:id/reserve" component={Reserve} />
            </Switch>
            {
                !loading && data && <Claps data={data} />
            }
        </Fragment>
    )
}

export default ObjectProfileStackOfScreens;