import { useEffect, useRef } from 'react';
import ReactHowler from 'react-howler';

const TheAudioSnippet = ({ sound_url, play, shouldPlayOnStart, loop, specificVolume, fadeIn, fadeOut}) => {
     const ref = useRef(null);

     const reset = () => {
          //Si le son est mis en pause, il est automatiquement reset à 0
          ref.current.seek(0)
     }

     useEffect(() => {
          console.log(specificVolume)
     }, [])

     // useEffect(() => {
     //      if(fadeIn)
     //           fadeInSound();
     // }, [fadeIn])
     // useEffect(() => {
     //      if(fadeOut)
     //           fadeOutSound();
     // }, [fadeOut])
     
     // const fadeInSound = () => {
     //      console.log(ref.current)
     //      // ref.current.fade(specificVolume, 0.1, 1);
     // }

     // const fadeOutSound = () => {
     //      // ref.current.fade(specificVolume, 0, 1);
     // }

    return ( 
         <ReactHowler
          src={sound_url}
          playing={play}
          ref={ref}
          onPause={reset}
          loop={loop}
          volume={specificVolume !== null ? specificVolume : 1}
        />
     );
}
 
export default TheAudioSnippet;