import { useEffect, useState } from 'react';
import TheAudioSnippet from '../AudioSnippet/TheAudioSnippet';
import styles from './styles.module.scss'

const TheSubTitle = ({content, currentSubtitle, onEnd, onEndReplay}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [displayButton, setDisplayButton] = useState(false);
    const [play, setPlay] = useState(false);
    const [possibleToReplay, setIsPossibleToReplay] = useState(false);
    const [myTimeOut, setMyTimeOut] = useState();
    const [myTimeOutReplay, setMyTimeOutReplay] = useState();
    const [myTimeOutNoLongerReplay, setMyTimeOutNoLongerReplay] = useState();

    useEffect(() => {
        if(currentSubtitle === content.id) {
            setDisplayButton(true);
            playTimeOut();
        } else {
            setDisplayButton(false);
        }
    }, [currentSubtitle]);

    const playTimeOut = () => {
        //Affiche le sous-titre
        setIsVisible(true);
        //Joue le son
        setPlay(true);
        setMyTimeOut(setTimeout(() => {
            // console.log("Fin de la réplique 1");
            setPlay(false);
            //Enleve le sous-titre
            setIsVisible(false);
            if(content.canReplay === true) {
                setMyTimeOutReplay(setTimeout(() => {
                    // console.log("maintenant c'est possible de replay 2")
                    //Temps d'attente pour que la réplique se replay
                    setIsPossibleToReplay(true);
                    setMyTimeOutNoLongerReplay(setTimeout(() => {
                        // console.log("Plus possible de replay, on passe à la suite ! 3")
                        setIsPossibleToReplay(false);
                        setDisplayButton(false);
                        onEnd();
                        //2000
                    }, 100));
                }, 1000));
            } else {
                setTimeout(() => {
                    onEnd();
                }, 500)
            }
        }, 100));
    }

    const handleReplayButton = () => {
        clearTimeout(myTimeOut);
        clearTimeout(myTimeOutReplay);
        clearTimeout(myTimeOutNoLongerReplay);
        console.log("replay");
        setPlay(false);
        setIsPossibleToReplay(false);
        setTimeout(() => {
            // playTimeOut();
            onEndReplay();
        }, 1000);
    }

    return ( 
        <div className={`${styles["subtitle_container"]}`}>
            <TheAudioSnippet sound_url={content.audioSource} play={play} specificVolume={1}/>
            <p className={`${styles["subtitle_container__subtitle"]} ${isVisible ? styles["appear"] : ""}`}>
                { content.text }
            </p>
            <button className={`${styles["subtitle_container__replay-button"]} ${possibleToReplay ? styles["show"] : ""} ${displayButton ? styles["visible"] : ""}`} onClick={handleReplayButton}>
                <p>Peux-tu répéter stp ?</p>
                <img src="/assets/images/ui/subtitle/CTA_repeat.png" alt="repeat button"/>
            </button>
        </div>
     );
}
 
export default TheSubTitle;