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
import AbsoluteWrapper from './Components/AbsoluteWrapper';

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


  const routes = [
    { path: '/durango/inputPanel', Component: ObjectLogin },
    { path: '/durango/inputPanel/login', Component: ObjectLogin },
    { path: '/durango/inputPanel/:id', Component: Restaurant },
    { path: '/durango/inputPanel/:id/settings', Component: ObjectSettings },
  ]

  return (
    <Fragment>
      <ObjectProvider history={history}>
        <AbsoluteWrapper>
          <TransitionGroup>
            <CSSTransition
              in={true}
              timeout={300}
              classNames="page"
              unmountOnExit
              key={history.location.key} // Bez ovoga neće!
            >
              <Switch location={history.location}>
                {
                  routes.map(({ path, Component }) => (
                    <Route
                      key={path}
                      exact
                      path={path}
                      render={
                        ({ match }) => (
                          // <div className="page">
                            <Component history={history} />
                          // </div>
                        )
                      }
                    />
                  ))
                }
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </AbsoluteWrapper>
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