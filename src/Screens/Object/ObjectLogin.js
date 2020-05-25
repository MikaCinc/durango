import React, { useEffect, useState, useContext } from 'react';

/* Libraries */
import moment from 'moment';
import _ from 'lodash';
import { isOpen } from '../../library/common';
import Particles from 'react-particles-js';

/* Router */
import { useParams } from "react-router-dom";

/* Default Logo */
import defaultLogo from '../../CustomIcons/defaultLogo.png';

/* Data */
import Logo from '../../ExtendedLogo/Logo.png';
import kafici from '../../data/kafici';

/* Context */
import ObjectContext, { ObjectProvider } from '../../Context/objectContext';

const ObjectLogin = ({ history }) => {

    const { setID, loading, Data } = useContext(ObjectContext);

    const [title, setTitle] = useState("");
    const [key, setKey] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const entering = () => {
        if (!id) return;

        let findData = { ..._.find(Data, { 'id': id }) };

        if (!findData.id) {
            alert("Nije pronađen objekat sa ovim ID-em");
        } else {
            history.replace(`/durango/inputPanel/${findData.id}`);
        }
    }

    const loginObject = () => {
        if(!email || !password) return;

        let cred = {
            email,
            password
        }

        fetch('http://durango.devffwd.nl:3000/api/places/login', {
            method: 'post',
            body: JSON.stringify(cred)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
        });
    }

    return (
        <div className="IP-Login">
            <div className="IP-LoginForm">
                <img src={Logo} className="IP-Login-Logo" />
                {/* <p>Naziv objekta</p>
                <input className="IP-Login-Input" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <p>Key</p>
                <input className="IP-Login-Input" type="text" value={key} onChange={(e) => { setKey(e.target.value) }} /> */}
                <p>Email:</p>
                <input className="IP-Login-Input" type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <p>Password:</p>
                <input className="IP-Login-Input" type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <button
                    className="IP-input-imaMesta IP-clickable"
                    onClick={() => {
                        // history.push('/durango/inputPanel/' + id);
                        entering();
                    }}
                >
                    Udji
                </button>
            </div>
            <Particles
                canvasClassName="IP-Login-Particles"
                params={{
                    particles: {
                        number: {
                            value: 200,
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