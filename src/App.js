import React, { useState } from 'react';
import './App.css';
// import Kafic from './data.js';

import logo from './slike/vinyl.png';

const Kafic = {
  ID: 1,
  Title: 'Square',
  Logo: require('./slike/vinyl.png'),
  BrojMesta: 32,
  BrojSlobodnihMesta: 22,
  Details: {
    Opis: 'Hhehehehehe',
    Slike: ['', '', ''],
    RadnoVreme: '07:00 - 23:30',
    Lokacija: '',
    Meni: ''
  },
};

function App() {
  const [k, setK] = useState(null);

  return (
    <div className="App">
      {
        !k && <div>
          <h1>{Kafic.Title}</h1>
          <img src={Kafic.Logo} />
          <p>Slobodnih mesta: {Kafic.BrojSlobodnihMesta} / {Kafic.BrojMesta}</p>
          <button onClick={() => {
            setK(Kafic.ID)
          }}>Details</button>
        </div>
      }
      <div className='details'>
        {
          k && <div>
            <h1>{Kafic.Title}</h1>
            <img src={'./slike/vinyl.png'} />
            <p>Slobodnih mesta: {Kafic.BrojSlobodnihMesta} / {Kafic.BrojMesta}</p>
            <p>O mestu: {Kafic.Details.Opis}</p>
            <button>Rezervisi</button>
            <button onClick={() => {
              setK(null)
            }}>Go back</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
