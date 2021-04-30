import { useEffect, useState } from 'react';
import TheAudioSnippet from '../AudioSnippet/TheAudioSnippet';
import styles from './styles.module.scss'

const TheSubTitle = ({content, currentSubtitle, onEnd}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [replay, setReplay] = useState(false);
    const [canReplay, setCanReplay] = useState(false);

    useEffect(() => {
       setTimeout(() => {
        console.log(content.id);
        if(currentSubtitle === content.id) {
            setIsVisible(true);
            setTimeout(() => {
                console.log("Fin de la réplique");
                setTimeout(() => {
                    setCanReplay(true);
                }, 2000);
                setIsVisible(false);
            }, content.duration);
        }
       }, 3000);
    }, [currentSubtitle]);

    const handleReplay = () => {
        setIsVisible(true);
        setReplay(true);
        setTimeout(() => {
            setReplay(false);
            console.log("A la fin du replay, je disparais");
            setIsVisible(false);
        }, content.duration);
    }

    useEffect(() => {
        if(canReplay)
            setTimeout(() => {
                setCanReplay(false);
                console.log("Je n'ai pas voulu replay, je passe à la prochaine ");
                setReplay(false);
                setIsVisible(false);
                //Fonction qui s'execute à la fin du subtitle
                // onEnd();    
            }, 5000);
    }, [canReplay])

    return ( 
        <div className={`${styles["subtitle_container"]}`}>
            <TheAudioSnippet sound_url={content.audioSource} shouldPlayOnStart play={replay}/>
            <p className={`${styles["subtitle_container__subtitle"]} ${isVisible ? styles["appear"] : ""}`}>
                { content.text }
            </p>
            <button className={`${styles["subtitle_container__replay-button"]} ${canReplay ? styles["repeat"] : ""}`} onClick={handleReplay}>
                <p>Peux-tu répéter stp ?</p>
                <img src="/assets/images/ui/subtitle/CTA_repeat.png" alt="repeat button"/>
            </button>
        </div>
     );
}
 
export default TheSubTitle;