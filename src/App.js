/* React */
import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

/* Pages / Screens */
import Login from './Screens/LoginScreen';
import Home from './Screens/Home';
import Details from './Screens/Details';
import Restaurant from './Screens/Restaurant';
import MoreDetails from './Screens/MoreDetails';
import Reserve from './Screens/Reserve';

const App = (props) => {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/durango/" component={Login} />
          <Route exact path="/durango/login" component={Login} />
          <Route exact path="/durango/home" component={Home} />
          <Route exact path="/durango/:id" component={Details} />
          <Route exact path="/durango/:id/more" component={MoreDetails} />
          <Route exact path="/durango/:id/reserve" component={Reserve} />
          <Route exact path="/durango/restaurant" component={Restaurant} />
        </Switch>
      </Router>
  )
}

export default App;
