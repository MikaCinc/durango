import React, {
    useEffect,
    useState
} from 'react';

/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

/* Icons */
import BackArrow from '../icons/backArrow.svg';

/* Animations */
import RubberBand from 'react-reveal/RubberBand';

const DetailsHeader = (props) => {
    const [isSticky, setSticky] = useState(false);

    const handleScroll = () => {
        setSticky(window.pageYOffset !== 0);
    };

    useEffect(() => {
        //@todo animate on scroll
        /* window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }; */
    }, []);

    return (
        <div className={`detailsHeader ${isSticky ? ' stickyDetailsHeader' : ''}`}>
            <div
                className="goBack"
                onClick={() => {
                    props.history.push(props.back);
                }}
            >
                {/* <i className="material-icons">
                    arrow_back_ios
                </i> */}
                <img src={BackArrow} className="svgIconBigger" />
            </div>
            <img src={Logo} className={`detailsDurangoLogo ${isSticky ? ' stickyDurangoLogo' : ''}`} />
        </div>
    )
}

export default DetailsHeader;