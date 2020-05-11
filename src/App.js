/* React */
import React, { Fragment, useContext } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  __RouterContext,
  useParams
} from "react-router-dom";

/* Animations */
import Fade from 'react-reveal/Fade';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

/* Components */
import Claps from './Components/Claps';

/* Pages / Screens */
import Login from './Screens/LoginScreen';
import Home from './Screens/Home';
// Object
import Restaurant from './Screens/Object/index';
import ObjectSettings from './Screens/Object/ObjectSettings';
import ObjectLogin from './Screens/Object/ObjectLogin';

/* Stacks */
import ObjectProfileStackOfScreens from './Stacks/ObjectProfileStackOfScreens';

/* Context */
import DataContext, { DataProvider } from './Context/dataContext';
import ObjectContext, { ObjectProvider } from './Context/objectContext';

const UserStackOfScreens = ({ history }) => {
  const { location } = useContext(__RouterContext);

  return (
    <Fragment>
      <DataProvider history={history}>
        <Switch location={location}>
          <Route key={1} exact path="/durango/app" render={() => (<Redirect to="/durango/app/home" />)} />
          <Route key={2} exact path="/durango/app/home" component={Home} />
          <Route key={3} path="/durango/app/:id" render={() => <ObjectProfileStackOfScreens history={history} />} />
        </Switch>
      </DataProvider >
    </Fragment>

  );
}

const ObjectStackOfScreens = ({ history }) => {
  const { location } = useContext(__RouterContext);

  return (
    <Fragment>
      <ObjectProvider history={history}>
        <Switch location={location}>
          <Route exact path="/durango/inputPanel" component={ObjectLogin} />
          <Route exact path="/durango/inputPanel/login" component={ObjectLogin} />
          <Route exact path="/durango/inputPanel/:id" component={Restaurant} />
          <Route exact path="/durango/inputPanel/:id/settings" component={ObjectSettings} />
        </Switch>
      </ObjectProvider>
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
        <Route path="/durango/inputPanel" component={ObjectStackOfScreens} />
      </Switch>
    </Router>
  )
}

export default App;