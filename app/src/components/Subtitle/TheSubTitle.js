import { useEffect, useState } from 'react';
import TheAudioSnippet from '../AudioSnippet/TheAudioSnippet';
import styles from './styles.module.scss'

const TheSubTitle = ({content, currentSubtitle}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if(currentSubtitle === content.id) {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, content.duration);
        }
    }, [currentSubtitle]);

    return ( 
        <div className={`${styles["subtitle_container"]} ${isVisible ? styles["appear"] : ""}`}>
            <TheAudioSnippet sound_url={content.audioSource} play />
            <p>{content.text}</p>
        </div>
     );
}
 
export default TheSubTitle;