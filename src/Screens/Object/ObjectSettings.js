import React, { useEffect, useState } from 'react';

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

const ObjectSettings = ({ history }) => {
    return (
        <h1>In progress</h1>
    )
};

export default ObjectSettings;