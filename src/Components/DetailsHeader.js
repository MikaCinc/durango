import React, {
    useEffect,
    useState,
    useContext
} from 'react';

/* Logo */
import Logo from '../ExtendedLogo/LogoBetaV3.png';

/* Icons */
import BackArrow from '../icons/backArrow.svg';
import GearBlue from '../icons/gearBlue.svg';
import defaultAvatar from '../CustomIcons/defaultAvatar.png';

/* Context */
import DataContext from '../Context/dataContext';

const DetailsHeader = (props) => {
    const { User } = useContext(DataContext);
    const [isSticky, setSticky] = useState(false);

    const handleScroll = () => {
        setSticky(window.pageYOffset !== 0);
    };

    useEffect(() => {
        //@todo animate on scroll
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getAvatarSrc = () => {
        let accessToken = localStorage.getItem('userAccessToken');
        if (!User || !accessToken || !User.imageUrl) {
            return defaultAvatar;
        }

        return User.imageUrl;
    }

    return (
        <div className={`detailsHeader ${isSticky ? 'acrylic' : ''}`}>
            <div
                className="goBack"
                onClick={() => {
                    props.history.push(props.back);
                }}
            >
                <img src={BackArrow} className="svgIconBigger" alt="icon" />
            </div>
            <img src={Logo} className={`detailsDurangoLogo`} alt="logo" />
            {
                props.showAvatar && <div
                    className="clickable"
                    onClick={() => { props.history.push('/app/settings') }}
                >
                    <img src={getAvatarSrc()} className="avatar" alt="icon" />
                    <img src={GearBlue} className="avatarGearsSecondPosition" alt="icon" />
                </div>
            }
        </div>
    )
}

export default DetailsHeader;