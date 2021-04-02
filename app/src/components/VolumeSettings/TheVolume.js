import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Howler from 'react-howler';

const TheVolume = () => {

    const slider = useRef(null);
    const [volume, setVolume] = useState(50);


    const handleChange = (e) => {
        setVolume(e.target.value);
    }

    useEffect(() => {
        window.Howler.volume(volume / 100);
    }, [volume])

    return ( 
        <div className={styles["volumeContainer"]}>    
            <div className={styles["volumeSlider"]}>
                <label>Volume</label>
                <input type="range" min="1" max="100" value={volume} className={styles["slider"]} ref={slider} onChange={handleChange}/>
            </div>
        </div>
     );
}
 
export default TheVolume;