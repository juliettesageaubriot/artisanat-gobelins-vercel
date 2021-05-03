import { useEffect, useState } from 'react';
import TheAudioSnippet from '../AudioSnippet/TheAudioSnippet';
import styles from './styles.module.scss'

const TheSubTitle = ({content, currentSubtitle, onEnd}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [display, setDisplay] = useState(false);
    const [play, setPlay] = useState(false);
    const [possibleToReplay, setIsPossibleToReplay] = useState(false);

    useEffect(() => {
        if(currentSubtitle === content.id) {
            //Affiche le sous-titre
            setIsVisible(true);
            //Joue le son
            setPlay(true);
            setTimeout(() => {
                console.log("Fin de la réplique");
                setTimeout(() => {
                    //Temps d'attente pour que la réplique se replay
                    setIsPossibleToReplay(true);
                    setTimeout(() => {
                        setIsPossibleToReplay(false);
                        onEnd();
                    }, 5000);
                }, 5000);
                //Enleve le sous-titre
                setIsVisible(false);
            }, content.duration);
        }
    }, [currentSubtitle]);

    const handleReplay = () => {
        console.log("replay");
        //Affiche le sous-titre
        setIsVisible(true);
        //Joue le son
        setPlay(true);
        //Enleve le bouton de replay
        setIsPossibleToReplay(false);
        setTimeout(() => {
            console.log("Fin du replay");
            setIsVisible(false);
            onEnd();
        }, content.duration);
    }

    return ( 
        <div className={`${styles["subtitle_container"]}`}>
            <TheAudioSnippet sound_url={content.audioSource} play={play}/>
            <p className={`${styles["subtitle_container__subtitle"]} ${isVisible ? styles["appear"] : ""}`}>
                { content.text }
            </p>
            <button className={`${styles["subtitle_container__replay-button"]} ${possibleToReplay ? styles["show"] : ""} ${styles["visible"]}`} onClick={handleReplay}>
                <p>Peux-tu répéter stp ?</p>
                <img src="/assets/images/ui/subtitle/CTA_repeat.png" alt="repeat button"/>
            </button>
        </div>
     );
}
 
export default TheSubTitle;