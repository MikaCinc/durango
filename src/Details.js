/* React */
import React, { useState, useEffect } from 'react';
import './App.css';
/* Data */
// import data from './data/kafici';
/* Libraries */
import _ from 'lodash';
import moment from 'moment';
import queryString from 'query-string';

function Details(props) {

    /* useEffect(() => {
        console.log('herrerre')
    }, []) */

    const getRadnoVreme = () => {
        let time = props.data.Details.RadnoVreme,
            timeStart = time.split(' - ')[0],
            timeEnd = time.split(' - ')[1],
            currentTime = moment();

        if (currentTime.isBetween(moment(timeStart, 'HH:mm'), moment(timeEnd, 'HH:mm'))) {
        return <h1 className="detailRowText"><span className="greyText">Otvoreno: </span> <span style={{color: '#009A1F'}}>{time}</span></h1>;
        };

        return <h1 className="detailRowText"><span className="greyText">Zatvoreno: </span> <span style={{color: '#C50505'}}>{time}</span></h1>;
    }

    return (
        <div>
            <div className="detailsHeader">
                <img src={'./slike/' + props.data.Logo} className="detailsLogo" />
                <h1 className="detailsTitle">{props.data.Title}</h1>
                <button onClick={() => {
                    props.setSelected(null)
                }}>Nazad</button>
            </div>
            <div className="detailsRow">
                <h1 className="greyText">
                    Slobodnih mesta:
                    <span style={{
                        color: props.data.BrojSlobodnihMesta > 0 ? '#3261D5' : '#ff0000',
                    }}>
                        {
                            ' ' + props.data.BrojSlobodnihMesta + ' '
                        }
                    </span>
                    / {props.data.BrojMesta}
                </h1>
            </div>
            <div className="detailsRow clickableRow">
                <i className="material-icons detailIcon">
                    book
                </i>
                <h1 className="detailRowText">Napravi rezervaciju</h1>
            </div>
            <div className="detailsRow clickableRow">
                <i className="material-icons detailIcon">
                    map
                </i>
                <h1 className="detailRowText">Prikaži na mapi</h1>
            </div>
            <div className="detailsRow">
                <i className="material-icons detailIcon greyText">
                    access_time
                </i>
                {getRadnoVreme()}
            </div>
            <p>O mestu: {props.data.Details.Opis}</p>
            <button>Rezervisi</button>
        </div>
    );
}

export default Details;
