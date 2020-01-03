import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import { Fade, Zoom } from 'react-reveal';

/* Logo */
import Logo from '../Logo.png';

const LoginScreen = props => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [profileName, setProfileName] = useState('');

    const responseGoogleSuccess = (response) => {
        // console.log(response)
        setIsSuccess(true);
        setProfileImage(response.profileObj.imageUrl)
        setProfileName(response.profileObj.name)
        setTimeout(() => {
            props.setAuthorized(true);
        }, 2000)
    }

    const responseGoogleFailure = (response) => {
        // console.log(response)
        alert('Something is wrong with Google login')
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
        <p className="loginParagraph">Pogledajte tačan broj slobodnih mesta u vašem omiljenom kafiću ili restoranu i rezervišite mesto za posebne prilike</p>
        <Zoom
            when={isSuccess}
            bottom
            duration={1000}
        >
            <div>
                <img
                    className="loginProfileImageLoaded"
                    src={profileImage}
                />
                <p className="loginParagraph">{profileName}</p>
            </div>
        </Zoom>
        <GoogleLogin
            clientId="873302302315-rlkjr1k6vmguo4t0ovhgmf0qjltilai5.apps.googleusercontent.com"
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
    </div>;
};

LoginScreen.propTypes = {};

export default LoginScreen;