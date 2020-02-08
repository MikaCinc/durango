/* React */
import React, { useEffect, useState } from 'react';
/* Libraries */
import _ from 'lodash';
import moment from 'moment';
import { useParams } from "react-router-dom";
/* Logo */
import Logo from '../ExtendedLogo/Logo.png';
/* Components */
import DatePicker from 'react-date-picker';
/* Data */
import mockData from '../data/kafici.js';

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

function Reserve(props) {

    let { id } = useParams();
    const [data, setData] = useState({ ...placeholderObj });
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        let findData = { ..._.find(mockData, { 'id': parseInt(id, 10) }) || placeholderObj };

        setData(findData);
    }, []);

    return (
        <div>
            <div className="detailsHeader">
                <div
                    className="goBack"
                    onClick={() => {
                        props.history.push(`/durango/${data.id}`);
                    }}
                >
                    <i className="material-icons">
                        arrow_back_ios
                    </i>
                </div>
                <img src={Logo} className="detailsDurangoLogo" />
            </div>
            <div className="reserveContainer">
                <h3 className="reserveText">Datum rezervacije</h3>
                <div className="reserveCalendarContainer">
                    <DatePicker
                        onChange={(value) => {
                            setDate(value)
                        }}
                        value={date}
                        calendarIcon={
                            <i className="material-icons">
                                calendar_today
                            </i>
                        }
                        maxDetail="month"
                        minDate={new Date()}
                        maxDate={moment().add(3, 'day').toDate()}
                        calendarClassName="reserveCalendarMain"
                        className="reserveCalendar"
                    />
                </div>
                <h3 className="reserveText">Vreme rezervacije</h3>
                <div className="reserveTimeContainer">
                    <DatePicker
                        onChange={(value) => {
                            setDate(value)
                        }}
                        value={date}
                        calendarIcon={
                            <i className="material-icons">
                                calendar_today
                            </i>
                        }
                        maxDetail="month"
                        minDate={new Date()}
                        maxDate={moment().add(3, 'day').toDate()}
                        calendarClassName="reserveCalendarMain"
                        className="reserveCalendar"
                    />
                </div>
                <h3 className="reserveText">Broj mesta</h3>
            </div>
            <div
                className="detailsRow clickableRow"
                onClick={() => {
                    props.history.push(`/durango/${data.id}`);
                }}
            >
                <h1 className="detailRowText boldText">Rezerviši</h1>
                <i className="material-icons detailIconClickable">
                    check
                </i>
            </div>
            <div
                className="detailsRow clickableRowCancel"
                onClick={() => {
                    props.history.push(`/durango/${data.id}`);
                }}
            >
                <h1 className="detailRowText boldText">Otkaži</h1>
                <i className="material-icons detailIconClickable">
                    close
                </i>
            </div>
        </div>
    );
}

export default Reserve;
