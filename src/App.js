/* React */
import React, { Fragment, useContext } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  __RouterContext
} from "react-router-dom";

import Fade from 'react-reveal/Fade';

import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

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

  /*  return (
     <Route
       render={() => {
         const { pathname } = location;
         return (
           <DataProvider history={history}>
             <TransitionGroup>
               <CSSTransition
                 key={pathname}
                 classNames="page"
                 timeout={{
                   enter: 1000,
                   exit: 1000,
                 }}
               >
                 <Route
                   location={location}
                   render={() => (
                     <Switch>
                       <Route key={1} exact path="/durango/app/home" component={Home} />
                       <Route key={2} exact path="/durango/app/:id" component={Details} />
                       <Route key={3} exact path="/durango/app/:id/more" component={MoreDetails} />
                       <Route key={4} exact path="/durango/app/:id/reserve" component={Reserve} />
                     </Switch>
                   )}
                 />
               </CSSTransition>
             </TransitionGroup>
           </DataProvider>
         );
       }}
     />
   ) */

  return (
    <Fragment>
      <DataProvider history={history}>
        <Switch location={location}>
          <Route key={1} exact path="/durango/app/home" component={Home} />
          <Route key={2} exact path="/durango/app/:id" component={Details} />
          <Route key={3} exact path="/durango/app/:id/more" component={MoreDetails} />
          <Route key={4} exact path="/durango/app/:id/reserve" component={Reserve} />
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
