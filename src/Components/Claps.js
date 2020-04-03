import React, {
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';

import 'emoji-slider';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

const Claps = ({ data, data: { details, details: { userAplauza, ukupnoAplauza, brojOcena } } }) => {
    const { changeData } = useContext(DataContext);

    const [showSlider, setShowSlider] = useState(false);

    const slider = useRef(null);

    useEffect(() => {
        slider.current.addEventListener('change', (e) => {
            let value = Math.ceil(e.detail.value * 5);
            // console.log(value);
        })
    }, [])

    return (
        <div
            className="clapsContainer"
        >
            <div className="clapsSliderContainer">
                <emoji-slider emoji="👏" value={0.2} step={0.2} ref={slider}></emoji-slider>
            </div>
            <div
                className="clapsTriggerContainer"
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
        </div>
    )
}

export default Claps;