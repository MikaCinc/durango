/* React */
import React, { Fragment, useContext } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
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
import Restaurant from './Screens/Restaurant';

/* Stacks */
import ObjectProfileStackOfScreens from './Stacks/ObjectProfileStackOfScreens';

/* Context */
import DataContext, { DataProvider } from './Context/dataContext';

const UserStackOfScreens = ({ history }) => {
  const { location } = useContext(__RouterContext);

  return (
    <Fragment>
      <DataProvider history={history}>
        <Switch location={location}>
          <Route key={1} exact path="/durango/app/home" component={Home} />
          <Route path="/durango/app/:id" render={() => <ObjectProfileStackOfScreens history={history}/>} />
        </Switch>
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