import MyContext from "@helpers/myContext";
import { useContext, useRef, useState } from "react";
import styles from "./styles.module.scss";

const TheVolume = () => {
    const slider = useRef(null);
    const [volume, setVolume] = useState(50);

    const mycontext = useContext(MyContext);

    const handleChange = (e) => {
        setVolume(e.target.value);
        mycontext.setVolumeContext(volume);
        console.log("Current Volume " + mycontext.stateGlobal.volume);
    }
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