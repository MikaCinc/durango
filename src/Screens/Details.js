/* React */
import React, {
  useState,
  useEffect,
  useContext,
  Fragment
} from 'react';
// import '../Styles/App.css'; @edited

/* Icons */
// import Star from '../icons/star.svg';
// import StarOutline from '../icons/starOutline.svg';
import Star from '../icons/star.svg';
import StarOutline from '../icons/star_white_border.svg';
import Info from '../icons/infoWhite.svg';
import Book from '../icons/bookWhite.svg';
import Seat from '../icons/seat.svg';
// import SeatGray from '../icons/seat_gray.svg';
import SeatOrange from '../icons/seat_orange.svg';
import SeatRed from '../icons/seatRed.svg';
import SeatDarkRed from '../icons/seatDarkRed.svg';
import NearMe from '../icons/nearMeWhite.svg';

/* MORE DETAILS PAGE */
import MoreDetails from './MoreDetails';

/* Default Logo */
import defaultLogo from '../CustomIcons/defaultLogo.png';

/* Library */
import { isOpen, getTodaysWorkingHours, getApiUrl } from '../library/common';
import moment from 'moment';

/* Animations */
import Bounce from 'react-reveal/Bounce';
import Roll from 'react-reveal/Roll';
import Zoom from 'react-reveal/Zoom';

/* Context */
import DataContext from '../Context/dataContext';

const UkupnoMestaBadge = ({ color = 'white', object }) => {

  const getLabelGradient = () => {
    let hoursTillUpdated = moment.duration(moment().diff(moment(object.spotsUpdatedAt))).asHours(),
      labelColor;

    if (hoursTillUpdated <= 1) {
      labelColor = `linear-gradient(to top right, #00c6fb 0%, #005bea 100%)`;
    } else if (hoursTillUpdated > 1 && hoursTillUpdated <= 5) {
      labelColor = `linear-gradient(to top right, #f83600 0%, #f9d423 100%)`;
    } else if (hoursTillUpdated > 5 && hoursTillUpdated <= 8) {
      labelColor = `linear-gradient(to top right, #ff0844 0%, #ffb199 100%)`;
    } else if (hoursTillUpdated > 8) {
      labelColor = `linear-gradient(to top right, #ad080f 0%, #ff0000 100%)`;
    }

    return labelColor;
  }

  return (
    <Fragment>
      {
        object.totalSpots
          ? <div
            className="updatedBadge"
            style={
              {
                top: 0,
                right: 0,
                bottom: 'auto',
                left: 'auto',
                color,
                fontSize: '12px',
                background: getLabelGradient()
              }
            }
          >
            <p>Ukupno mesta: {object.totalSpots}</p>
          </div>
          : null
      }
    </Fragment>
  )
}

const UpdatedBadge = ({ color = 'white', object }) => {
  const getLabelGradient = () => {
    let hoursTillUpdated = moment.duration(moment().diff(moment(object.spotsUpdatedAt))).asHours(),
      labelColor;

    if (hoursTillUpdated <= 1) {
      labelColor = `linear-gradient(to top right, #00c6fb 0%, #005bea 100%)`;
    } else if (hoursTillUpdated > 1 && hoursTillUpdated <= 5) {
      labelColor = `linear-gradient(to top right, #f83600 0%, #f9d423 100%)`;
    } else if (hoursTillUpdated > 5 && hoursTillUpdated <= 8) {
      labelColor = `linear-gradient(to top right, #ff0844 0%, #ffb199 100%)`;
    } else if (hoursTillUpdated > 8) {
      labelColor = `linear-gradient(to top right, #ad080f 0%, #ff0000 100%)`;
    }

    return labelColor;
  }

  return (
    <div
      className="updatedBadge"
      style={
        {
          color,
          fontSize: '12px',
          background: getLabelGradient()
        }
      }
    >
      <p>Poslednje ažuriranje u: {moment(object.spotsUpdatedAt).format('HH:mm:ss')}</p>
      {/* <img src={watchBlue} className="svgIconSmallest updatedBadgeIcon" /> */}
    </div>
  )
}

const Details = ({ data, history }) => {
  const { loading, User, toggleFavourite, setShowComingSoonModal, setErrorModalMessage, setShowLoginModal } = useContext(DataContext);
  /* const [timer, setTimer] = useState('');

  useEffect(() => {
    if (!User || !User.id) {
      return;
    }

    let interval;

    const updateTimer = () => {
      setTimer(
        moment.utc(moment(User.reservation.time, 'HH:mm').diff(moment(), 'seconds') * 1000).format('mm:ss')
      );
    }

    if (isReserved(data)) {
      updateTimer();
      interval = setInterval(() => {
        updateTimer();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [data]); */

  const isFavourite = () => {
    if (!User || !User.id) {
      return false;
    }
    return User.favourites.indexOf(data.id) !== -1
  }

  const getWorkingHours = () => {
    let timeForDay = getTodaysWorkingHours(data.details.workingHours);
    if (!timeForDay) {
      return <p className="randoVremeParagraph">
        <span style={{ color: 'orangered' }}>ZATVORENO</span>
      </p>
    }
    const open = isOpen(data.details.workingHours, data.isManualyClosed);

    return <p className="randoVremeParagraph">
      <span className="greyText">{open ? 'Otvoreno: ' : 'Zatvoreno: '}</span>
      <span style={{ color: open ? '#009A1F' : 'orangered' }}>{timeForDay}</span>
    </p>;
  }

  const isReserved = (obj) => {
    if (!User || !User.reservation) {
      return false;
    }

    // Is current time behind Reserved Time
    let flag = moment(User.reservation.time, 'HH:mm').isAfter();

    if (User.reservation.id === obj.id && flag) {
      return true;
    }

    return false;
  }

  const getLabelSingleColor = () => {
    let hoursTillUpdated = moment.duration(moment().diff(moment(data.spotsUpdatedAt))).asHours(),
      labelColor;

    if (hoursTillUpdated <= 1) {
      labelColor = `blue`;
    } else if (hoursTillUpdated > 1 && hoursTillUpdated <= 5) {
      labelColor = `orangered`;
    } else if (hoursTillUpdated > 5 && hoursTillUpdated <= 8) {
      labelColor = `#ff0844`;
    } else if (hoursTillUpdated > 8) {
      labelColor = `#ff0000`;
    }

    return labelColor;
  }

  const getSeatIcon = () => {
    let hoursTillUpdated = moment.duration(moment().diff(moment(data.spotsUpdatedAt))).asHours(),
      seatInColor;

    if (hoursTillUpdated <= 1) {
      seatInColor = Seat;
    } else if (hoursTillUpdated > 1 && hoursTillUpdated <= 5) {
      seatInColor = SeatOrange;
    } else if (hoursTillUpdated > 5 && hoursTillUpdated <= 8) {
      seatInColor = SeatRed;
    } else if (hoursTillUpdated > 8) {
      seatInColor = SeatDarkRed;
    }

    return <img
      src={seatInColor}
      className="svgIcon"
      alt="icon"
    />
  }

  const restOfPage = () => {
    return (
      <Fragment>
        <div className="detailsSubheader">
          <div>
            <Zoom
              cascade
              duration={500}
            >
              <h1 className="detailsTitle boldText">{data.title}</h1>
            </Zoom>
            {getWorkingHours()}
          </div>
          <Roll
            right
            duration={500}
          >
            <div>
              <img
                src={
                  data.logo
                    // ? `${getApiUrl() + data.logo}`
                    ? `${process.env.PUBLIC_URL + '/slike/mockLogos/' + data.logo}`
                    : defaultLogo
                }
                className={
                  `detailsLogo reveal-focus-${getLabelSingleColor()}`
                }
                alt="logo"
              />
            </div>
          </Roll>
        </div>
        <div className="detailsRowMax">
          <h1 className="detailRowText">
            Slobodnih mesta:
            <span style={{
              color: getLabelSingleColor(),
            }}>
              {
                ` ${data.freeSpots >= 10
                  ? '10+'
                  : data.freeSpots
                } `
              }
            </span>
            {/* / {data.totalSpots} */}
          </h1>
          {getSeatIcon()}
          {
            data.spotsUpdatedAt && <UpdatedBadge
              color="white"
              object={data}
            />
          }
          <UkupnoMestaBadge
            color="white"
            object={data}
          />
        </div>
        <MoreDetails data={data} />
        {/*  <div
          className="detailsRow clickableRow"
          onClick={() => {
            if (!User || !User.id) {
              setShowLoginModal(true);
              return;
            }
            setShowComingSoonModal(true);
            // history.push(`/app/${data.id}/reserve`);
          }}
        >
          <h1 className="detailRowText boldText">
            {
              isReserved(data)
                ? `Rezervisano: ${timer}`
                : 'Brza rezervacija'
            }
          </h1>
          <img
            src={Book}
            className="svgIconSmaller"
            alt="icon"
          />
        </div> */}
        {/* <div
          className="detailsRow clickableRow"
          onClick={() => {
            history.push(`/app/${data.id}/more`);
          }}
        >
          <h1 className="detailRowText boldText">O mestu</h1>
          <img src={Info} className="svgIconSmaller detailIconClickable" alt="icon" />
        </div> */}
        <div
          className="detailsRow clickableRow"
          onClick={() => {
            if (!User || !User.id) {
              setShowLoginModal(true);
              return;
            }
            toggleFavourite(data.id);
          }}
        >
          <h1 className="detailRowText boldText">
            {
              isFavourite()
                ? 'Ukloni iz omiljenih'
                : 'Dodaj u omiljene'
            }
          </h1>
          <Bounce
            spy={User && User.id && User.favourites}
          >
            <img src={isFavourite() ? Star : StarOutline} className="svgIconSmaller detailIconClickable" alt="icon" />
          </Bounce>
        </div>
        <div
          className="detailsRow clickableRow"
          onClick={() => {
            if (!data.details.location) {
              setErrorModalMessage('Za ovaj objekat nije poznata lokacija na mapi');
            } else {
              window.open(data.details.location, '_blank');
            }
          }}
        >
          <h1 className="detailRowText boldText">Prikaži na mapi</h1>
          <img
            src={NearMe}
            className="svgIconSmaller"
            alt="icon"
          />
        </div>
      </Fragment>
    )
  }

  return (
    restOfPage()
  );
}

export default Details;