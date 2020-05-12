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
    const [brojMesta, setBrojMesta] = useState(1);
    const [opis, setOpis] = useState('');
    const [lokacija, setLokacija] = useState('');
    const [adresa, setAdresa] = useState('');
    const [muzika, setMuzika] = useState('');
    const [brojTelefona, setBrojTelefona] = useState('');

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
        
        const { title, brojMesta, details: { lokacija, adresa, brojTelefona, muzika, opis } } = data;

        setTitle(title);
        setBrojMesta(brojMesta);
        setOpis(opis);
        setLokacija(lokacija);
        setMuzika(muzika);
        setAdresa(adresa);
        setBrojTelefona(brojTelefona);

    }, [data]);

    return (
        <div className="IP-Container">
            {
                data.id && <div className="detailsHeader">
                    <div
                        className="goBack"
                        onClick={() => {
                            history.push('/durango/inputPanel/' + data.id);
                        }}
                    >
                        <img src={BackArrow} className="svgIconBigger" />
                    </div>
                    <img src={Logo} className="detailsDurangoLogo" />
                </div>
            }
            {
                data.id && <div className="page container">
                    <div className="IP-Settings-Form">
                        <div className="IP-Settings-Block">
                            <p>Naziv</p>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Ukupan broj mesta</p>
                            <input type="number" value={brojMesta} onChange={(e) => setBrojMesta(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Adresa</p>
                            <input type="text" value={adresa} onChange={(e) => setAdresa(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Telefon</p>
                            <input type="text" value={brojTelefona} onChange={(e) => setBrojTelefona(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Tip muzike</p>
                            <input type="text" value={muzika} onChange={(e) => setMuzika(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Google Maps lokacija</p>
                            <textarea type="text" value={lokacija} onChange={(e) => setLokacija(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p>Opis</p>
                            <textarea type="text" value={opis} onChange={(e) => setOpis(e.target.value)} />
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