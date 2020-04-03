/* React */
import React, { Fragment, useContext } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  __RouterContext
} from "react-router-dom";

import { useTransition, animated } from "react-spring";
import AbsoluteWrapper from './Components/AbsoluteWrapper';

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

  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate(100%, 0)" },
    enter: { opacity: 1, transform: "translate(0%, 0)" },
    leave: { opacity: 0, transform: "translate(-50%, 0)" }
  });

  return (
    <Fragment>
      <DataProvider history={history}>
        {
          transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={props}>
              <Switch location={item}>
                <Route exact path="/durango/app/home" component={Home} />
                <Route exact path="/durango/app/:id" component={Details} />
                <Route exact path="/durango/app/:id/more" component={MoreDetails} />
                <Route exact path="/durango/app/:id/reserve" component={Reserve} />
              </Switch>
            </animated.div >
          ))}
      </DataProvider >
    </Fragment>

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
        <Route path="/durango/inputPanel/:id?" component={Restaurant} />
      </Switch>
    </Router>
  )
}

export default App;
