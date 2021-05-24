import { useRef } from 'react';
import ReactHowler from 'react-howler';

const TheAudioSnippet = ({ sound_url, play, shouldPlayOnStart, loop, specificVolume}) => {
     const ref = useRef(null);

     const reset = () => {
          //Si le son est mis en pause, il est automatiquement reset à 0
          ref.current.seek(0)
     }

    return ( 
         <ReactHowler
          src={sound_url}
          playing={play}
          ref={ref}
          onPause={reset}
          loop={loop}
          volume={specificVolume ? specificVolume : 1}
        />
     );
}
 
export default TheAudioSnippet;