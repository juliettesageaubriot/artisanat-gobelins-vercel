import { useEffect, useState } from 'react';
import TheAudioSnippet from '../AudioSnippet/TheAudioSnippet';
import styles from './styles.module.scss'

const TheSubTitle = ({content, currentSubtitle, onEnd}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [display, setDisplay] = useState(false);
    const [play, setPlay] = useState(false);
    const [possibleToReplay, setIsPossibleToReplay] = useState(false);
    const [myTimeOut, setMyTimeOut] = useState();

    useEffect(() => {
        if(currentSubtitle === content.id) {
            setDisplay(true);
            // //Affiche le sous-titre
            // setIsVisible(true);
            // //Joue le son
            // setPlay(true);
            // setMyTimeOut(setTimeout(() => {
            //     console.log("Fin de la réplique");
            //     setPlay(false);
            //     setTimeout(() => {
            //         console.log("maintenant c'est possible de replay")
            //         //Temps d'attente pour que la réplique se replay
            //         setIsPossibleToReplay(true);
            //         setTimeout(() => {
            //             console.log("Plus possible de replay, on passe à la suite !")
            //             setIsPossibleToReplay(false);
            //             setDisplay(false);
            //             // onEnd();
            //         }, 5000);
            //     }, 5000);
            //     //Enleve le sous-titre
            //     setIsVisible(false);
            // }, content.duration));
            playTimeOut();
        } else {
            setDisplay(false);
        }
    }, [currentSubtitle]);

    const playTimeOut = () => {
        //Affiche le sous-titre
        setIsVisible(true);
        //Joue le son
        setPlay(true);
        setMyTimeOut(setTimeout(() => {
            console.log("Fin de la réplique");
            setPlay(false);
            setTimeout(() => {
                console.log("maintenant c'est possible de replay")
                //Temps d'attente pour que la réplique se replay
                setIsPossibleToReplay(true);
                setTimeout(() => {
                    console.log("Plus possible de replay, on passe à la suite !")
                    setIsPossibleToReplay(false);
                    setDisplay(false);
                    // onEnd();
                }, 5000);
            }, 5000);
            //Enleve le sous-titre
            setIsVisible(false);
        }, content.duration));
    }

    const handleReplayButton = () => {
        clearTimeout(myTimeOut);
        console.log("replay");
        setPlay(false);
        setTimeout(() => {
            playTimeOut();
        }, 1000);
    }

    return ( 
        <div className={`${styles["subtitle_container"]}`}>
            <TheAudioSnippet sound_url={content.audioSource} play={play}/>
            <p className={`${styles["subtitle_container__subtitle"]} ${isVisible ? styles["appear"] : ""}`}>
                { content.text }
            </p>
            <button className={`${styles["subtitle_container__replay-button"]} ${possibleToReplay ? styles["show"] : ""} ${display ? styles["visible"] : ""}`} onClick={handleReplayButton}>
                <p>Peux-tu répéter stp ?</p>
                <img src="/assets/images/ui/subtitle/CTA_repeat.png" alt="repeat button"/>
            </button>
        </div>
     );
}
 
export default TheSubTitle;