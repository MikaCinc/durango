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
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

/* Context */
import DataContext from '../../Context/dataContext';

const options = [
  { value: 'Niš', label: 'Niš' },
  { value: 'Leskovac', label: 'Leskovac', disabled: true },
  { value: 'Beograd', label: 'Beograd' }
];

const animatedComponents = makeAnimated();

const LocationStep = (props) => {
  const { loading, location, setLocation } = useContext(DataContext);

  const restOfPage = () => {
    return (
      <Fragment>
        <h5>Izaberite lokaciju</h5>
        <Select
          defaultValue={options.find(({ value }) => value === location)}
          options={options}
          components={animatedComponents}
          isSearchable
          className="reactSelect"
          onChange={({ value }) => setLocation(value)}
        // defaultValue={options[0]}
        />
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
          <h1 className="boldText">OK</h1>
        </button>
      </Fragment>
    )
  }

  return (
    !loading && restOfPage()
  );
}

export default LocationStep;
