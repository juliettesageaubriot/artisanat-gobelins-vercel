import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Howler from 'react-howler';
import localforage from "localforage";

const TheVolume = () => {

    const slider = useRef(null);
    const [volume, setVolume] = useState(0.5);


    const handleChange = (e) => {
        setVolume(e.target.value / 100);
    }
    useEffect( async () => {
        const currentGlobalVolume = await localforage.getItem("globalVolume");
        if(currentGlobalVolume) {
            setVolume(currentGlobalVolume);
            console.log(currentGlobalVolume)
        }
        
    }, [])

    useEffect(() => {
        window.Howler.volume(volume)
        localforage.setItem("globalVolume", volume);
    }, [volume])

    return ( 
        <div className={styles["volumeContainer"]}>    
            <div className={styles["volumeSlider"]}>
                <label>Volume</label>
                <input type="range" min="0" max="100" value={volume * 100} className={styles["slider"]} ref={slider} onChange={handleChange}/>
            </div>
        </div>
     );
}
 
export default TheVolume;