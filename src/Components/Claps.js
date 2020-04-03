import React, {
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';

import 'emoji-slider';

import RubberBand from 'react-reveal/RubberBand';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

const Claps = ({data, data: { details, details: { userAplauza, ukupnoAplauza, brojOcena } } }) => {
    const { changeData } = useContext(DataContext);

    const [showSlider, setShowSlider] = useState(false);
    const [localClaps, setLocalClaps] = useState(0);

    const slider = useRef(null);
    let interval;

    useEffect(() => {
        slider.current.addEventListener('change', (e) => {
            onChange(e.detail.value);
        });

        return () => {
            clearTimeout(interval);
        }
    }, []);

    const onChange = (value) => {
        if (userAplauza > 0) {
            alert('Hvala! Već si 👏 ovom objektu');
            return;
        } else {
            let ceildValue = Math.ceil(value * 5);
            setLocalClaps(ceildValue);
        }
    }

    useEffect(() => {
        if (localClaps > 0) {
            clearTimeout(interval);
            interval = setTimeout(() => {
                finishedRating();
            }, 1000);
        }

        return () => {
            clearTimeout(interval);
        }
    }, [localClaps]);

    const finishedRating = () => {
        setShowSlider(false);
        changeData({
            ...data,
            details: {
                ...details,
                userAplauza: localClaps,
                ukupnoAplauza: ukupnoAplauza + localClaps,
                brojOcena: userAplauza === 0 ? brojOcena + 1 : brojOcena
            }
        })
    }

    return (
        <div
            className="clapsContainer"
        >
            <RubberBand
                when={showSlider}
                duration={500}
                opposite={true}
            >
                <div className={`clapsSliderContainer ${!showSlider && 'd-none'}`}>
                    <emoji-slider emoji="👏" value={0.5} step={0.2} ref={slider}></emoji-slider>
                </div>
            </RubberBand>
            <div
                className="clapsTriggerContainer"
                onClick={() => {
                    if (userAplauza > 0) {
                        alert('Hvala! Već si 👏 ovom objektu');
                        return;
                    }
                    setShowSlider(!showSlider);
                }}
            >
                <span>👏</span>
                <span className="boldText">
                    {
                        showSlider
                            ? userAplauza === 0
                                ? `+${localClaps}`
                                : userAplauza
                            : ukupnoAplauza
                    }
                </span>
            </div>
        </div>
    )
}

export default Claps;