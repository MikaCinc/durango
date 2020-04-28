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
import { roundToPrecision } from '../library/common';

/* Components */
import { Carousel } from 'react-bootstrap';
import AbsoluteWrapper from '../Components/AbsoluteWrapper';

/* Animations */
import { Spring } from 'react-spring/renderprops';
import Fade from 'react-reveal/Fade';

/* Icons */
import Title from '../icons/titleBlue.svg';
import Watch from '../icons/watchBlue.svg';
import Call from '../icons/callBlue.svg';
import Audio from '../icons/audioBlue.svg';
import AudioLight from '../icons/audioLightblue.svg';
import Location from '../icons/locationBlue.svg';
import NearMe from '../icons/nearMeWhite.svg';
import MenuBook from '../icons/menuBookWhite.svg';

/* Slike */
import kafic1 from '../carouselMock/kafic1.jpg';
import kafic2 from '../carouselMock/kafic2.jpg';
import kafic3 from '../carouselMock/kafic3.jpg';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

const placeholderObj = {
    id: 0,
    title: '',
    logo: '',
    brojMesta: 0,
    brojSlobodnihMesta: 0,
    details: {
        opis: '',
        slike: '',
        radnoVreme: '',
        lokacija: '',
        meni: ''
    }
}


function MoreDetails(props) {
    let { id } = useParams();
    const { Data, loading } = useContext(DataContext);

    const [data, setData] = useState({ ...placeholderObj });

    useEffect(() => {
        let findData = { ..._.find(Data, { 'id': parseInt(id, 10) }) || placeholderObj };

        setData(findData);
    }, [Data]);

    const renderCarousel = () => {
        return (
            <Carousel
                style={{ marginBottom: '10px' }}
                interval={2500}
                slide={true}
            >
                {
                    [kafic1, kafic2, kafic3].map((item, index) => {
                        return <Carousel.Item key={index}>
                            <div>
                                <img
                                    className="d-block w-100"
                                    // src={'./slike/carouselMock/' + item}
                                    src={item}
                                    alt={(index + 1) + '. slika'}
                                />
                            </div>
                            {/* <Carousel.Caption>
                                <h3>{'Glavni tekst ' + (index + 1)}</h3>
                                <p>{'Tekst opisa ' + (index + 1)}</p>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                    })
                }
            </Carousel>
        )
    }

    const renderNumber = (num) => {
        return (
            <Spring
                from={{ number: 0 }}
                to={{ number: parseInt(num, 10) }}>
                {props => <span>{Math.ceil(props.number)}</span>}
            </Spring>
        )
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
                    />
                </div>
                <div
                    className="detailsRowMini"
                >
                    <p className="detailRowTextMini">
                        <span className="boldText">Adresa: </span>
                        {data.details.adresa}
                    </p>
                    <img
                        src={Location}
                        className="svgIconSmaller"
                    />
                </div>
                <div
                    className="detailsRowMini"
                >
                    <p className="detailRowTextMini">
                        <span className="boldText">Telefon: </span>
                        {data.details.brojTelefona}
                    </p>
                    <img
                        src={Call}
                        className="svgIconSmaller"
                    />
                </div>
                <div
                    className="detailsRow2Container"
                >
                    <div>
                        <span className="boldText mr-1">Muzika: </span>
                        {
                            data.details.muzika
                        }
                    </div>
                    <div>
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
                        <span className="boldText mr-1">Prosečno 👏: </span>
                        {
                            (data.details.ukupnoAplauza / data.details.brojOcena).toPrecision(2)
                        }
                    </div>
                    <div>
                        <span className="boldText mr-1">Ukupno 👏: </span>
                        {
                            renderNumber(data.details.ukupnoAplauza)
                        }
                    </div>
                </div>
                <div
                    className="detailsRowMini"
                >
                    <p className="detailRowTextMini">
                        <span className="boldText">Radno vreme: </span>
                        {data.details.radnoVreme}
                    </p>
                    <img
                        src={Watch}
                        className="svgIconSmaller"
                    />
                </div>
                <div
                    className="detailAbout"
                >
                    {data.details.opis.slice(0, 135) + '...'}
                </div>

                <div
                    className="detailsRow clickableRow"
                    onClick={() => {
                        window.open(data.details.lokacija, '_blank');
                    }}
                >
                    <h1 className="detailRowText boldText">Prikaži na mapi</h1>
                    <img
                        src={NearMe}
                        className="svgIconSmaller"
                    />
                </div>
                <div
                    className="detailsRow clickableRow"
                    onClick={() => {
                        alert('Coming soon')
                    }}
                >
                    <h1 className="detailRowText boldText">Meni</h1>
                    <img
                        src={MenuBook}
                        className="svgIconSmaller"
                    />
                </div>
            </Fragment>
        )
    }

    return (
        // <AbsoluteWrapper>
        <div>
            {
                !loading && restOfPage()
            }
        </div>
        // </AbsoluteWrapper>
    );
}

export default MoreDetails;
