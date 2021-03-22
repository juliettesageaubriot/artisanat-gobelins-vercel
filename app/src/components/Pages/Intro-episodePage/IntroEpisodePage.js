import { useRef, useState } from "react";
import styles from "./styles.module.scss";

const IntroEpisodePage = () => {

    const slider = useRef(null);
    const [volume, setVolume] = useState(50);


    const handleChange = (e) => {
        setVolume(e.target.value);
        console.log(volume);
    }

    return ( 
        <div className={styles.introContainer}>
            <h1 className={styles.title}>Regards d'artisans</h1>
            <p className={styles.text}>Regards d'artisans nous invite à nous glisser dans la peau d'un parrentit artisan, dans le cadre intime d'un atelier, lieu de partage d'un savoir-faire.</p>
            <div className={styles.casque}>
                <img src="" alt=""/>
                <p>Utilisez un casque pour plus d'immersion !</p>
            </div>
            <a className={styles.cta} href="/">
                Découvrir
            </a>
            <div className={`${styles.cta} ${styles.about}`}>
               À propos
            </div>

            <div className={styles.sound}>
                
                <div className={styles.volumeSlider}>
                    <input type="range" min="1" max="100" value={volume} className={styles.slider} ref={slider} onChange={handleChange}/>
                </div>
            </div>

            
        </div>
     );
}
 
export default IntroEpisodePage;