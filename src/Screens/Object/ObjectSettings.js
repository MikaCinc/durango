import React, { useEffect, useState, useContext } from 'react';

/* Icons */
import BackArrow from '../../icons/backArrow.svg';

/* Libraries */
import moment from 'moment';
import _ from 'lodash';
import { isOpen } from '../../library/common';

/* Router */
import { useParams } from "react-router-dom";

/* Default Logo */
import defaultLogo from '../../CustomIcons/defaultLogo.png';

/* Data */
import Logo from '../../ExtendedLogo/Logo.png';
import kafici from '../../data/kafici';

/* Context */
import ObjectContext, { ObjectProvider } from '../../Context/objectContext';

const ObjectSettings = ({ history }) => {
    const { id } = useParams();

    const { Data, loading } = useContext(ObjectContext);
    const [data, setData] = useState({});

    const [title, setTitle] = useState('');
    const [totalSpots, setTotalSpots] = useState(1);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [music, setMusic] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (!Data || !Data.length) return;

        let findData;

        if (id) {
            findData = { ..._.find(Data, { 'id': parseInt(id, 10) }) };
        }

        if (findData.id) {
            setData(findData);
        } else {
            history.push('/durango/inputPanel/login');
        }

    }, [Data]);

    useEffect(() => {
        if (!data || !data.id) return;

        const { title, totalSpots, details: { location, address, phoneNumber, music, description } } = data;

        setTitle(title);
        setTotalSpots(totalSpots);
        setDescription(description);
        setLocation(location);
        setMusic(music);
        setAddress(address);
        setPhoneNumber(phoneNumber);

    }, [data]);

    return (
        <div className="IP-Container">
            {
                // data.id && <div className="detailsHeader">
                //     <div
                //         className="goBack"
                //         onClick={() => {
                //             history.push('/durango/inputPanel/' + data.id);
                //         }}
                //     >
                //         <img src={BackArrow} className="svgIconBigger" />
                //     </div>
                //     <img src={Logo} className="detailsDurangoLogo" />
                // </div>
            }
            {
                data.id && <div className="container">
                    <div className="IP-Settings-Form">
                        <div className="IP-Settings-Block">
                            <p>Naziv</p>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Ukupan broj mesta</p>
                            <input type="number" value={totalSpots} onChange={(e) => setTotalSpots(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Adresa</p>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Telefon</p>
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Tip muzike</p>
                            <input type="text" value={music} onChange={(e) => setMusic(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Google Maps lokacija</p>
                            <textarea type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Opis</p>
                            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <button
                                className="IP-input-imaMesta IP-clickable"
                                onClick={() => {
                                    // API Call
                                }}
                            >
                                Sačuvaj
                        </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default ObjectSettings;