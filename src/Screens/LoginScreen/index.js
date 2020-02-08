import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Fade, Zoom } from 'react-reveal';

/* Logo */
import Logo from '../../ExtendedLogo/Logo.png';

const LoginScreen = props => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [profileName, setProfileName] = useState('');

    useEffect(() => {
        // localStorage.removeItem('User')
        let User = JSON.parse(localStorage.getItem('User'));

        if (User && User.id) {
            setIsSuccess(true);
            setProfileImage(User.imageUrl)
            setProfileName(User.name)
            setTimeout(() => {
                // props.setAuthorized(true);
                props.history.push('/durango/home')
            }, 2000)
        }

    }, []);

    const responseGoogleSuccess = (response) => {
        // console.log(response)
        setIsSuccess(true);
        setProfileImage(response.profileObj.imageUrl)
        setProfileName(response.profileObj.name)

        let obj = {
            id: response.profileObj.googleId,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl,
            name: response.profileObj.name
        };

        localStorage.setItem('User', JSON.stringify(obj));

        setTimeout(() => {
            // props.setAuthorized(true);
            props.history.push('/durango/home')
        }, 2000);
    }

    const responseGoogleFailure = (response) => {
        // console.log(response)
        alert('Something is wrong with Google login');
    }

    const responseFacebook = (response) => {
        // console.log(response)
        setIsSuccess(true);
        setProfileImage(response.picture.data.url)
        setProfileName(response.name)
        setTimeout(() => {
            // props.setAuthorized(true);
            props.history.push('/durango/home')
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
            <img className="loginLogo" src={Logo} />
        </Fade>
        <p className="loginParagraph">Pogledajte tačan broj slobodnih mesta u svom omiljenom kafiću ili restoranu i rezervišite mesto za posebne prilike!</p>
        <Zoom
            when={isSuccess}
            bottom
            duration={1000}
        >
            <div className="loginDetailsDiv">
                <img
                    className="loginProfileImageLoaded"
                    src={profileImage}
                />
                <p className="loginParagraph">{profileName}</p>
            </div>
        </Zoom>
        {
            !isSuccess && <Fragment>
                <GoogleLogin
                    clientId="873302302315-mv8lh0772kbe55nvh687qpv8ddvlv9t0.apps.googleusercontent.com"
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
                    tag={
                        renderProps => (
                            <div
                                className="facebook-btn"
                                onClick={renderProps.onClick}
                            >
                                <img
                                    className="facebook-icon"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/267px-F_icon.svg.png"
                                />
                                <p className="facebook-text"><b>Sign in with Facebook</b></p>
                            </div>
                        )
                    }
                    /* onClick={(nesto) => {
                        console.log('nesto', nesto)
                    }} */
                    callback={responseFacebook}
                    onFailure={() => {
                        console.log('Something is wrong with Facebook sign in')
                    }}
                />
            </Fragment>
        }
    </div>;
};

LoginScreen.propTypes = {};

export default LoginScreen;