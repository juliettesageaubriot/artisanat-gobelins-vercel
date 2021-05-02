import ReactHowler from 'react-howler';

const TheAudioSnippet = ({ sound_url, play, shouldPlayOnStart, loop}) => {
    return ( 
         <ReactHowler
          src={sound_url}
          playing={play}
        />
     );
}
 
export default TheAudioSnippet;