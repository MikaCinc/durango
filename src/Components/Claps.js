import React, {
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';

/* webComponent */
import 'emoji-slider';

/* Animations */
import RubberBand from 'react-reveal/RubberBand';
import { Spring } from 'react-spring/renderprops';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

const Claps = ({ data, data: { details, details: { userAplauza, ukupnoAplauza, brojOcena } } }) => {
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
            slider.current.removeEventListener('change', (e) => {
                onChange(e.detail.value);
            });
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

    const renderNumber = (num) => {
        return (
            <Spring
                from={{ number: 0 }}
                to={{ number: parseInt(num, 10) }}>
                {
                    props =>
                        <span className="boldText">
                            {
                                showSlider
                                    ? `+${localClaps}`
                                    : Math.ceil(props.number)
                            }
                        </span>
                }
            </Spring>
        )
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
                {
                    renderNumber(ukupnoAplauza)
                }
            </div>
        </div>
    )
}

export default Claps;