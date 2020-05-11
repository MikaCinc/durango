import React, {
    useEffect,
    useContext,
    useState
} from 'react';

/* Data */
import kafici from '../data/kafici';

/* Packages & libraries */
import _ from 'lodash';
import { isOpen } from '../library/common';

/* Router */
import { useParams } from "react-router-dom";

/* LOADER */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import moment from 'moment';


let ObjectContext;

const { Provider, Consumer } = ObjectContext = React.createContext({});

const ObjectProvider = (props) => {

    const [ID, setID] = useState("");
    const [loading, setLoading] = useState(false);
    const [object, setObject] = useState(null);

    useEffect(() => {
        let findData = {};
        if (ID) {
            findData = { ..._.find(kafici, { 'id': parseInt(ID, 10) }) };
        }

        if (findData.id) {
            setObject(findData);
            props.history.push('/durango/inputPanel/' + ID);
        }
    }, [ID]);

    return (
        <Provider
            value={{
                ID,
                setID,
                object,
                setObject,
                loading
            }}
        >
            {props.children}
            <LoaderComponent />
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