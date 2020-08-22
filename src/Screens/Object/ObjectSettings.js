import React, { useEffect, useState, useContext } from 'react';

/* Libraries */
import { getApiUrl } from '../../library/common';

/* Components */
import TimePicker from 'react-time-picker';
import ImageUploader from 'react-images-upload';

/* Animations */
import Zoom from 'react-reveal/Zoom';

/* Default Logo */
import defaultLogo from '../../CustomIcons/defaultLogo.png';

/* Context */
import ObjectContext from '../../Context/objectContext';

const daysOfTheWeek = [
    'Ponedeljak',
    'Utorak',
    'Sreda',
    'Četvrtak',
    'Petak',
    'Subota',
    'Nedelja'
];

const ObjectSettings = ({ history }) => {
    const { data, setData, setErrorModalMessage, setSuccessModalMessage, refreshTokenFunction } = useContext(ObjectContext);

    const [title, setTitle] = useState('');
    const [totalSpots, setTotalSpots] = useState(50);
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [music, setMusic] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [workingHours, setWorkingHours] = useState([]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        if (!data || !data.id) return;

        const { title, totalSpots, email, details: { location, address, phoneNumber, music, description, workingHours } } = data;

        setTitle(title);
        setTotalSpots(totalSpots);
        setDescription(description);
        setEmail(email);
        setLocation(location);
        setMusic(music);
        setAddress(address);
        setPhoneNumber(phoneNumber);
        setWorkingHours([...workingHours]);

    }, [data]);

    const validateEmail = (input) => {
        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(input)) {
            // this is a valid email address
            return true;
        }
        else {
            return false;
        }
    }

    const patchOnServer = () => {
        let obj;

        if (!validateEmail(email)) {
            setErrorModalMessage('Upišite ispravnu email adresu');
            return;
        }

        if (!totalSpots || totalSpots < 1 || !Number.isInteger(totalSpots)) {
            setErrorModalMessage('Ukupan broj mesta ne sme biti prazan i manji od 0 i mora biti ceo broj');
            return;
        }

        obj = {
            totalSpots,
            details: {
                description,
                address,
                music,
                location,
                phoneNumber,
                workingHours
            }
        };

        if (title !== data.title) {
            obj = {
                ...obj,
                title
            }
        }

        if (email !== data.email) {
            obj = {
                ...obj,
                email
            }
        }

        let accessToken = localStorage.getItem('durangoAccessToken');
        if (!accessToken) {
            history.push('/inputPanel/login');
        }

        fetch(getApiUrl() + '/places/' + data.id, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify({ ...obj })
        }).then(response => {
            return response.json();
        }).then(({ data, error, message }) => {
            if (error && data.tokenExpired) {
                refreshTokenFunction(patchOnServer);
                return;
            }

            if (error) {
                setErrorModalMessage(message);
                return;
            }

            localStorage.setItem('durangoEmail', data.email);
            setData({
                ...data
            });
            setSuccessModalMessage('Novi parametri za vaš objekat su uspešno sačuvani.');
        }).catch(({ message }) => {
            console.log('error', message);
            setErrorModalMessage(message);
        });
    }

    const manuallyCloseObject = () => {
        let flag = true;

        if (data.isManualyClosed) {
            flag = false;
        };

        let accessToken = localStorage.getItem('durangoAccessToken');
        if (!accessToken) {
            history.push('/inputPanel/login');
        }

        fetch(getApiUrl() + '/places/' + data.id, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify({ isManualyClosed: flag })
        }).then(response => {
            return response.json();
        }).then(({ data, error, message }) => {
            if (error && data.tokenExpired) {
                refreshTokenFunction(manuallyCloseObject);
                return;
            }

            if (error) {
                setErrorModalMessage(message);
                return;
            }

            setData({
                ...data
            });
        }).catch(({ message }) => {
            console.log('error', message);
        });
    }

    const renderOpenCloseButton = () => {
        let label = data.isManualyClosed ? 'Otvori' : 'Zatvori';
        let className = data.isManualyClosed ? 'IP-Settings-Open-Object' : 'IP-Settings-Close-Object';

        return (
            <button
                className={className}
                onClick={manuallyCloseObject}
            >
                {label}
            </button>
        )
    }

    const renderOpenCloseText = () => {
        let text = data.isManualyClosed
            ? 'Vaš objekat je trenutno manuelno zatvoren, klikom na dugme OTVORI svim korisnicima će biti prikazan kao otvoren u radnom vremenu'
            : 'Ukoliko manuelno zatvorite objekat klikom na ovo dugme, naš algoritam će ignorisati radno vreme i Vaš objekat će uvek korisnicima biti prikazan kao zatvoren, sve dok ga ponovo ne otvorite manuelno klikom na isto ovo dugme'

        return (
            <p>{text}</p>
        )
    }

    const changePassword = () => {
        let accessToken = localStorage.getItem('durangoAccessToken');
        if (!accessToken) {
            history.push('/inputPanel/login');
        }

        fetch(getApiUrl() + '/places/change-password', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }),
            body: JSON.stringify({
                id: data.id,
                oldPassword,
                newPassword
            })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if (response.error && response.data.tokenExpired) {
                refreshTokenFunction(changePassword);
                return;
            }

            if (response.error) {
                setErrorModalMessage(response.message);
                return;
            }

            localStorage.setItem('durangoPassword', newPassword);
            localStorage.setItem('durangoAccessToken', response.data.token.accessToken);
            localStorage.setItem('durangoRefreshToken', response.data.token.refreshToken);

            setNewPassword('');
            setOldPassword('');
            setSuccessModalMessage(response.message);
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    }

    const logout = () => {
        let accessToken = localStorage.getItem('durangoAccessToken');
        if (!accessToken) {
            history.push('/inputPanel/login');
        }

        fetch(getApiUrl() + '/places/logout', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }),
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if (response.error && response.data.tokenExpired) {
                refreshTokenFunction(logout);
                return;
            }

            if (response.error) {
                setErrorModalMessage(response.message);
                return;
            }

            localStorage.removeItem('durangoAccessToken');
            localStorage.removeItem('durangoRefreshToken');
            history.push('/inputPanel/login');
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    }

    const renderWorkingHours = () => {
        return (
            <div className="IP-Settings-Block">
                <p className="boldText">Radno vreme</p>
                {
                    workingHours.map((item, index) => {
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
                                <button
                                    style={{
                                        maxWidth: '250px',
                                        borderRadius: '6px',
                                        marginTop: '7px',
                                        marginBottom: '12px',
                                        backgroundColor: !item ? 'lightblue' : 'lightyellow'
                                    }}
                                    onClick={() => {
                                        setWorkingHours([
                                            ...workingHours.map((i, n) => {
                                                if (n === index) {
                                                    return !item ? '00:00 - 00:00' : '';
                                                }

                                                return i;
                                            })
                                        ])
                                    }}
                                >
                                    {
                                        !item ? 'Obeležite ovaj dan kao radni' : 'Obeležite ovaj dan kao neradni'
                                    }
                                </button>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TimePicker
                                        onChange={(value) => {
                                            if (!value) {
                                                value = '00:00'
                                            }
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
                                        disabled={!item}
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
                                            margin: '5px'
                                        }}
                                    >-</p>
                                    <TimePicker
                                        onChange={(value) => {
                                            if (!value) {
                                                value = '00:00'
                                            }
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
                                        disabled={!item}
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
        )
    }

    const onLogoDrop = (pictureFiles, pictureDataURLs) => {
        console.log(pictureFiles, pictureDataURLs)
        let accessToken = localStorage.getItem('durangoAccessToken');
        if (!accessToken) {
            history.push('/inputPanel/login');
        }

        if (!pictureDataURLs || !pictureDataURLs.length) {
            return;
        }

        let base64 = pictureDataURLs[0];

        fetch(getApiUrl() + '/places/upload-logo', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }),
            body: JSON.stringify({
                id: data.id,
                logo: base64
            })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if (response.error && response.data.tokenExpired) {
                refreshTokenFunction(onLogoDrop);
                return;
            }

            if (response.error) {
                setErrorModalMessage(response.message);
                return;
            }

            setData(response.data);

            setSuccessModalMessage(response.message);
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    };

    const deleteLogo = () => {
        let accessToken = localStorage.getItem('durangoAccessToken');
        if (!accessToken) {
            history.push('/inputPanel/login');
        }

        fetch(getApiUrl() + '/places/upload-logo', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }),
            body: JSON.stringify({
                id: data.id,
                logo: ''
            })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if (response.error && response.data.tokenExpired) {
                refreshTokenFunction(deleteLogo);
                return;
            }

            if (response.error) {
                setErrorModalMessage(response.message);
                return;
            }

            setData(response.data);

            setSuccessModalMessage(response.message);
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    };

    const onPictureDrop = (pictureFiles, pictureDataURLs) => {
        console.log(pictureFiles, pictureDataURLs)
        let accessToken = localStorage.getItem('durangoAccessToken');
        if (!accessToken) {
            history.push('/inputPanel/login');
        }

        /* if (!pictureDataURLs || !pictureDataURLs.length) {
            return;
        } */

        // let base64 = pictureDataURLs;

        fetch(getApiUrl() + '/places/upload-images', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }),
            body: JSON.stringify({
                id: data.id,
                details: {
                    images: [...pictureDataURLs]
                }
            })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if (response.error && response.data.tokenExpired) {
                refreshTokenFunction(onPictureDrop);
                return;
            }

            if (response.error) {
                setErrorModalMessage(response.message);
                return;
            }

            setData(response.data);

            setSuccessModalMessage(response.message);
        }).catch(({ message }) => {
            return setErrorModalMessage(message);
        });
    };

    return (
        <div className="IP-Container">
            {
                data.id && <div className="container">
                    <div className="IP-Settings-Form">
                        <div className="IP-Settings-Block">
                            <p className="boldText">Naziv</p>
                            <input className="IP-Settings-Input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Logo</p>
                            <img
                                style={{
                                    width: 100,
                                    height: 'auto',
                                    borderRadius: '50px'
                                }}
                                src={
                                    data.logo
                                        ? `${getApiUrl() + data.logo}`
                                        : defaultLogo
                                }
                            />
                            <ImageUploader
                                withIcon={true}
                                singleImage={true}
                                defaultImages={[
                                    data.logo
                                        ? `${getApiUrl() + data.logo}`
                                        : defaultLogo
                                ]}
                                label={'Maksimalna veličina fajla - 2MB. Preporučujemo kvadratne slike zbog estetike.'}
                                labelStyles={{
                                    textAlign: 'center'
                                }}
                                buttonText='Izaberite logo'
                                onChange={onLogoDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                fileSizeError={'Veličina vaše slike je prevelika'}
                                fileTypeError={'Trenutno ne podržavamo slike u ovom formatu, pokušajte neki drugi'}
                            />
                            <button
                                className="IP-input-nemaMesta IP-clickable"
                                onClick={() => deleteLogo()}
                            >
                                Izbrišite logo
                            </button>
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Slike objekta</p>
                            <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                defaultImages={[
                                    ...data.details.images.map((p) => `${getApiUrl() + p}`)
                                ]}
                                label={'Maksimalna veličina fajla - 2MB. Preporučujemo format 4:3 zbog estetike.'}
                                labelStyles={{
                                    textAlign: 'center'
                                }}
                                buttonText='Izaberite novu sliku'
                                onChange={onPictureDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                fileSizeError={'Veličina vaše slike je prevelika'}
                                fileTypeError={'Trenutno ne podržavamo slike u ovom formatu, pokušajte neki drugi'}
                            />
                            {/* <button
                                className="IP-input-nemaMesta IP-clickable"
                                onClick={() => deleteLogo()}
                            >
                                Izbrišite logo
                            </button> */}
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Ukupan broj mesta</p>
                            <input className="IP-Settings-Input" type="number" value={totalSpots} onChange={(e) => setTotalSpots(parseInt(e.target.value))} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Adresa</p>
                            <input className="IP-Settings-Input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Telefon</p>
                            <input className="IP-Settings-Input" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Tip muzike</p>
                            <input className="IP-Settings-Input" type="text" value={music} onChange={(e) => setMusic(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Google Maps lokacija</p>
                            <p>Ovde prekopirajte URL do vašeg kafića na Google mapama, kako bi korisnici mogli da vide gde se nalazi.</p>
                            <textarea className="IP-Settings-TextArea IP-Settings-Input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Opis</p>
                            <textarea
                                className="IP-Settings-TextArea IP-Settings-Input"
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
                        {renderWorkingHours()}
                        <div className="IP-Settings-Block">
                            <p className="boldText">Promeni email</p>
                            <p>Upišite novi email</p>
                            <input className="IP-Settings-Input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Promeni šifru</p>
                            <p>Unesite staru šifru</p>
                            <input className="IP-Settings-Input" type="text" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            <p>Unesite novu šifru, dužu od 8 karaktera</p>
                            <input className="IP-Settings-Input" type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <br />
                            <button
                                className="IP-input-imaMesta IP-clickable"
                                onClick={changePassword}
                                style={{ marginTop: '10px' }}
                            >
                                Promeni
                            </button>
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Odjavi se</p>
                            <button
                                className="IP-input-nemaMesta IP-clickable"
                                onClick={logout}
                            >
                                Odjavi se
                            </button>
                        </div>
                        <div className="IP-Settings-Block">
                            <p className="boldText">Zatvori objekat</p>
                            {renderOpenCloseText()}
                            {renderOpenCloseButton()}
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
                        patchOnServer();
                    }}
                >
                    Sačuvaj
                </button>
            </Zoom>
        </div>
    )
};

export default ObjectSettings;