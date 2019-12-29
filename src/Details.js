/* React */
import React, { useState, useEffect } from 'react';
import './App.css';
/* Data */
// import data from './data/kafici';
/* Libraries */
import _ from 'lodash';
import queryString from 'query-string';

function Details(props) {

    return (
        <div>
            <div className="detailsHeader">
                <img src={'./slike/' + props.data.Logo} className="detailsLogo" />
                <h1 className="detailsTitle">{props.data.Title}</h1>
                <button onClick={() => {
                    props.setSelected(null)
                }}>Nazad</button>
            </div>
            <p>Slobodnih mesta: {props.data.BrojSlobodnihMesta} / {props.data.BrojMesta}</p>
            <p>O mestu: {props.data.Details.Opis}</p>
            <button>Rezervisi</button>
        </div>
    );
}

export default Details;
