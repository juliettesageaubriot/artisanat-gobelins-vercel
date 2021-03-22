import { useRef, useState } from "react";
import styles from "./styles.module.scss";

const Volume = () => {

    const slider = useRef(null);
    const [volume, setVolume] = useState(50);


    const handleChange = (e) => {
        setVolume(e.target.value);
        console.log(volume);
    }
    return ( 
        <div className={styles["volumeContainer"]}>    
            <div className={styles["volumeSlider"]}>
                <input type="range" min="1" max="100" value={volume} className={styles["slider"]} ref={slider} onChange={handleChange}/>
            </div>
        </div>
     );
}
 
export default Volume;