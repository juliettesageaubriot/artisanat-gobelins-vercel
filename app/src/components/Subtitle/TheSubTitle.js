import { useEffect, useState } from 'react';
import TheAudioSnippet from '../AudioSnippet/TheAudioSnippet';
import styles from './styles.module.scss'

const TheSubTitle = ({content, currentSubtitle}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [replay, setReplay] = useState(false);

    useEffect(() => {
        console.log(content.id);
        if(currentSubtitle === content.id) {
            setIsVisible(true);
            setTimeout(() => {
                // setIsVisible(false);
                console.log("Fin de la réplique");
            }, content.duration);
        }
    }, [currentSubtitle]);

    const handleReplay = () => {
        setReplay(true);
        setTimeout(() => {
            setReplay(false);
            console.log("A la fin du replay, je disparais");
            setIsVisible(false);
        }, content.duration);
    }

    return ( 
        <div className={`${styles["subtitle_container"]} ${isVisible ? styles["appear"] : ""}`}>
            <TheAudioSnippet sound_url={content.audioSource} shouldPlayOnStart play={replay}/>
            <p>{content.text}</p>
            <button onClick={handleReplay}>Replay</button>
        </div>
     );
}
 
export default TheSubTitle;