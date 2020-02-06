/* React */
import React, { useEffect } from 'react';
/* Libraries */
import _ from 'lodash';
import moment from 'moment';

/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

import { Carousel } from 'react-bootstrap';

// import data from '../data/kafici.js';


function MoreDetails(props) {

    useEffect(() => {

    }, [])

    const getRadnoVreme = () => {
        let time = props.data.details.radnoVreme,
            timeStart = time.split(' - ')[0],
            timeEnd = time.split(' - ')[1],
            currentTime = moment(),
            flag = false,
            sFlag = false,
            lowerLimit = '05:00';

        if (currentTime.isBetween(moment('00:00', 'HH:mm'), moment(lowerLimit, 'HH:mm'))) {
            sFlag = true;
        };

        if (moment(timeEnd, 'HH:mm').isBetween(moment('00:00', 'HH:mm'), moment(lowerLimit, 'HH:mm'))) {
            flag = true;
        };

        if (currentTime.isBetween(moment(timeStart, 'HH:mm').subtract(sFlag ? 1 : 0, 'days'), moment(timeEnd, 'HH:mm').add(flag ? 1 : 0, 'days'))) {
            return <h1
                className="detailRowText"
            >
                <span className="greyText">Otvoreno: </span>
                <span style={{ color: '#009A1F' }}>{time}</span>
            </h1>
        };


        return <h1 className="detailRowText">
            <span className="greyText">Zatvoreno: </span>
            <span style={{ color: '#C50505' }}>{time}</span>
        </h1>;
    }

    const renderCarousel = () => {
        return (
            <Carousel>
                {
                    ['kafic1.jpg', 'kafic2.jpg', 'kafic3.jpg'].map((item, index) => {
                        return <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={'./slike/carouselMock/' + item}
                                alt={(index + 1) + '. slika'}
                            />
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

    return (
        <div>
            <div className="detailsHeader">
                <div
                    className="goBack"
                    onClick={() => {
                        props.router.push('/')
                    }}
                >
                    <i className="material-icons">
                        arrow_back_ios
                    </i>
                </div>
                <img src={Logo} className="detailsDurangoLogo" />
            </div>
            {
                renderCarousel()
            }

            <div
                className="detailsRow clickableRow"
                onClick={() => {
                    window.open(props.data.details.lokacija, '_blank');
                }}
            >
                <i className="material-icons detailIcon">
                    map
                </i>
                <h1 className="detailRowText">Prikaži na mapi</h1>
            </div>

            <div className="detailAbout">
                <div className="detailsRowSimple">
                    <i className="material-icons detailIcon greyText">
                        info
                    </i>
                    <h1 className="detailRowText greyText">O mestu</h1>
                </div>
                <p className="detailsAboutText">{props.data.details.opis}</p>
            </div>
        </div>
    );
}

export default MoreDetails;
