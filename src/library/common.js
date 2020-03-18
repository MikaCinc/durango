import moment from 'moment';

const isOpen = (radnoVreme) => {
    let time = radnoVreme,
        timeStart = time.split(' - ')[0],
        timeEnd = time.split(' - ')[1],
        currentTime = moment(),
        flag = false,
        sFlag = false,
        lowerLimit = '05:00';

    if (currentTime.isBetween(moment('00:00', 'HH:mm'), moment(lowerLimit, 'HH:mm'))) {
        sFlag = true;
    };

    if (moment(timeEnd, 'HH:mm').isBetween(moment('00:00', 'HH:mm'), moment(lowerLimit, 'HH:mm'))) {
        flag = true;
    };

    if (currentTime.isBetween(moment(timeStart, 'HH:mm').subtract(sFlag ? 1 : 0, 'days'), moment(timeEnd, 'HH:mm').add(flag ? 1 : 0, 'days'))) {
        return true;
    };


    return false;
}

export {
    isOpen
}