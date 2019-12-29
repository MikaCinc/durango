/* React */
import React, { useState, useEffect } from 'react';
import './App.css';
/* Data */
import data from './data/kafici';
/* Libraries */
import _ from 'lodash';
import queryString from 'query-string';
/* Pages */
import Details from './Details';

function App(props) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let query = queryString.parse(window.location.search);

    if (query.view) {
      setSelected(parseInt(query.view, 10));
    };
  }, [])

  useEffect(() => {
    if (window.location.search !== queryString.stringify({ 'view': selected })) {
      if (selected) {
        window.history.replaceState(
          {},
          '',
          window.location.protocol +
          '//' +
          window.location.host +
          '?' +
          queryString.stringify({ 'view': selected })
        )
      } else {
        window.history.replaceState(
          {},
          '',
          window.location.protocol +
          '//' +
          window.location.host +
          '?'
        )
      }
    }
  }, [selected])

  const filterBySearch = (arr = data) => {
    let filtered = arr.filter(({ Title }) => {
      return Title.trim().toLowerCase().indexOf(search) > -1;
    });

    return _.orderBy(filtered, 'BrojSlobodnihMesta', 'desc');
  }

  return (
    <div className="App">
      <div className="search">
        <input
          className="searchInput"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }} />
      </div>
      {
        !selected && filterBySearch().map((Kafic) => {
          return <div
            key={Kafic.ID}
            className="singleLine"
            style={{
              backgroundColor: Kafic.BrojSlobodnihMesta > 0 ? '#00ff00' : '#ff0000',
            }}
          >
            <img className="listLogo" src={'./slike/' + Kafic.Logo} />
            <h1>{Kafic.Title}</h1>
            <p>Slobodnih mesta: {Kafic.BrojSlobodnihMesta} / {Kafic.BrojMesta}</p>
            <button onClick={() => {
              setSelected(Kafic.ID)
            }}>Details</button>
          </div>
        })
      }
      <div className='details'>
        {
          selected && <Details data={_.find(data, { 'ID': selected })} setSelected={setSelected} />
        }
      </div>
    </div>
  );
}

export default App;
