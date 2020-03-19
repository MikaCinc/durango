/* React */
import React, {
    useState,
    useEffect,
    useContext,
    Fragment
} from 'react';
import '../App.css';
/* Libraries */
import _ from 'lodash';
import moment from 'moment';
/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

import { useParams } from "react-router-dom";
import mockData from '../data/kafici.js';

/* Images */
import vinyl from '../slike/vinyl.png';
import Square from '../slike/Square.jpg';
import dnevnaSoba from '../slike/dnevnaSoba.jpg';
import durangoCaffe from '../slike/durangoCaffe.png';

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

function Details(props) {
    let { id } = useParams();
    const { Data, loading, changeData } = useContext(DataContext);

    const [data, setData] = useState({ ...placeholderObj });

    useEffect(() => {
        let findData = { ..._.find(Data, { 'id': parseInt(id, 10) }) || placeholderObj };

        setData(findData);
    }, [Data]);

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
            return <p className="randoVremeParagraph">
                <span className="greyText">Otvoreno: </span>
                <span style={{ color: '#009A1F' }}>{time}</span>
            </p>
        };


        return <p className="randoVremeParagraph">
            <span className="greyText">Zatvoreno: </span>
            <span style={{ color: '#C50505' }}>{time}</span>
        </p>;
    }

    const getSrc = (title) => {
        switch (title) {
            case 'vinyl': {
                return vinyl;
            };
            case 'Square': {
                return Square;
            };
            case 'dnevnaSoba': {
                return dnevnaSoba;
            };
            case 'durangoCaffe': {
                return durangoCaffe;
            };
            default: {
                return durangoCaffe;
            }
        }
    }

    const restOfPage = () => {
        return (
            <Fragment>
                <div className="detailsSubheader">
                    <div>
                        <h1 className="detailsTitle boldText">{data.title}</h1>
                        {/* <i className="material-icons greyText">
                        access_time
                    </i> */}
                        {getRadnoVreme()}
                    </div>
                    <img src={getSrc(data.logo.split('.')[0])} className="detailsLogo" />
                </div>
                <div className="detailsRow">
                    <h1 className="detailRowText">
                        Slobodnih mesta:
                    <span style={{
                            color: data.brojSlobodnihMesta > 0 ? '#3185FC' : '#9A031E',
                        }}>
                            {
                                ' ' + data.brojSlobodnihMesta + ' '
                            }
                        </span>
                        {/* / {data.brojMesta} */}
                    </h1>
                    <i className="material-icons detailIcon">
                        people
                </i>
                </div>
                <div
                    className="detailsRow clickableRow"
                    onClick={() => {
                        // handleShow()
                        props.history.push(`/durango/app/${data.id}/reserve`);
                    }}
                >
                    <h1 className="detailRowText boldText">Napravi rezervaciju</h1>
                    <i className="material-icons detailIconClickable">
                        book
                </i>
                </div>
                <div className="detailsRow clickableRow" onClick={() => {
                    props.history.push(`/durango/app/${data.id}/more`);
                }}>
                    <h1 className="detailRowText boldText">O mestu</h1>
                    <i className="material-icons detailIconClickable">
                        info
                </i>
                </div>
                <div className="detailsRow clickableRow" onClick={() => {
                    changeData({
                        ...data,
                        favorit: !data.favorit
                    });
                }}>
                    <h1 className="detailRowText boldText">
                        {
                            data.favorit
                                ? 'Ukloni iz favorita'
                                : 'Dodaj u favorite'
                        }
                    </h1>
                    <i className="material-icons detailIconClickable">
                        {data.favorit ? 'star' : 'star_outline'}
                    </i>
                </div>
            </Fragment>
        )
    }

    return (
        <div>
            <div className="detailsHeader">
                <div
                    className="goBack"
                    onClick={() => {
                        // props.setSelected(null)
                        props.history.push('/durango/app/home')
                    }}
                >
                    <i className="material-icons">
                        arrow_back_ios
                    </i>
                </div>
                <img src={Logo} className="detailsDurangoLogo" />
            </div>
            {
                !loading && restOfPage()
            }
        </div>
    );
}

export default Details;