import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Howler from 'react-howler';
import localforage from "localforage";

const TheVolume = ({ absolute }) => {

    const slider = useRef(null);
    const [volume, setVolume] = useState(0.5);
    const [previousVolume, setPreviousVolume] = useState(0);


    const handleChange = (e) => {
        const currentVolume = e.target.value / 100;
        setVolume(currentVolume);
        console.log(currentVolume)
        setPreviousVolume(currentVolume);
    }
    useEffect(async () => {
        const currentGlobalVolume =  await localforage.getItem("globalVolume");
        if (currentGlobalVolume) {
            setVolume(currentGlobalVolume);
        }
    }, []);

    const handleClick = () => {
        volume === 0 ? setVolume(previousVolume) : setVolume(0);
    };

    useEffect(() => {
        window.Howler.volume(volume);
        localforage.setItem("globalVolume", volume);
    }, [volume])

    return (
        <div className={`${styles["volumeContainer"]} ${absolute ? "" : styles["isNotAbsolute"]}`}>
            <div className={styles["volumeSlider"]}>
                {/* <label>Volume</label> */}
                <input type="range" min="0" max="100" value={volume * 100} className={styles["slider"]} ref={slider} onChange={handleChange} />
            </div>

            <div className={`${styles['sound-container']}`} onClick={handleClick}>
                {0 === volume ?
                    <img src="/assets/images/ui/sound/son_coupe_hover.png" />
                    :
                    <img src="/assets/images/ui/sound/son_hover.png" />
                }
            </div>
        </div>
    );
}

export default TheVolume;