import React, { useEffect, useState, useContext } from 'react';

/* Libraries */
import { getApiUrl } from '../../library/common';
import Particles from 'react-particles-js';

/* Data */
import Logo from '../../ExtendedLogo/Logo.png';

/* Context */
import ObjectContext from '../../Context/objectContext';

const ObjectLogin = ({ history }) => {
    const { setLoading, setAuthorized, email, setEmail, setData, startRefreshInterval, setErrorModalMessage } = useContext(ObjectContext);
    const [password, setPassword] = useState("");

    useEffect(() => {
        // @todo ako uđe na login a već je ulogovan
        let localEmail = localStorage.getItem('durangoEmail');
        let localPassword = localStorage.getItem('durangoPassword');
        if (localEmail) {
            setEmail(localEmail);
        }
        if (localPassword) {
            setPassword(localPassword);
        }
    }, [setEmail]);

    const loginObject = (e) => {
        e.preventDefault();
        if (!email || !password) return;

        let cred = {
            email,
            password
        };

        fetch(getApiUrl() + '/places/login', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(cred)
        }).then((response) => {
            return response.json();
        }).then(({ data: { place, token } }) => {
            if(!place || !place.id || !token) {
                setErrorModalMessage('Uneli ste pogrešan email ili password');
                return;
            }
            if (place.id && token.accessToken) {
                setData(place);
                // setAccessToken(token.accessToken);
                // setRefreshToken(token.refreshToken);
                localStorage.setItem('durangoAccessToken', token.accessToken);
                localStorage.setItem('durangoRefreshToken', token.refreshToken);
                localStorage.setItem('durangoEmail', email);
                localStorage.setItem('durangoPassword', password);

                setAuthorized(true);
                setLoading(false);

                startRefreshInterval();
                history.push('/inputPanel/' + place.id);
            }
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    }

    return (
        <div className="IP-Login">
            <form className="IP-LoginForm" onSubmit={loginObject}>
                <img src={Logo} className="IP-Login-Logo" alt="logo" />
                <p>Email:</p>
                <input className="IP-Login-Input" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <p>Password:</p>
                <input className="IP-Login-Input" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <button
                    className="detailsRow clickableRow w-75"
                    type="submit"
                    style={{
                        marginTop: '10px',
                        marginBottom: '0px',
                    }}
                >
                    <h1 className="detailRowText boldText">Uloguj se</h1>
                </button>
            </form>
            <Particles
                canvasClassName="IP-Login-Particles"
                params={{
                    particles: {
                        number: {
                            value: 100,
                            density: {
                                enable: true,
                                value_area: 1000,
                            }
                        },
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: "repulse"
                            }
                        }
                    }
                }}
            />
        </div>
    )
};

export default ObjectLogin;