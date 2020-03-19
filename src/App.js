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

/* Context */
import DataContext, { DataProvider } from './Context/dataContext';

const UserStackOfScreens = ({ history }) => {
  return (
    <DataProvider history={history}>
      <Switch>
        <Route exact path="/durango/app/home" component={Home} />
        <Route exact path="/durango/app/:id" component={Details} />
        <Route exact path="/durango/app/:id/more" component={MoreDetails} />
        <Route exact path="/durango/app/:id/reserve" component={Reserve} />
      </Switch>
    </DataProvider>
  );
}

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/durango/app-login" component={Login} />
        <Route exact path="/durango/" component={Login} />
        <Route path="/durango/app" component={UserStackOfScreens} />
        <Route exact path="/durango/restaurant" component={Restaurant} />
      </Switch>
    </Router>
  )
}

export default App;
