import React, { useEffect, useState } from 'react';

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

const ObjectLogin = ({ history }) => {

    const [title, setTitle] = useState("");
    const [key, setKey] = useState("");
    const [id, setId] = useState(null);

    useEffect(() => {

    }, []);

    return (
        <div className="IP-Login">
            <div className="IP-LoginForm">
                <img src={Logo} className="IP-Login-Logo" />
                {/* <p>Naziv objekta</p>
                <input className="IP-Login-Input" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <p>Key</p>
                <input className="IP-Login-Input" type="text" value={key} onChange={(e) => { setKey(e.target.value) }} /> */}
                <p>ID Objekta:</p>
                <input className="IP-Login-Input" type="number" value={id} onChange={(e) => { setId(e.target.value) }} />
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