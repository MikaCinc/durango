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

const InstallProposalStep = (props) => {
  const { loading, location, setLocation } = useContext(DataContext);

  const restOfPage = () => {
    return (
      <Fragment>
        <h5>Durango je bolji ukoliko je instaliran</h5>
        <p>Imaćete brži pristup i brže učitavanje aplikacije</p>
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
          <h1 className="boldText">INSTALIRAJ</h1>
        </button>
        <button
          className="buttonCancel"
          onClick={() => {
            props.submit()
          }}
          style={{
            marginTop: "20px",
            marginBottom: "0px"
          }}
        >
          <h1 className="boldText">Možda kasnije</h1>
        </button>
      </Fragment>
    )
  }

  return (
    !loading && restOfPage()
  );
}

export default InstallProposalStep;
