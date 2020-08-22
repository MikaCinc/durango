/* React */
import React, {
    useState,
    useContext,
    Fragment
} from 'react';

/* Libraries */
import _ from 'lodash';
import moment from 'moment';
import { getTodaysWorkingHours, getApiUrl } from '../library/common';

/* Components */
import { Carousel, Modal } from 'react-bootstrap';

/* Animations */
import { Spring } from 'react-spring/renderprops';

/* Icons */
import Title from '../icons/titleBlue.svg';
import Watch from '../icons/watchBlue.svg';
import Call from '../icons/callBlue.svg';
import Audio from '../icons/audioBlue.svg';
import AudioLight from '../icons/audioLightblue.svg';
import Location from '../icons/locationBlue.svg';
import MenuBook from '../icons/menuBookWhite.svg';
import WorkingHours from '../CustomIcons/workHours.png';
import musicModal from '../CustomIcons/musicModal.png';

/* Slike */
import defaultPhoto from '../carouselMock/defaultPhoto.jpg';

/* Context */
import DataContext from '../Context/dataContext';

const daysOfTheWeek = [
    'Ponedeljak',
    'Utorak',
    'Sreda',
    'Četvrtak',
    'Petak',
    'Subota',
    'Nedelja'
];

const MoreDetails = ({ data }) => {
    const { setShowComingSoonModal, setErrorModalMessage } = useContext(DataContext);

    const [showWHModal, setShowWHModal] = useState(false);
    const [showVolumeModal, setShowVolumeModal] = useState(false);

    const renderCarousel = () => {
        const { images } = data.details;
        let shouldShowDefault = !images || !images.length || !images[0];

        return (
            <Carousel
                style={{ marginBottom: '10px' }}
                interval={2500}
                slide={true}
                indicators={!shouldShowDefault}
            >
                {
                    !shouldShowDefault && images.map((item, index) => {
                        return <Carousel.Item key={index}>
                            <div>
                                <img
                                    className="d-block w-100"
                                    src={getApiUrl() + item}
                                    alt={(index + 1) + '. slika'}
                                />
                            </div>
                        </Carousel.Item>
                    })
                }
                {
                    shouldShowDefault && <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={defaultPhoto}
                            alt={'Ovaj objekat trenutno nema slika'}
                        />
                    </Carousel.Item>
                }
            </Carousel>
        )
    }

    const renderNumber = (num) => {
        if (!num && num !== 0) return;

        return (
            <Spring
                from={{ number: 0 }}
                to={{ number: parseInt(num, 10) }}>
                {props => <span>{Math.ceil(props.number)}</span>}
            </Spring>
        )
    }

    const getAddress = () => {
        let adr = data.details.address;
        if (!adr) {
            return <a>Trenutno nepoznata adresa</a>;
        }

        if (adr.length > 30) {
            return <a
                href={'http://maps.google.com/?q=' + adr}
                target='blank'
            >
                {adr.slice(0, 30) + '...'}
            </a>;
        }

        return <a
            href={'http://maps.google.com/?q=' + adr}
            target='blank'
        >
            {adr}
        </a>;
    }

    const getMusic = () => {
        let mus = data.details.music;
        if (!mus) {
            return '?';
        }

        if (mus.length > 9) {
            return mus.slice(0, 9) + '...';
        }

        return mus;
    }

    const getPhoneNumber = () => {
        let ph = data.details.phoneNumber;
        if (!ph) {
            return <span>Trenutno nepoznato</span>;
        }

        if (ph.length > 30) {
            return <span>{ph.slice(0, 30) + '...'}</span>;
        }

        return <a href={`tel:${ph}`}>{ph}</a>;
    }

    const getWorkingHours = () => {
        let day = getTodaysWorkingHours(data.details.workingHours);

        if (!day) {
            return 'ZATVORENO'
        }

        return day;
    }

    const restOfPage = () => {
        return (
            <Fragment>
                {
                    renderCarousel()
                }
                <div
                    className="detailsRowMini"
                >
                    <p className="detailRowTextMini">
                        <span className="boldText">Naziv: </span>
                        {data.title}
                    </p>
                    <img
                        src={Title}
                        className="svgIconSmaller"
                        alt="icon"
                    />
                </div>
                <div
                    className="detailsRowMini"
                >
                    <p className="detailRowTextMini">
                        <span className="boldText">Adresa: </span>
                        {getAddress()}
                    </p>
                    <img
                        src={Location}
                        className="svgIconSmaller"
                        alt="icon"
                    />
                </div>
                <div
                    className="detailsRowMini"
                >
                    <p className="detailRowTextMini">
                        <span className="boldText">Telefon: </span>
                        {getPhoneNumber()}
                    </p>
                    <img
                        src={Call}
                        className="svgIconSmaller"
                        alt="icon"
                    />
                </div>
                <div
                    className="detailsRow2Container"
                >
                    <div>
                        <span className="boldText mr-1">Muzika: </span>
                        {getMusic()}
                    </div>
                    <div onClick={() => setShowVolumeModal(true)} className="clickable">
                        <span className="boldText mr-1">Glasnoća: </span>
                        <span className="d-flex">
                            {
                                [1, 2, 3].map((i) => {
                                    return (
                                        <img
                                            key={i}
                                            src={
                                                _.inRange(i, 0, data.details.volume + 1)
                                                    ? Audio
                                                    : AudioLight
                                            }
                                            className="svgIconSmaller"
                                            alt="icon"
                                        />
                                    )
                                })
                            }
                        </span>
                    </div>
                </div>
                <div
                    className="detailsRow2Container"
                >
                    <div>
                        <span className="boldText mr-1">Prosečno <span role="img" aria-label="claps">👏</span>: </span>
                        {
                            data.details.numberOfGrades ? (data.details.totalClaps / data.details.numberOfGrades).toPrecision(2) : '0'
                        }
                    </div>
                    <div>
                        <span className="boldText mr-1">Ukupno <span role="img" aria-label="claps">👏</span>: </span>
                        {
                            renderNumber(data.details.totalClaps) || '?'
                        }
                    </div>
                </div>
                <div
                    className="detailsRowMini"
                    onClick={() => {
                        setShowWHModal(true);
                    }}
                >
                    <p className="detailRowTextMini">
                        <span className="boldText">Radno vreme: </span>
                        {getWorkingHours()}
                        {' [ '}
                        <span
                            style={{
                                cursor: 'pointer',
                            }}
                            className="text-primary"
                        >
                            više
                            </span>
                        {' ]'}
                    </p>
                    <img
                        src={Watch}
                        className="svgIconSmaller"
                        alt="icon"
                    />
                </div>
                {
                    data.details.description && <div
                        className="detailAbout"
                    >
                        {
                            data.details.description.length > 150
                                ? data.details.description.slice(0, 150) + '...'
                                : data.details.description
                        }
                    </div>
                }
                <div
                    className="detailsRow2Container"
                >
                    <div onClick={() => setShowComingSoonModal(true)}>
                        <span className="boldText mr-1" role="img" aria-label="Coming soon emojis">🔜🚶‍🎈🍀👣</span>
                        <div className="comingSoon acrylicDark"></div>
                    </div>
                    <div onClick={() => setShowComingSoonModal(true)}>
                        <span className="boldText mr-1" role="img" aria-label="Coming soon emojis">🍓🍀🔓🤐🔀</span>
                        <div className="comingSoon acrylicDark"></div>
                    </div>
                </div>
                <div
                    className="detailsRow clickableRow"
                    onClick={() => {
                        setShowComingSoonModal(true);
                    }}
                >
                    <h1 className="detailRowText boldText">Meni</h1>
                    <img
                        src={MenuBook}
                        className="svgIconSmaller"
                        alt="icon"
                    />
                </div>
            </Fragment>
        )
    }

    return (
        <div>
            {
                restOfPage()
            }
            {
                showWHModal && <Modal
                    show={showWHModal}
                    onHide={() => { setShowWHModal(false); }}
                    centered
                >
                    <Modal.Body>
                        <div className="modalContainer">
                            <img src={WorkingHours} style={{ width: '125px' }} alt="icon" />
                            {
                                data.details.workingHours.map((item, index) => {
                                    return (
                                        <p
                                            key={index}
                                            className={
                                                index === moment().isoWeekday() - 1
                                                    ? 'boldText'
                                                    : ''
                                            }
                                        >
                                            {
                                                daysOfTheWeek[index] + ': '
                                            }
                                            <span>
                                                {
                                                    item ? item : 'ZATVORENO'
                                                }
                                            </span>
                                        </p>
                                    )
                                })
                            }
                            <button
                                className="detailsRow clickableRow w-50"
                                onClick={() => {
                                    setShowWHModal(false);
                                }}
                            >
                                <h1 className="detailRowText boldText">OK</h1>
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            }
            {
                showVolumeModal && <Modal
                    show={showVolumeModal}
                    onHide={() => { setShowVolumeModal(false); }}
                    centered
                >
                    <Modal.Body>
                        <div className="modalContainer">
                            <img src={musicModal} style={{ width: '125px' }} alt="icon" />
                            <div className="d-flex flex-column mb-2">
                                {
                                    [1, 2, 3].map((j) => {
                                        return (
                                            <div className="d-flex flex-row" key={j}>
                                                {
                                                    [1, 2, 3].map((i) => {
                                                        return (
                                                            <img
                                                                key={i}
                                                                src={
                                                                    _.inRange(i, 0, j + 1)
                                                                        ? Audio
                                                                        : AudioLight
                                                                }
                                                                className="svgIconSmaller"
                                                                alt="icon"
                                                            />
                                                        )
                                                    })
                                                }
                                                <p>
                                                    {
                                                        j === 1
                                                            ? ' - Tiho'
                                                            : j === 2
                                                                ? ' - Umereno'
                                                                : ' - Glasno'
                                                    }
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button
                                className="detailsRow clickableRow w-50"
                                onClick={() => {
                                    setShowVolumeModal(false);
                                }}
                            >
                                <h1 className="detailRowText boldText">OK</h1>
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}

export default MoreDetails;
