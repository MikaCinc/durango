import React, {
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';

/* Libraries */
import _ from 'lodash';

/* webComponent */
import 'emoji-slider';

/* Animations */
import RubberBand from 'react-reveal/RubberBand';
import { Spring } from 'react-spring/renderprops';

/* Context */
import DataContext, { DataProvider } from '../Context/dataContext';

const Claps = ({ data, data: { details, details: { totalClaps, numberOfGrades } } }) => {
    const { changeData, User: { Claps }, changeClaps } = useContext(DataContext);

    const userAplauza = () => {
        let obj = _.find(Claps, { ID: data.id });
        if (!obj) {
            return 0;
        }

        return obj.userAplauza;
    };

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
        if (userAplauza() > 0) {
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

        // Update caffe
        changeData({
            ...data,
            details: {
                ...details,
                totalClaps: totalClaps + localClaps,
                numberOfGrades: userAplauza() === 0 ? numberOfGrades + 1 : numberOfGrades
            }
        });

        // Update User object
        changeClaps({
            ID: data.id,
            userAplauza: localClaps
        });
    }

    const renderNumber = (num) => {
        return (
            <Spring
                from={{ number: 100 }}
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
                    if (userAplauza() > 0) {
                        alert('Hvala! Već si 👏 ovom objektu');
                        return;
                    }
                    setShowSlider(!showSlider);
                }}
            >
                <span>👏</span>
                {
                    renderNumber(totalClaps)
                }
            </div>
        </div>
    )
}

export default Claps;