import moment from 'moment';

const isOpen = (radnoVreme) => {
    // Kafići ne smeju da se zatvaraju od lowerLimita što je 05:00 do početka radnog vremena u toku dana
    // Da bi ovaj algoritam funkcionisao

    let time = radnoVreme,
        timeStart = time.split(' - ')[0],
        timeEnd = time.split(' - ')[1],
        currentTime = moment(),
        flag = false,
        sFlag = false,
        lowerLimit = '05:00'; //@todo Ovo treba da se istraži koliko da bude na kraju

    if (currentTime.isBetween(moment('00:00', 'HH:mm'), moment(lowerLimit, 'HH:mm'))) {
        sFlag = true; //Ovo je flag koji kaže da li je trenutno vreme prešlo 00:00
    };

    if (moment(timeEnd, 'HH:mm').isBetween(moment('00:00', 'HH:mm'), moment(lowerLimit, 'HH:mm'))) {
        flag = true; //Ovo je flag koji kaže da li je vreme zatvaranja kafića između 00:00 i lowerlimita
    };

    if (currentTime.isBetween(moment(timeStart, 'HH:mm').subtract(sFlag ? 1 : 0, 'days'), moment(timeEnd, 'HH:mm').add(!sFlag && flag ? 1 : 0, 'days').subtract(sFlag && !flag ? 1 : 0, 'days'))) {
        /* 
        Postoje sledeći slučajevi:
            Ako nije prošlo 00:00
                Vreme početka ne diramo
                Ako je vreme završetka pre 00:00
                    Vreme završetka ne diramo
                Ako je vreme završetka posle 00:00
                    Vremenu završetka dodajemo 1 dan
            Ako je prošlo 00:00
                Vremenu početka oduzimamo 1 dan
                Ako je vreme završetka pre 00:00
                    Vremenu završetka oduzimamo 1 dan
                Ako je vreme završetka posle 00:00 pa do lowerLimita(05:00)
                    Vreme završetka ne diramo

            lowerLimit je vreme pre koga ne sme početi radno vreme a posle koga se ono ne sme završiti
        */
        return true;
    };


    return false;
}

export {
    isOpen
}