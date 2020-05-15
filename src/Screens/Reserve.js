/* React */
import React, {
    useEffect,
    useState,
    useContext,
    Fragment
} from 'react';

/* Libraries */
import _ from 'lodash';
import moment from 'moment';
import { useParams } from "react-router-dom";

/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

/* Icons */
import Plus from '../icons/plus.svg';
import Minus from '../icons/minus.svg';
import Done from '../icons/doneWhite.svg';
import Clear from '../icons/clearWhite.svg';

/* Components */
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker'
import { Modal } from 'react-bootstrap';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

const placeholderObj = {
    id: 0,
    title: '',
    logo: '',
    totalSpots: 0,
    freeSpots: 0,
    details: {
        description: '',
        images: '',
        workingHours: '',
        location: '',
        menu: ''
    }
}

function Reserve(props) {
    let { id } = useParams();
    const { Data, loading, fastReserve } = useContext(DataContext);

    const [data, setData] = useState({ ...placeholderObj });
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(moment().add(15, 'minutes').format('HH:mm'));
    const [seats, setSeats] = useState(5);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        let findData = { ..._.find(Data, { 'id': parseInt(id, 10) }) || placeholderObj };

        setData(findData);
    }, [Data]);

    const restOfPage = () => {
        return (
            <Fragment>
                <div className="reserveContainer">
                    <h3 className="reserveText">Datum rezervacije</h3>
                    <div className="reserveCalendarContainer boldText">
                        <DatePicker
                            onChange={(value) => {
                                setDate(value)
                            }}
                            value={date}
                            calendarIcon={
                                <i className="material-icons">
                                    calendar_today
                        </i>
                            }
                            format="MM/dd/yyyy"
                            maxDetail="month"
                            minDate={new Date()}
                            maxDate={moment().add(3, 'day').toDate()}
                            calendarClassName="reserveCalendarMain"
                            className="reserveCalendar"
                        />
                    </div>
                    <h3 className="reserveText">Vreme rezervacije</h3>
                    <div className="reserveTimeContainer boldText">
                        <TimePicker
                            onChange={(value) => {
                                setTime(value);
                            }}
                            format={'HH:mm'}
                            // minTime={moment().toDate()}
                            value={time}
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
                    <h3 className="reserveText">Broj mesta</h3>
                    <div className="reserveSeatsContainer">
                        <button
                            onClick={() => {
                                if (seats > 1) {
                                    setSeats(seats - 1)
                                };
                            }}
                            className="reserveSeatsButton"
                        >
                            <img className="svgIcon" src={Minus} />
                        </button>
                        <div
                            className="reserveSeatsCounter boldText"
                        >
                            {seats}
                        </div>
                        <button
                            onClick={() => {
                                setSeats(seats + 1)
                            }}
                            className="reserveSeatsButton"
                        >
                            {/* <Plus width="40px" height="40px"/> */}
                            <img className="svgIcon" src={Plus} />
                        </button>
                    </div>
                </div>
                <div
                    className="detailsRow clickableRow"
                    onClick={() => {
                        handleShow(true);
                    }}
                >
                    <h1 className="detailRowText boldText">Rezerviši</h1>
                    <img className="svgIconSmaller" src={Done} />
                </div>
                <div
                    className="detailsRow clickableRowCancel"
                    onClick={() => {
                        props.history.push(`/durango/app/${data.id}`);
                    }}
                >
                    <h1 className="detailRowText boldText">Otkaži</h1>
                    <img className="svgIconSmaller" src={Clear} />
                </div>
                <Modal
                    show={showModal}
                    onHide={handleClose}
                    centered
                >
                    <Modal.Body>
                        <div className="reserveModalContainer">
                            <img src={Logo} className="reserveModalLogo"/>
                            <h3 className="boldText reserveModalTitle">Konobar je odobrio!</h3>
                            <p className="reserveModalExplanation">
                                Vaša rezervacija u objektu '{data.title}' je uspešno obavljena.
                    Ne zaboravite da se pojavite najkasnije do {time}.
                    </p>
                            <button
                                className="detailsRow clickableRow w-50"
                                onClick={() => {
                                    handleClose();
                                    props.history.push(`/durango/app/${data.id}`);
                                    fastReserve(data.id, time);
                                }}
                            >
                                <h1 className="detailRowText boldText">OK</h1>
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }

    return (
        !loading && restOfPage()
    );
}

export default Reserve;
