import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Howler from 'react-howler';

const TheVolume = ({ absolute, colorPicto }) => {

    const slider = useRef(null);
    const [volume, setVolume] = useState(0.5);
    const [previousVolume, setPreviousVolume] = useState(volume);

    // is hovered
    const [isShown, setIsShown] = useState(false);

    const handleChange = (e) => {
        const currentVolume = e.target.value / 100;
        setVolume(currentVolume);
        // console.log(currentVolume)
        setPreviousVolume(currentVolume);
    }
    useEffect(async () => {
        const currentGlobalVolume = await localStorage.getItem("globalVolume");
        if (currentGlobalVolume) {
            setVolume(currentGlobalVolume);
        }
    }, []);

    const handleClick = () => {
        volume === 0 ? setVolume(previousVolume) : setVolume(0);
    };

    useEffect(() => {
        window.Howler.volume(volume);
        localStorage.setItem("globalVolume", volume);
    }, [volume])

    return (
        <div className={`${styles["volumeContainer"]} ${absolute ? "" : styles["isNotAbsolute"]}`}>
            <div className={`${styles["volumeSlider"]} ${"noir" === colorPicto && styles.noir}`}>
                {/* <label>Volume</label> */}
                <input type="range" min="0" max="100" value={volume * 100} className={`${styles["slider"]}`} ref={slider} onChange={handleChange} />
            </div>

            <div className={`${styles['sound-container']}`}
                onClick={handleClick}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                {0 === volume ?
                    <img src={`/assets/images/ui/sound/son_coupe_${colorPicto}${isShown ? true && '_hover' : ''}.png`} />
                    :
                    <img src={`/assets/images/ui/sound/son_${colorPicto}${isShown === true ? '_hover' : ''}.png`} />
                }
            </div>
        </div>
    );
}

export default TheVolume;