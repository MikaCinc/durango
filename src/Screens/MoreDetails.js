/* React */
import React, { useEffect, useState } from 'react';
/* Libraries */
import _ from 'lodash';
import moment from 'moment';
import { useParams } from "react-router-dom";
/* Logo */
import Logo from '../ExtendedLogo/Logo.png';
/* Components */
import { Carousel } from 'react-bootstrap';
/* Data */
import mockData from '../data/kafici.js';
/* Slike */
import kafic1 from '../carouselMock/kafic1.jpg';
import kafic2 from '../carouselMock/kafic2.jpg';
import kafic3 from '../carouselMock/kafic3.jpg';

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
    const [data, setData] = useState({ ...placeholderObj });

    useEffect(() => {
        let findData = { ..._.find(mockData, { 'id': parseInt(id, 10) }) || placeholderObj };

        setData(findData);
    }, []);

    const getRadnoVreme = () => {
        let time = data.details.radnoVreme,
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
            <Carousel style={{marginBottom: '10px'}}>
                {
                    [kafic1, kafic2, kafic3].map((item, index) => {
                        return <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                // src={'./slike/carouselMock/' + item}
                                src={item}
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
                        props.history.push(`durango/${data.id}`)
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
                    window.open(data.details.lokacija, '_blank');
                }}
            >
                <h1 className="detailRowText boldText">Prikaži na mapi</h1>
                <i className="material-icons detailIconClickable">
                    map
                </i>
            </div>
            <div
                className="detailsRow clickableRow"
                onClick={() => {
                    alert('Coming soon')
                }}
            >
                <h1 className="detailRowText boldText">Meni</h1>
                <i className="material-icons detailIconClickable">
                    menu_book
                </i>
            </div>

            <div className="detailAbout">
                <div className="detailsRow">
                <h1 className="detailRowText boldText">O mestu</h1>
                <i className="material-icons detailIcon">
                    info
                </i>
                </div>
                <p className="detailsAboutText">{data.details.opis}</p>
            </div>
        </div>
    );
}

export default MoreDetails;
