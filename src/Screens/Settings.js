/* React */
import React, {
    useContext,
    Fragment
} from 'react';

/* Libraries */
import _ from 'lodash';
import { getApiUrl } from '../library/common';
import ReactGA from 'react-ga';

/* Animations */
import Roll from 'react-reveal/Roll';
import Zoom from 'react-reveal/Zoom';

/* Icons */
import Instagram from '../icons/instagram.png';
import Info from '../icons/infoWhite.svg';
import Notification from '../icons/notificationWhite.svg';
import Logout from '../icons/logoutWhite.svg';
import Privacy from '../icons/privacyWhite.svg';
import Wrench from '../icons/wrenchWhite.svg';
import defaultAvatar from '../CustomIcons/defaultAvatar.png';

/* Components */
import DetailsHeader from '../Components/DetailsHeader';

/* Context */
import DataContext from '../Context/dataContext';

const Settings = (props) => {
    const { User, setUser, loading, setShowComingSoonModal } = useContext(DataContext);

    const logoutUser = () => {
        let accessToken = localStorage.getItem('userAccessToken');
        if (!User || !accessToken) {
            return;
        }

        fetch(getApiUrl() + '/users/logout', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }),
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            localStorage.removeItem('User');
            localStorage.removeItem('userAccessToken');
            localStorage.removeItem('userRefreshToken');
            setUser({});
        }).catch(({ message }) => {
            return alert(message);
        });
    }

    const getAvatarSrc = () => {
        let accessToken = localStorage.getItem('userAccessToken');
        if (!User || !accessToken || !User.imageUrl) {
            return defaultAvatar;
        }

        return User.imageUrl;
    }

    const restOfPage = () => {
        return (
            <Fragment>
                <DetailsHeader history={props.history} back={'/app/home'} />
                <div className="page" style={{ maxWidth: '600px' }}>
                    <div className="detailsSubheader">
                        {
                            User && User.id && <div>
                                <Zoom
                                    cascade
                                    duration={500}
                                >
                                    <h1 className="settingsTitle">{User.name || 'Nisi ulogovan'}</h1>
                                </Zoom>
                                <p className="settingsEmailParagraph">
                                    <span className="greyText">{User.email || ''}</span>
                                </p>
                            </div>
                        }
                        {
                            (!User || !User.id) && <button
                                className="detailsRow clickableRowCancel w-50"
                                onClick={() => {
                                    props.history.push('/app/login');
                                }}
                            >
                                <h1 className="detailRowText boldText">Uloguj se</h1>
                            </button>
                        }
                        <Roll
                            right
                            duration={500}
                        >
                            <div>
                                <img
                                    src={getAvatarSrc()}
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
                            src={Notification}
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
                            src={Wrench}
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
                            src={Info}
                            className="svgIconSmaller"
                        />
                    </div>
                    <a href='/files/privacyPolicy.docx' target="_blank" rel="noopener noreferrer" download>
                        <div
                            className="detailsRow clickableRow"
                        /* onClick={() => {
                            setShowComingSoonModal(true);
                        }} */
                        >
                            <h1 className="detailRowText boldText">
                                Politika privatnosti
                        </h1>
                            <img
                                src={Privacy}
                                className="svgIconSmaller"
                            />
                        </div>
                    </a>
                    {
                        User && User.id && <div
                            className="detailsRow clickableRowCancel"
                            onClick={() => {
                                logoutUser();
                            }}
                        >
                            <h1 className="detailRowText boldText">
                                Izloguj se
                            </h1>
                            <img
                                src={Logout}
                                className="svgIconSmaller"
                            />
                        </div>
                    }
                    <div className="settingsDevelopedBy">
                        <p className="greyText">Durango razvili:</p>
                        <div className="settingsDevelopedByMikacMarko">
                            <div onClick={() => {
                                ReactGA.event({
                                    category: 'Application',
                                    action: 'Developer link clicked',
                                    label: 'mikac_inc',
                                });
                                window.open('https://www.instagram.com/mikac_inc/');
                            }}>
                                <img src={Instagram} />
                                Mihajlo Marjanović
                            </div>
                            <div onClick={() => {
                                ReactGA.event({
                                    category: 'Application',
                                    action: 'Developer link clicked',
                                    label: 'its.markooo',
                                });
                                window.open('https://www.instagram.com/its.markooo/');
                            }}>
                                <img src={Instagram} />
                                Marko Vučković
                            </div>
                        </div>
                        <img
                            className="settingsFFWDLogo"
                            src="https://futureforward.nl/resources/themes/app/images/futureforward-logo.svg"
                            onClick={() => {
                                ReactGA.event({
                                    category: 'Application',
                                    action: 'Developer link clicked',
                                    label: 'ffwd',
                                });
                                window.open('https://futureforward.nl/');
                            }}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }

    return (
        !loading && restOfPage()
    );
}

export default Settings;
