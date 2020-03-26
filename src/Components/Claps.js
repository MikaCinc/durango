import React, {
    useState,
    useEffect,
    useContext,
    Fragment
} from 'react';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

const Claps = ({ data, data: { details, details: { userAplauza, ukupnoAplauza, brojOcena } } }) => {
    const { changeData } = useContext(DataContext);


    return (
        <div
            className="clapsContainer"
            onClick={() => {
                changeData({
                    ...data,
                    details: {
                        ...details,
                        userAplauza: userAplauza + 1,
                        ukupnoAplauza: userAplauza < 5 ? ukupnoAplauza + 1 : ukupnoAplauza,
                        brojOcena: userAplauza === 0 ? brojOcena + 1 : brojOcena
                    }
                })
            }}
        >
            <span>👏</span>
            <span className="boldText">{ukupnoAplauza}</span>
        </div>
    )
}

export default Claps;