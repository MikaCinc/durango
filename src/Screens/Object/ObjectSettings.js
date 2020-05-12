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
                    <div className="IP-Settings-Block">
                        <p>Naziv</p>
                        {/* <input type="text"  */}
                    </div>
                </div>
            }
        </div>
    )
};

export default ObjectSettings;