import React, {
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';

/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

/* Animations */
import RubberBand from 'react-reveal/RubberBand';

const DetailsHeader = (props) => {
    return (
        <div className="detailsHeader">
            <div
                className="goBack"
                onClick={() => {
                    props.history.push(props.back);
                }}
            >
                <i className="material-icons">
                    arrow_back_ios
                </i>
            </div>
            <img src={Logo} className="detailsDurangoLogo" />
        </div>
    )
}

export default DetailsHeader;