/* React */
import React, { useState, useEffect, Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

/* Pages / Screens */
import Home from './Screens/Home';
import Details from './Screens/Details';
import Restaurant from './Screens/Restaurant';

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/view/:id" component={Details} /> */}
        <Route exact path="/restaurant" component={Restaurant} />
      </Switch>
    </Router>
  )
}

export default App;
