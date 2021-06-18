import React, {
    useContext,
    useEffect,
    useRef,
    useState,
    Fragment
} from 'react';

/* Libraries */
import _ from 'lodash';
import { getApiUrl } from '../library/common';
import ReactGA from 'react-ga';

/* Icons */
import Img from '../CustomIcons/clapsModal.png';

/* webComponent */
import 'emoji-slider';

/* Components */
import { Modal } from 'react-bootstrap';

/* Animations */
import RubberBand from 'react-reveal/RubberBand';
import { Spring } from 'react-spring/renderprops';

/* Context */
import DataContext from '../Context/dataContext';

const Claps = ({ data, data: { details: { totalClaps } } }) => {
    const { User, setUser, setShowLoginModal, setErrorModalMessage } = useContext(DataContext);

    const [showSlider, setShowSlider] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [localClaps, setLocalClaps] = useState(0);
    const [userClaps, setUserClaps] = useState(0);

    const slider = useRef(null);
    let interval;

    const userClapsFunction = () => {
        if (!User || !User.id) {
            return;
        }

        let obj = _.find(User.claps, { id: data.id });
        if (!obj || !obj.id) {
            return 0;
        }

        return obj.userClaps;
    };

    useEffect(() => {
        setUserClaps(userClapsFunction());
    }, [User]);

    useEffect(() => {
        let sCurrent = slider.current;
        sCurrent.addEventListener('change', (e) => {

            //@todo Ovde treba debouncer neki
            onChange(e.detail.value);
        });

        return () => {
            sCurrent.removeEventListener('change', (e) => {
                onChange(e.detail.value);
            });
            clearTimeout(interval);
        }
    }, []);

    const onChange = (value) => {
        if (userClaps > 0) {
            setShowModal(true);
            return;
        } else {
            let ceildValue = Math.ceil(value * 5);
            setLocalClaps(ceildValue);
        }
    }

    useEffect(() => {
        if (localClaps > 0) {
            clearTimeout(interval);
            interval = setTimeout(() => {
                finishedRating();
            }, 1000);
        }

        return () => {
            clearTimeout(interval);
        }
    }, [localClaps]);

    const finishedRating = () => {
        setShowSlider(false);

        let accessToken = localStorage.getItem('userAccessToken');
        // let refreshToken = localStorage.getItem('userRefreshToken');

        fetch(getApiUrl() + '/users/' + User.id + '/add-claps', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }),
            body: JSON.stringify({
                id: data.id,
                userClaps: localClaps
            })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);

            setUser({
                ...User,
                ...response.data
            });

            localStorage.setItem('User', JSON.stringify({
                ...User,
                ...response.data
            }));

        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });

        // Update User object
        /* changeClaps({
            id: data.id,
            userClaps: localClaps
        }); */
    }

    const renderNumber = (num) => {
        if (!num && num !== 0) return;

        return (
            <Spring
                from={{ number: 100 }}
                to={{ number: parseInt(num, 10) }}>
                {
                    props =>
                        <span className="boldText">
                            {
                                showSlider
                                    ? `+${localClaps}`
                                    : Math.ceil(props.number)
                            }
                        </span>
                }
            </Spring>
        )
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <Fragment>
            <div
                className="clapsContainer"
                style={{
                    left: showSlider ? 0 : '' // Dok nije aktivan da može da se klikne na nešto ispod
                }}
            >
                <RubberBand
                    when={showSlider}
                    duration={500}
                    opposite={true}
                >
                    <div className={`clapsSliderContainer ${!showSlider && 'd-none'} acrylic`}>
                        <emoji-slider emoji="👏" value={0.5} step={0.2} ref={slider}></emoji-slider>
                    </div>
                </RubberBand>
                <div
                    className="clapsTriggerContainer"
                    onClick={() => {
                        ReactGA.event({
                            category: 'Application',
                            action: 'Claps',
                            label: 'Claps trigger button clicked',
                        });

                        if (!User || !User.id) {
                            setShowLoginModal(true);
                            return;
                        }

                        if (userClaps > 0) {
                            setShowModal(true);
                            return;
                        }
                        setShowSlider(!showSlider);
                    }}
                >
                    <span role="img" aria-label="claps">👏</span>
                    {
                        renderNumber(totalClaps) || '?'
                    }
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={handleClose}
                centered
            >
                <Modal.Body>
                    <div className="modalContainer">
                        <img src={Img} style={{ width: '125px' }} alt="icon"/>
                        <h6 className="boldText">Hvala! Već si <span role="img" aria-label="claps">👏</span> objektu {data.title}.</h6>
                        <p>Ukupno <span role="img" aria-label="claps">👏</span>: {data.details.totalClaps}</p>
                        <p>Ukupno ocena: {data.details.numberOfGrades}</p>
                        <p>Prosečno <span role="img" aria-label="claps">👏</span>: {data.details.numberOfGrades ? (data.details.totalClaps / data.details.numberOfGrades).toPrecision(2) : '0'}</p>
                        <p>Tvojih <span role="img" aria-label="claps">👏</span>: {userClaps}</p>
                        <button
                            className="detailsRow clickableRow w-50"
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            <h1 className="detailRowText boldText">OK</h1>
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default Claps;