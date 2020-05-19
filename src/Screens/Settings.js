/* React */
import React, {
    useEffect,
    useState,
    useContext,
    Fragment
} from 'react';

/* Libraries */
import _ from 'lodash';
import moment from 'moment';
import { useParams } from "react-router-dom";

/* Animations */
import Bounce from 'react-reveal/Bounce';
import Roll from 'react-reveal/Roll';
import Zoom from 'react-reveal/Zoom';

/* Icons */
import Plus from '../icons/plus.svg';
import Minus from '../icons/minus.svg';
import Done from '../icons/doneWhite.svg';
import Clear from '../icons/clearWhite.svg';

/* Components */
import DetailsHeader from '../Components/DetailsHeader';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker'
import { Image } from 'react-bootstrap';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

function Settings(props) {
    const { User, loading, setShowComingSoonModal } = useContext(DataContext);

    const restOfPage = () => {
        return (
            <Fragment>
                <DetailsHeader history={props.history} back={'/durango/app/home'} />
                <div
                    className="page"
                    style={{
                        marginTop: '20px'
                    }}
                >
                    <div className="detailsSubheader">
                        <div>
                            <Zoom
                                cascade
                                duration={500}
                            >
                                <h1 className="settingsTitle">{User.Name}</h1>
                            </Zoom>
                            <p className="settingsEmailParagraph">
                                <span className="greyText">{'Email: '}</span>
                                <span>{User.Email}</span>
                            </p>
                        </div>
                        <Roll
                            right
                            duration={500}
                        >
                            <div>
                                <img
                                    src={User.imageUrl}
                                    className={
                                        `detailsLogo settingsProfileImage`
                                    }
                                />
                            </div>
                        </Roll>
                    </div>
                    <div
                        className="detailsRow clickableRow"
                        onClick={() => {
                            setShowComingSoonModal(true);
                        }}
                    >
                        <h1 className="detailRowText boldText">
                            Notifikacije
                        </h1>
                        <img
                            src={Done}
                            className="svgIconSmaller"
                        />
                    </div>
                    <div
                        className="detailsRow clickableRow"
                        onClick={() => {
                            setShowComingSoonModal(true);
                        }}
                    >
                        <h1 className="detailRowText boldText">
                            Upravljaj omiljenima
                        </h1>
                        <img
                            src={Done}
                            className="svgIconSmaller"
                        />
                    </div>
                    <div
                        className="detailsRow clickableRow"
                        onClick={() => {
                            setShowComingSoonModal(true);
                        }}
                    >
                        <h1 className="detailRowText boldText">
                            Pridruži svoj objekat
                        </h1>
                        <img
                            src={Plus}
                            className="svgIconSmaller"
                        />
                    </div>
                    <div
                        className="detailsRow clickableRow"
                        onClick={() => {
                            setShowComingSoonModal(true);
                        }}
                    >
                        <h1 className="detailRowText boldText">
                            Privacy policy
                        </h1>
                        <img
                            src={Plus}
                            className="svgIconSmaller"
                        />
                    </div>
                    <div
                        className="detailsRow clickableRow"
                        onClick={() => {
                            localStorage.removeItem('User');
                            props.history.push("/durango/app-login");
                        }}
                    >
                        <h1 className="detailRowText boldText">
                            Izloguj se
                        </h1>
                        <img
                            src={Clear}
                            className="svgIconSmaller"
                        />
                    </div>
                    <Image className="settingsFFWDLogo" src="https://futureforward.nl/resources/themes/app/images/futureforward-logo.svg" fluid />
                </div>
            </Fragment>
        )
    }

    return (
        !loading && restOfPage()
    );
}

export default Settings;
