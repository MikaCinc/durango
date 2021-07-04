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
    }, [setEmail]); // @todo zašto ovde stoji setEmail??

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
        }).then(({ error, data }) => {
            if (error) {
                return setErrorModalMessage(error);
            }

            const { place, token } = data;
            if (!place || !place.id || !token) {
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
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 4000,
                            },
                            "opacity": 0.8
                        },
                        "line_linked": {
                            "enable": true,
                            "opacity": 0.1,
                            // "color": themes[theme][3],
                        },
                        "move": {
                            "direction": "top",
                            "random": true,
                            "speed": 1,
                            "out_mode": "out"
                        },
                        "size": {
                            "value": 4,
                            "random": true,
                            "anim": {
                                "speed": 4,
                                "size_min": 0.3
                            }
                        },
                        "opacity": {
                            "anim": {
                                "enable": true,
                                "speed": 1,
                                "opacity_min": 0.2
                            }
                        },
                        /* "color": {
                          "value": themes[theme][3]
                        }, */
                        "shape": {
                            "type": ["circle"],
                        },
                    },
                    "retina_detect": true
                }}
            />
        </div>
    )
};

export default ObjectLogin;