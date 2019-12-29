/* React */
import React, { useState, useEffect, Fragment } from 'react';
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
    if(selected) {
      window.history.pushState({}, '', window.location.pathname + "?" + queryString.stringify({ 'view': selected }));
    }else {
      window.history.pushState({}, '', window.location.pathname);
    }
  }, [selected])


  const filterBySearch = (arr = data) => {
    let filtered = arr.filter(({ Title }) => {
      return Title.trim().toLowerCase().indexOf(search) > -1;
    });

    return _.orderBy(filtered, 'BrojSlobodnihMesta', 'desc');
  }

  const Search = () => {
    return (
      <div className="search">
        <i className="material-icons" id="searchIcon">
          search
        </i>
        <input
          className="searchInput"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }} />
      </div>
    )
  }

  const List = () => {
    return (
      filterBySearch().map((Kafic) => {
        return <div
          key={Kafic.ID}
          className="singleLine"
          onClick={() => {
            setSelected(Kafic.ID)
          }}
        >
          <img className="listLogo" src={'./slike/' + Kafic.Logo} />
          <h1 className="lineTitle">{Kafic.Title}</h1>
          <div className="lineCounter">
            <p className="lineFreeSeats">{Kafic.BrojSlobodnihMesta} / {Kafic.BrojMesta}</p>
            <i
              className="material-icons peopleIcon"
              style={{
                color: Kafic.BrojSlobodnihMesta > 0 ? '#3261D5' : '#ff0000',
              }}
            >
              people
            </i>
          </div>
        </div>
      })
    )
  }

  const ListAndSearch = () => {
    return (
      <Fragment>
        {
          Search()
        }
        {
          List()
        }
      </Fragment>
    )

    Search()
    filterBySearch().map((Kafic) => {
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

  return (
    <div className="App">
      <div className="list">
        {
          !selected && ListAndSearch()
        }
      </div>
      <div className='details'>
        {
          selected && <Details data={_.find(data, { 'ID': selected })} setSelected={setSelected} />
        }
      </div>
    </div>
  );
}

export default App;
