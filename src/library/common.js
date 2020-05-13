import moment from 'moment';

// const isOpen = (radnoVreme) => {
//     // Kafići ne smeju da se zatvaraju od lowerLimita što je 05:00 do početka radnog vremena u toku dana
//     // Da bi ovaj algoritam funkcionisao

//     let time = radnoVreme,
//         timeStart = time.split(' - ')[0],
//         timeEnd = time.split(' - ')[1],
//         currentTime = moment(),
//         flag = false,
//         sFlag = false,
//         lowerLimit = '05:00'; //@todo Ovo treba da se istraži koliko da bude na kraju

//     if (currentTime.isBetween(moment('00:00', 'HH:mm'), moment(lowerLimit, 'HH:mm'))) {
//         sFlag = true; //Ovo je flag koji kaže da li je trenutno vreme prešlo 00:00
//     };

//     if (moment(timeEnd, 'HH:mm').isBetween(moment('00:00', 'HH:mm'), moment(lowerLimit, 'HH:mm'))) {
//         flag = true; //Ovo je flag koji kaže da li je vreme zatvaranja kafića između 00:00 i lowerlimita
//     };

//     if (currentTime.isBetween(moment(timeStart, 'HH:mm').subtract(sFlag ? 1 : 0, 'days'), moment(timeEnd, 'HH:mm').add(!sFlag && flag ? 1 : 0, 'days').subtract(sFlag && !flag ? 1 : 0, 'days'))) {

//         // Postoje sledeći slučajevi:
//         //     Ako nije prošlo 00:00
//         //         Vreme početka ne diramo
//         //         Ako je vreme završetka pre 00:00
//         //             Vreme završetka ne diramo
//         //         Ako je vreme završetka posle 00:00
//         //             Vremenu završetka dodajemo 1 dan
//         //     Ako je prošlo 00:00
//         //         Vremenu početka oduzimamo 1 dan
//         //         Ako je vreme završetka pre 00:00
//         //             Vremenu završetka oduzimamo 1 dan
//         //         Ako je vreme završetka posle 00:00 pa do lowerLimita(05:00)
//         //             Vreme završetka ne diramo

//         //     lowerLimit je vreme pre koga ne sme početi radno vreme a posle koga se ono ne sme završiti

//         return true;
//     };


//     return false;
// }

function isOpen(workingHours, day = moment()) {
    let [openingTime, closingTime] = workingHours.split(" - ");

    function getMomentForTime(time, day) {
        const [hours, minutes] = time.split(":");
        return moment(day).set({ hours, minutes, seconds: 0, millisecond: 0 });
    }

    let opening = getMomentForTime(openingTime, day);
    let closing = getMomentForTime(closingTime, day);

    //! Ako je isti openign i closing, odna je 24h open, treba handluejs i ovaj case.
    if (closing.isSame(opening)) {
        // return "24/7";
        return true;
    }

    //! Ako je trenutno vreme prešlo 00:00, vreme zatvaranja je pre otvoranja i trenutno vreme je pre vremena zatvaranja
    if (closing.isBefore(opening) && moment(day).isBefore(closing)) {
        return true;
    }

    //! Ako prodje 00:00, to znaci da prebacimo u sledeci dan.
    if (closing.isBefore(opening)) {
        closing = moment(closing).add({ days: 1 });
    }
    
    // Da li je trenutno vreme izmedju dva momenta.
    return moment(day).isBetween(opening, closing, null, "()");
}

const roundToPrecision = (x, precision) => {
    var y = +x + (precision === undefined ? 0.5 : precision / 2);
    return y - (y % (precision === undefined ? 1 : +precision));
}

export {
    isOpen,
    roundToPrecision
}