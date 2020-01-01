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
/* Animations */
import Slide from 'react-reveal/Slide';

function App(props) {
  const [noResults, setNoResults] = useState(false);
  const [filtered, setFiltered] = useState([...data]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let query = queryString.parse(window.location.search);

    if (query.view) {
      setSelected(parseInt(query.view, 10));
    };
  }, [])

  useEffect(() => {
    if (selected) {
      window.history.pushState({}, '', window.location.pathname + "?" + queryString.stringify({ 'view': selected }));
    } else {
      window.history.pushState({}, '', window.location.pathname);
    }
  }, [selected])

  useEffect(() => {
    setFiltered(filterBySearch())
  }, [search])

  useEffect(() => {
    setNoResults(filtered.length === 0);
  }, [filtered])


  const filterBySearch = (arr = data) => {
    let filtered = arr.filter(({ Title }) => {
      return Title.trim().toLowerCase().indexOf(search.trim().toLowerCase()) > -1;
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
          placeholder="Pretraži..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }} />
      </div>
    )
  }

  const List = () => {
    return noResults
      ? <div className="noResults boldText">
        <h1>
          Mesto koje tražite nije pronađeno
        </h1>
        <i
          className="material-icons noResultsIcon"
        >
          sentiment_very_dissatisfied
      </i>
      </div>
      : filtered.map((Kafic) => {
        return <div
          key={Kafic.ID}
          className="singleLine button"
          onClick={() => {
            setSelected(Kafic.ID)
          }}
        >
          <img className="listLogo" src={'./slike/' + Kafic.Logo} />
          <h1 className="lineTitle boldText">{Kafic.Title}</h1>
          <p className="lineFreeSeats boldText greyText">
            {Kafic.BrojSlobodnihMesta} / {Kafic.BrojMesta}
          </p>
          <i
            className="material-icons peopleIcon"
            style={{
              color: Kafic.BrojSlobodnihMesta > 0 ? '#3185FC' : '#9A031E',
            }}
          >
            people
            </i>
        </div>
      })

  }

  const ListAndSearch = () => {
    return (
      <Fragment>
        <div className="mainHeader">
          <p className="mainTitle">Durango</p>
          {
            Search()
          }
        </div>
        {
          List()
        }
      </Fragment>
    )
  }

  return (
    <div className="App">
      <Slide
        when={!selected}
        collapse
        left
        duration={300}
      >
        <div className="list">
          {
            !selected && ListAndSearch()
          }
        </div>
      </Slide>
      <Slide
        when={selected}
        collapse
        right
        delay={10}
        duration={300}
      >
        <div className='details'>
          {
            selected && <Details data={_.find(data, { 'ID': selected })} setSelected={setSelected} />
          }
        </div>
      </Slide>
    </div>
  );
}

export default App;
