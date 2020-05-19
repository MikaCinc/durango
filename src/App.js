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

/* Libraries */
import 'moment/locale/sr';
import moment from 'moment';

/* Animations */
import Fade from 'react-reveal/Fade';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

/* Pages / Screens */
import Login from './Screens/LoginScreen';
import Home from './Screens/Home';
import Settings from './Screens/Settings';
import ObjectLogin from './Screens/Object/ObjectLogin';

/* Stacks */
import ObjectProfileStackOfScreens from './Stacks/ObjectProfileStackOfScreens';
import InputPanelStackOfScreens from './Stacks/InputPanelStackOfScreens';

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
          <Route key={3} exact path="/durango/app/settings" component={Settings} />
          <Route key={4} path="/durango/app/:id" render={() => <ObjectProfileStackOfScreens history={history} />} />
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
          <Route
            exact path="/durango/inputPanel/login"
            render={({ match }) => <ObjectLogin history={history} match={match} />}
          />
          <Route
            exact path="/durango/inputPanel"
            render={({ match }) => <ObjectLogin history={history} match={match} />}
          />
          <Route
            path="/durango/inputPanel/:id"
            render={({ match }) => <InputPanelStackOfScreens history={history} match={match} />}
          />
        </Switch>
      </ObjectProvider>
    </Fragment>

  );
}

const App = (props) => {
  moment.locale('sr');

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