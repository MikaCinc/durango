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

/* Components */

/* Context */
import DataContext from '../../Context/dataContext';

const options = [
  { value: 'Niš', label: 'Niš' },
  { value: 'Leskovac', label: 'Leskovac' },
  { value: 'Beograd', label: 'Beograd' }
];

const FinishStep = (props) => {
  const { loading, location, setLocation } = useContext(DataContext);

  const restOfPage = () => {
    return (
      <Fragment>
        <h5>Sve je spremno!</h5>
        <button
          className="buttonConfirm"
          onClick={() => {
            props.submit()
          }}
          style={{
            marginTop: "20px",
            marginBottom: "0px"
          }}
        >
          <h1 className="boldText">Uroni</h1>
        </button>
      </Fragment>
    )
  }

  return (
    !loading && restOfPage()
  );
}

export default FinishStep;
