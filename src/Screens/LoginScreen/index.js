import React, {
    useState,
    useEffect,
    Fragment,
    useContext
} from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Fade, Zoom } from 'react-reveal';

/* Library */
import { getApiUrl } from '../../library/common';
import ReactGA from 'react-ga';

/* Logo */
import Logo from '../../ExtendedLogo/LogoBetaV3.png';

/* Context */
import DataContext from '../../Context/dataContext';

const LoginScreen = props => {
    const { User, setUser, startRefreshInterval, setErrorModalMessage } = useContext(DataContext);

    const [isSuccess, setIsSuccess] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [profileName, setProfileName] = useState('');

    useEffect(() => {
        let UserLoc = JSON.parse(localStorage.getItem('User'));
        let accessToken = localStorage.getItem('userAccessToken');
        let refreshToken = localStorage.getItem('userRefreshToken');

        if (!UserLoc || !accessToken || !refreshToken) {
            localStorage.removeItem('User');
            return;
        }

        if (UserLoc && UserLoc.id && accessToken) {
            setProfileImage(UserLoc.imageUrl);
            setProfileName(UserLoc.name);
            setIsSuccess(true);
            setTimeout(() => {
                if (props.history.length > 2) {
                    props.history.goBack();
                } else {
                    props.history.push('/app/home');
                }
            }, 1500);
        }

    }, []);

    const responseGoogleSuccess = (response) => {
        // console.log(response)
        ReactGA.event({
            category: 'Application',
            action: 'Login',
            label: 'Logged in with Google',
        });

        let obj = {
            ...User,
            id: response.profileObj.googleId,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl,
            name: response.profileObj.name,
        };

        fetch(getApiUrl() + '/users/login/google', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id_token: response.tokenId
            })
        }).then((response) => {
            return response.json();
        }).then(({ data }) => {
            console.log(data);

            let finalizedUserObject = {
                ...obj,
                ...data.user,
            };

            setUser(finalizedUserObject);

            localStorage.setItem('userAccessToken', data.token.accessToken);
            localStorage.setItem('userRefreshToken', data.token.refreshToken);
            localStorage.setItem('User', JSON.stringify(finalizedUserObject));

            // This shows only locally on Login screen
            setProfileImage(response.profileObj.imageUrl);
            setProfileName(response.profileObj.name);
            setIsSuccess(true);

            startRefreshInterval();

            setTimeout(() => {
                if (props.history.length > 2) {
                    props.history.goBack();
                } else {
                    props.history.push('/app/home');
                }
            }, 1500);
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    }

    const responseGoogleFailure = (response) => {
        // console.log(response)
        setErrorModalMessage('Something is wrong with Google login');
    }

    const responseFacebook = (response) => {
        // console.log(response)
        setIsSuccess(true);
        setProfileImage(response.picture.data.url)
        setProfileName(response.name)
        setTimeout(() => {
            // props.setAuthorized(true);
            props.history.push('/app/home')
        }, 2000)
    }

    return <div className="loginScreen">
        <Fade
            when={true}
            appear
            bottom
            delay={500}
            duration={1000}
        >
            <img className="loginLogo" src={Logo} alt="logo" />
        </Fade>
        <p className="loginParagraph">Najlakši način za pregled broja slobodnih mesta u kafiću ili restoranu!</p>
        <Zoom
            when={isSuccess}
            bottom
            duration={1000}
        >
            <div className="loginDetailsDiv">
                <img
                    className="loginProfileImageLoaded"
                    src={profileImage}
                    alt="your profile"
                />
                <p className="loginParagraph">{profileName}</p>
            </div>
        </Zoom>
        {
            !isSuccess && <Fragment>
                <GoogleLogin
                    // clientId="873302302315-mv8lh0772kbe55nvh687qpv8ddvlv9t0.apps.googleusercontent.com"
                    clientId="1013140890804-2t170dtn07vsb7usp9lklbto79r8j52v.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                        <div
                            className="google-btn"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <img
                                className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google logo"
                            />
                            <p className="google-text"><b>Sign in with Google</b></p>
                        </div>
                    )}
                />
                <FacebookLogin
                    appId="503529696932140"
                    autoLoad={false}
                    fields="name,email,picture"
                    authType="reauthenticate"
                    isDisabled={true} //@todo
                    tag={
                        renderProps => (
                            <div
                                className="facebook-btn"
                                onClick={renderProps.onClick}
                            >
                                <img
                                    className="facebook-icon"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/267px-F_icon.svg.png"
                                    alt="facebook logo"
                                />
                                <p className="facebook-text"><b>Sign in with Facebook</b></p>
                            </div>
                        )
                    }
                    callback={responseFacebook}
                    onFailure={() => {
                        console.log('Something is wrong with Facebook sign in')
                    }}
                />
            </Fragment>
        }
    </div>;
};

export default LoginScreen;