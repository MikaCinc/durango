/* React */
import React, { useState, useEffect, Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

/* Pages / Screens */
import Login from './Screens/LoginScreen';
import Home from './Screens/Home';
import Details from './Screens/Details';
import Restaurant from './Screens/Restaurant';
import MoreDetails from './Screens/MoreDetails';

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/durango/" component={Login} />
        <Route exact path="/durango/login" component={Login} />
        <Route exact path="/durango/home" component={Home} />
        <Route exact path="/durango/:id" component={Details} />
        <Route exact path="/durango/:id/more" component={MoreDetails} />
        <Route exact path="/durango/restaurant" component={Restaurant} />
        {/* <Route exact path="durango/:id/reserve" component={MoreDetails} /> */}
      </Switch>
    </Router>
  )
}

export default App;
