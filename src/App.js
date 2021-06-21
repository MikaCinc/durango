/* React */
import React, { Fragment, useEffect, useState } from 'react';
// import './Styles/App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

/* Components */
import { Modal } from 'react-bootstrap';

/* Modal slika */
import Img from './CustomIcons/downloadModal.png';

/* Libraries */
import 'moment/locale/sr';
import moment from 'moment';
import ReactGA from 'react-ga';
import { getGAid } from './library/common';

/* Pages / Screens */
import Login from './Screens/LoginScreen';
import Home from './Screens/Home';
import Settings from './Screens/Settings';
import ObjectLogin from './Screens/Object/ObjectLogin';

/* Stacks */
import ObjectProfileStackOfScreens from './Stacks/ObjectProfileStackOfScreens';
import InputPanelStackOfScreens from './Stacks/InputPanelStackOfScreens';

/* Context */
import { DataProvider } from './Context/dataContext';
import { ObjectProvider } from './Context/objectContext';
import Wizard from './Screens/Wizard';

let deferredPrompt;

const UserStackOfScreens = ({ history }) => {
  const [showInstallModal, setShowInstallModal] = useState(false);
  const { location } = history;

  useEffect(() => {
    const handleInstall = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      if (!sessionStorage.getItem('installAccepted')) { // Don't display double Modal if already accepted
        setShowInstallModal(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handleInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstall)
    };
  }, [])

  useEffect(() => {
    document.querySelector('#manifest-placeholder').setAttribute('href', `${process.env.PUBLIC_URL}/manifest.json`);
  });

  const installAccepted = () => {
    // Hide the app provided install promotion
    setShowInstallModal(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        sessionStorage.setItem('installAccepted', true);
        console.log('User accepted the install prompt');
      } else {
        deferredPrompt = null;
        console.log('User dismissed the install prompt');
      }
    });
  }

  return (
    <Fragment>
      <DataProvider history={history}>
        <Switch location={location}>
          <Route key={1} exact path="/app" render={() => (<Redirect to="/app/home" />)} />
          <Route key={2} exact path="/app/wizard" component={Wizard} />
          <Route key={3} exact path="/app/login" component={Login} />
          <Route key={4} exact path="/app/home" component={Home} />
          <Route key={5} exact path="/app/settings" component={Settings} />
          <Route key={6} path="/app/:id" render={() => <ObjectProfileStackOfScreens history={history} />} />
        </Switch>
        <InstallModal
          show={showInstallModal}
          onHide={() => setShowInstallModal(false)}
          onAccept={installAccepted}
        />
      </DataProvider>
    </Fragment>

  );
}

const InstallModal = ({ show, onHide, onAccept }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Body>
        <div className="modalContainer">
          <img src={Img} style={{ width: '125px' }} alt="icon" />
          <h6 className="boldText">Durango je bolji ukoliko je instaliran</h6>
          <p>Imaćete brži pristup i brže učitavanje aplikacije</p>
          <button
            className="detailsRow clickableRow w-50"
            onClick={() => {
              onAccept()
            }}
          >
            <h1 className="detailRowText boldText">INSTALIRAJ</h1>
          </button>
          {/*           <button
            className="detailsRow clickableRowCancel w-50"
            onClick={() => {
              onHide();
            }}
          >
            <h1 className="detailRowText boldText">Ne sada</h1>
          </button> */}
        </div>
      </Modal.Body>
    </Modal>
  )
}

const ObjectStackOfScreens = ({ history }) => {
  const { location } = history;

  useEffect(() => {
    document.querySelector('#manifest-placeholder').setAttribute('href', `${process.env.PUBLIC_URL}/manifestIP.json`);

    ReactGA.event({
      category: 'InputPanel',
      action: 'Version',
      label: '1.1',
    });
  });

  return (
    <Fragment>
      <ObjectProvider history={history}>
        <Switch location={location}>
          <Route
            exact path="/inputPanel/login"
            render={({ match }) => <ObjectLogin history={history} match={match} />}
          />
          <Route
            exact path="/inputPanel"
            render={({ match }) => <ObjectLogin history={history} match={match} />}
          />
          <Route
            path="/inputPanel/:id"
            render={({ match }) => <InputPanelStackOfScreens history={history} match={match} />}
          />
        </Switch>
      </ObjectProvider>
    </Fragment>
  );
}

const App = (props) => {
  moment.locale('sr');

  ReactGA.initialize(getGAid());

  /* const history = createBrowserHistory();

  // Initialize google analytics page view tracking
  history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  }); */

  useEffect(() => {
    const handleAppInstalledGAEvent = (e) => {
      console.log('INSTALL: Success');
      // setShowInstallModal(false);
      ReactGA.event({
        category: 'Application',
        action: 'Installed',
        label: 'Success when installing PWA',
      });
    };
    window.addEventListener('appinstalled', handleAppInstalledGAEvent);

    window.addEventListener('DOMContentLoaded', () => {
      let displayMode = 'browser tab';
      if (navigator.standalone) {
        displayMode = 'standalone-ios';
      }
      if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
      }
      // Log launch display mode to analytics
      console.log('DISPLAY_MODE_LAUNCH:', displayMode);
      ReactGA.event({
        category: 'Application',
        action: 'displayMode',
        label: displayMode,
      });
    });

    return () => {
      // window.removeEventListener('beforeinstallprompt', handleInstall)
      window.removeEventListener('appinstalled', handleAppInstalledGAEvent)
    };
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app" />} />
        <Route path="/app" component={UserStackOfScreens} />
        <Route exact path="/ip" render={() => <Redirect to="/inputPanel" />} />
        <Route path="/inputPanel" component={ObjectStackOfScreens} />
        <Route render={() => (<Redirect to="/app/home" />)} />
      </Switch>
    </Router>
  )
}

export default App;