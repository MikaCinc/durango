import React, { useState } from 'react';
import './App.css';
import data from './data/kafici';

function App() {
  const [current, setCurrent] = useState(null);
  const [search, setSearch] = useState('');

  const findByID = (ID) => {
    data.forEach(k => {
      if (k.ID === ID) return k;
    })

    return null;
  }

  const filterBySearch = (arr = data) => {
    return arr.filter(({ Title }) => {
      return Title.trim().toLowerCase().indexOf(search) > -1;
    });
  }

  return (
    <div className="App">
      <div className="search">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }} />
      </div>
      {
        !current && filterBySearch().map((Kafic) => {
          return <div key={Kafic.ID} className="singleLine">
            <img className="listLogo" src={'./slike/' + Kafic.Logo} />
            <h1>{Kafic.Title}</h1>
            <p>Slobodnih mesta: {Kafic.BrojSlobodnihMesta} / {Kafic.BrojMesta}</p>
            <button onClick={() => {
              setCurrent(Kafic)
            }}>Details</button>
          </div>
        })
      }
      <div className='details'>
        {
          current && <div>
            <h1>{current.Title}</h1>
            <img src={'./slike/' + current.Logo} />
            <p>Slobodnih mesta: {current.BrojSlobodnihMesta} / {current.BrojMesta}</p>
            <p>O mestu: {current.Details.Opis}</p>
            <button>Rezervisi</button>
            <button onClick={() => {
              setCurrent(null)
            }}>Nazad</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
