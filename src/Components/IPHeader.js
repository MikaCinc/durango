import React, {
    useEffect,
    useState,
    Fragment,
} from 'react';

/* Libraries */
import moment from 'moment';
import _ from 'lodash';

/* Components */
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

/* Router */
import {
    useHistory,
} from "react-router-dom";

/* Logo */
import Logo from '../ExtendedLogo/Logo.png';

/* Icons */
import BackArrow from '../icons/backArrow.svg';
import GearOutlineBlue from '../icons/gearOutlineBlue.svg';

const IPHeader = (props) => {
    let history = useHistory();

    const [data, setData] = useState({ ...props.dataFromStack });
    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
        setData({ ...props.dataFromStack });
    }, [props.dataFromStack]);

    useEffect(() => {
        let interval = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const displayHeader = () => {
        const { location: { pathname } } = history;
        if (!data) return false;

        let splitted = pathname.split('/');

        if (['login'].indexOf(splitted[splitted.length - 1]) !== -1) {
            return false;
        } else {
            return true;
        }
    }

    const renderLeftComponent = () => {
        const { history: { location: { pathname } } } = props;

        let splitted = pathname.split('/');

        if (['settings'].indexOf(splitted[splitted.length - 1]) !== -1) {
            return (
                <div
                    className="goBack"
                    onClick={() => {
                        history.push(`/inputPanel/${data.id}`);
                    }}
                >
                    <img src={BackArrow} className="svgIconBigger" />
                </div>
            );
        } else {
            return (
                <div className="IP-time">
                    {currentTime.format("HH:mm:ss")}
                </div>
            );
        }
    }

    const renderRightComponent = () => {
        const { history: { location: { pathname } } } = props;

        let splitted = pathname.split('/');

        if (['settings'].indexOf(splitted[splitted.length - 1]) !== -1) {
            return null;
        } else {
            return (
                <OverlayTrigger
                    placement={'bottom'}
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Podesi parametre kafića
                        </Tooltip>
                    }
                >
                    <img
                        src={GearOutlineBlue}
                        className="svgIconBigger IP-settings-icon"
                        onClick={() => {
                            history.push('/inputPanel/' + data.id + '/settings');
                        }}
                    />
                </OverlayTrigger>
            );
        }
    }

    return (
        <Fragment>
            {
                displayHeader() && <div className={`detailsHeader`}>
                    {
                        renderLeftComponent()
                    }
                    <img src={Logo} className={`detailsDurangoLogo`} />
                    {
                        renderRightComponent()
                    }
                </div>
            }
        </Fragment>
    )
}

export default IPHeader;