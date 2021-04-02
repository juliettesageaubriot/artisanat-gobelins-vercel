import ReactHowler from 'react-howler';

const TheAudioSnippet = ({ sound_url, play, shouldPlayOnStart }) => {
    return ( 
         <ReactHowler
          src={sound_url}
          playing={play || shouldPlayOnStart}
        />
     );
}
 
export default TheAudioSnippet;