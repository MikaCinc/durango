import React, { useEffect, useState, useContext } from 'react';

/* Libraries */
import moment from 'moment';
import _ from 'lodash';
import { isOpen } from '../../library/common';

/* Components */
import TimePicker from 'react-time-picker';
import ImageUploader from 'react-images-upload';

/* Animations */
import Zoom from 'react-reveal/Zoom';

/* Default Logo */
import defaultLogo from '../../CustomIcons/defaultLogo.png';

/* Router */
import { useParams } from "react-router-dom";

/* Context */
import ObjectContext, { ObjectProvider } from '../../Context/objectContext';

const daysOfTheWeek = [
    'Ponedeljak',
    'Utorak',
    'Sreda',
    'Četvrtak',
    'Petak',
    'Subota',
    'Nedelja'
];

const ObjectSettings = ({ history, dataFromStack }) => {
    const [data, setData] = useState({ ...dataFromStack });

    const [title, setTitle] = useState('');
    const [totalSpots, setTotalSpots] = useState(1);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [music, setMusic] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [workingHours, setWorkingHours] = useState([]);

    useEffect(() => {
        if (!data || !data.id) return;

        const { title, totalSpots, details: { location, address, phoneNumber, music, description, workingHours } } = data;

        setTitle(title);
        setTotalSpots(totalSpots);
        setDescription(description);
        setLocation(location);
        setMusic(music);
        setAddress(address);
        setPhoneNumber(phoneNumber);
        setWorkingHours([...workingHours]);

    }, [data]);

    const onLogoDrop = (pictureFiles, pictureDataURLs) => {
        console.log(pictureFiles, pictureDataURLs)
    };

    return (
        <div className="IP-Container">
            {
                data.id && <div className="container">
                    <div className="IP-Settings-Form">
                        <div className="IP-Settings-Block">
                            <p className="boldText">Naziv</p>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Promeni šifru</p>
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Zatvori objekat</p>
                            <p>PAŽNJA! Ukoliko manuelno zatvorite objekat klikom na ovo dugme,
                            naš algoritam će ignorisati radno vreme i Vaš objekat će uvek korisnicima biti prikazan kao zatvoren,
                                sve dok ga ponovo ne otvorite manuelno klikom na isto ovo dugme</p>
                            <button
                                className="IP-Settings-Close-Object"
                            >
                                Zatvori
                            </button>
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Logo</p>
                            <img
                                style={{
                                    width: 100,
                                    height: 'auto',
                                }}
                                src={
                                    data.logo
                                        ? `${process.env.PUBLIC_URL}/slike/mockLogos/${data.logo}`
                                        : defaultLogo
                                }
                            />
                            <ImageUploader
                                withIcon={true}
                                singleImage={true}
                                defaultImage={
                                    data.logo
                                        ? `${process.env.PUBLIC_URL}/slike/mockLogos/${data.logo}`
                                        : defaultLogo
                                }
                                buttonText='Izaberi logo'
                                onChange={onLogoDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                            />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Ukupan broj mesta</p>
                            <input type="number" value={totalSpots} onChange={(e) => setTotalSpots(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Adresa</p>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Telefon</p>
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Tip muzike</p>
                            <input type="text" value={music} onChange={(e) => setMusic(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Google Maps lokacija</p>
                            <textarea className="IP-Settings-TextArea" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Opis</p>
                            <textarea
                                className="IP-Settings-TextArea"
                                type="text"
                                value={description}
                                onChange={
                                    (e) => {
                                        let value = e.target.value;
                                        if (value.length < description.length) {
                                            setDescription(value);
                                        }
                                        else if (value.length > 150) return;
                                        setDescription(value);
                                    }
                                }
                            />
                            <p
                                style={{
                                    marginBottom: '0px',
                                    marginTop: '5px',
                                }}
                            >
                                {description.length} / 150
                            </p>
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Radno vreme</p>
                            {
                                data.details.workingHours.map((item, index) => {
                                    let opening = item.split(' - ')[0];
                                    let closing = item.split(' - ')[1];
                                    return (
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                            }}
                                            key={index}
                                        >
                                            <p
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '0px',
                                                    marginTop: '10px',
                                                }}
                                            >
                                                {daysOfTheWeek[index]}
                                            </p>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <TimePicker
                                                    onChange={(value) => {
                                                        setWorkingHours([
                                                            ...workingHours.map((i, n) => {
                                                                if (n === index) {
                                                                    return `${value} - ${closing}`;
                                                                }

                                                                return i;
                                                            })
                                                        ])
                                                    }}
                                                    format={'HH:mm'}
                                                    // minTime={moment().toDate()}
                                                    value={opening}
                                                    disableClock={true}
                                                    isOpen={false}
                                                    clockIcon={
                                                        <i className="material-icons reserveClockIcon">
                                                            access_time
                                                    </i>
                                                    }
                                                    className="reserveTime"
                                                />
                                                <p
                                                    style={{
                                                        margin: '10px'
                                                    }}
                                                >-</p>
                                                <TimePicker
                                                    onChange={(value) => {
                                                        setWorkingHours([
                                                            ...workingHours.map((i, n) => {
                                                                if (n === index) {
                                                                    return `${opening} - ${value}`;
                                                                }

                                                                return i;
                                                            })
                                                        ])
                                                    }}
                                                    format={'HH:mm'}
                                                    // minTime={moment().toDate()}
                                                    value={closing}
                                                    disableClock={true}
                                                    isOpen={false}
                                                    clockIcon={
                                                        <i className="material-icons reserveClockIcon">
                                                            access_time
                                                    </i>
                                                    }
                                                    className="reserveTime"
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            <Zoom bottom>
                <button
                    className="IP-input-imaMesta IP-clickable"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px'
                    }}
                    onClick={() => {
                        // API Call
                    }}
                >
                    Sačuvaj
                </button>
            </Zoom>
        </div>
    )
};

export default ObjectSettings;