/* React */
import React, {
    useState,
    useEffect,
    useContext,
    Fragment
} from 'react';
import '../App.css';

/* Libraries */
import _ from 'lodash';

/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

/* Router */
import { useParams } from "react-router-dom";

/* Library */
import { isOpen } from '../library/common';

/* Components */
import Claps from '../Components/Claps';
import AbsoluteWrapper from '../Components/AbsoluteWrapper';

/* Animations */
import Bounce from 'react-reveal/Bounce';
import Roll from 'react-reveal/Roll';

/* Images */
import vinyl from '../slike/vinyl.png';
import Square from '../slike/Square.jpg';
import dnevnaSoba from '../slike/dnevnaSoba.jpg';
import durangoCaffe from '../slike/durangoCaffe.png';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

const placeholderObj = {
    id: 0,
    title: '',
    logo: '',
    brojMesta: 0,
    brojSlobodnihMesta: 0,
    details: {
        opis: '',
        slike: '',
        radnoVreme: '',
        lokacija: '',
        meni: ''
    }
}

function Details(props) {
    let { id } = useParams();
    const { Data, loading, changeData, setCurrentData, User, toggleFavourite } = useContext(DataContext);

    const [data, setData] = useState({ ...placeholderObj });

    useEffect(() => {
        let findData = { ..._.find(Data, { 'id': parseInt(id, 10) }) || placeholderObj };

        setData(findData);
        setCurrentData(findData);
    }, [Data]);

    const isFavourite = () => {
        return User.Favourites.indexOf(data.id) !== -1
    }

    const getRadnoVreme = () => {
        const open = isOpen(data.details.radnoVreme);

        return <p className="randoVremeParagraph">
            <span className="greyText">{open ? 'Otvoreno: ' : 'Zatvoreno: '}</span>
            <span style={{ color: open ? '#009A1F' : '#C50505' }}>{data.details.radnoVreme}</span>
        </p>;
    }

    const getSrc = (title) => {
        switch (title) {
            case 'vinyl': {
                return vinyl;
            };
            case 'Square': {
                return Square;
            };
            case 'dnevnaSoba': {
                return dnevnaSoba;
            };
            case 'durangoCaffe': {
                return durangoCaffe;
            };
            default: {
                return durangoCaffe;
            }
        }
    }

    const restOfPage = () => {
        return (
            <Fragment>
                <div className="detailsSubheader">
                    <div>
                        <h1 className="detailsTitle boldText">{data.title}</h1>
                        {/* <i className="material-icons greyText">
                        access_time
                    </i> */}
                        {getRadnoVreme()}
                    </div>
                    <Roll
                        right
                        duration={700}
                    >
                        <div>
                            <img
                                src={getSrc(data.logo.split('.')[0])}
                                className={
                                    `detailsLogo reveal-focus-${
                                    data.brojSlobodnihMesta && isOpen(data.details.radnoVreme) > 0
                                        ? 'blue'
                                        : 'red'
                                    }`
                                }
                            />
                        </div>
                    </Roll>
                </div>
                <div className="detailsRow">
                    <h1 className="detailRowText">
                        Slobodnih mesta:
                    <span style={{
                            color: data.brojSlobodnihMesta > 0 ? '#3185FC' : '#9A031E',
                        }}>
                            {
                                ' ' + data.brojSlobodnihMesta + ' '
                            }
                        </span>
                        {/* / {data.brojMesta} */}
                    </h1>
                    <i className="material-icons detailIcon">
                        people
                </i>
                </div>
                <div
                    className="detailsRow clickableRow"
                    onClick={() => {
                        // handleShow()
                        props.history.push(`/durango/app/${data.id}/reserve`);
                    }}
                >
                    <h1 className="detailRowText boldText">Napravi rezervaciju</h1>
                    <i className="material-icons detailIconClickable">
                        book
                </i>
                </div>
                <div className="detailsRow clickableRow" onClick={() => {
                    props.history.push(`/durango/app/${data.id}/more`);
                }}>
                    <h1 className="detailRowText boldText">O mestu</h1>
                    <i className="material-icons detailIconClickable">
                        info
                </i>
                </div>
                <div className="detailsRow clickableRow" onClick={() => {
                    toggleFavourite(data.id);
                }}>
                    <h1 className="detailRowText boldText">
                        {
                            isFavourite()
                                ? 'Ukloni iz omiljenih'
                                : 'Dodaj u omiljene'
                        }
                    </h1>
                    <Bounce
                        spy={User.Favourites}
                    >
                        <i
                            className="material-icons detailIconClickable"
                            style={{ color: isFavourite() ? 'gold' : '' }}
                        >
                            {isFavourite() ? 'star' : 'star_outline'}
                        </i>
                    </Bounce>
                </div>
            </Fragment>
        )
    }

    return (
        <AbsoluteWrapper>
            <div className="detailsHeader">
                <div
                    className="goBack"
                    onClick={() => {
                        // props.setSelected(null)
                        props.history.push('/durango/app/home')
                    }}
                >
                    <i className="material-icons">
                        arrow_back_ios
                    </i>
                </div>
                <img src={Logo} className="detailsDurangoLogo" />
            </div>
            {
                !loading && restOfPage()
            }
            {
                !loading && <Claps data={data} />
            }
        </AbsoluteWrapper>
    );
}

export default Details;
