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
            <h1>{props.data.Title}</h1>
            <img src={'./slike/' + props.data.Logo} />
            <p>Slobodnih mesta: {props.data.BrojSlobodnihMesta} / {props.data.BrojMesta}</p>
            <p>O mestu: {props.data.Details.Opis}</p>
            <button>Rezervisi</button>
            <button onClick={() => {
                props.setSelected(null)
            }}>Nazad</button>
        </div>
    );
}

export default Details;
