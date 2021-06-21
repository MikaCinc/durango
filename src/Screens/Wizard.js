/* React */
import React, {
  useContext,
  Fragment,
  useState
} from 'react';

/* Libraries */
import _ from 'lodash';

/* Animations */
import Roll from 'react-reveal/Roll';
import Zoom from 'react-reveal/Zoom';

/* Icons */
import Instagram from '../icons/instagram.png';
import Info from '../icons/infoWhite.svg';
import Notification from '../icons/notificationWhite.svg';
import Logout from '../icons/logoutWhite.svg';
import Privacy from '../icons/privacyWhite.svg';
import Wrench from '../icons/wrenchWhite.svg';
import defaultAvatar from '../CustomIcons/defaultAvatar.png';
import incLogo from '../ExtendedLogo/incLogo.png';
import durangoLogo from '../ExtendedLogo/Logo.png';

/* Components */
import DetailsHeader from '../Components/DetailsHeader';

/* Context */
import DataContext from '../Context/dataContext';

/* Steps */
import LocationStep from '../Components/WizardSteps/Location';
import FinishStep from '../Components/WizardSteps/Finish';

const Wizard = (props) => {
  const { User, setUser, loading, location } = useContext(DataContext);
  const [step, setStep] = useState(0);

  const renderStep = () => {
    switch (step) {
      case 0: return <LocationStep
        submit={() => {
          if (location) setStep((last) => ++last);
        }}
      />;
      case 1: return <FinishStep
        submit={() => {
          props.history.push('/app/home');
        }}
      />;
      default: return <LocationStep />;
    }
  }

  const restOfPage = () => {
    return (
      <Fragment>
        <div className="wizardContainer">
          <div className="stepContainer acrylic">
            <img src={durangoLogo} className="durangoLogo" />
            {renderStep()}
          </div>

          <div className="circle"></div>
          <div className="circle2"></div>
        </div>
      </Fragment>
    )
  }

  return (
    !loading && restOfPage()
  );
}

export default Wizard;
