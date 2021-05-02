//react
import React, { useEffect, useRef, useState } from 'react';

//styles
import styles from "./styles.module.scss"

//components
import TheBreadcrumb from '@components/Breadcrumb/TheBreadcrumb';
import ThreeScene from '@/three-utils/SetUpThree/threeScene';
import TheAudioSnippet from '@components/AudioSnippet/TheAudioSnippet';
import TheLoader from '@/components/Structure/Loader/TheLoader';
import TheSubTitle from '@/components/Subtitle/TheSubTitle';
import TheVolume from '@components/VolumeSettings/TheVolume';
import TheStepValidation from '@/components/StepValidation/TheStepValidation';
import TheToolChoiceButton from '@/components/ToolChoiceButton/TheToolChoiceButton';

import useIsMounted from '@hooks/useIsMounted'

//datas
import audioDatas from "assets/data/subtitles.json";
import toolsData from '@assets/data/tools.json';
import stepValidationDatas from "assets/data/step-validation.json";



const SingleAtelierPage = () => {
  const isMounted = useIsMounted();

  //Three Scene
  let threeScene;

  // Sound states
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShouldPlayOnStart, setIsShouldPlayOnStart] = useState(false)
  const [currentSubtitle, setCurrentSubtitle] = useState(30);
  const [currentStepTools, setCurrentStepTools] = useState([])
  const [currentValidationStep, setCurrentValidationStep] = useState();

  const ref = useRef(null)
  const cursorColorPickerContainer = useRef(null);
  const cursorColorPickerInner = useRef(null);

  const data = toolsData;

  const state = {
    playSound: () => { setIsPlaying(true) },
    stopSound: () => { setIsPlaying(false) },
    setToolsArray1: () => { setCurrentStepTools(data.toolsArray1) },
    setToolsArray2: () => { setCurrentStepTools(data.toolsArray2) }
  }

  useEffect(() => {
    const canvas = ref.current
    threeScene = new ThreeScene(canvas, state);
  }, [])

  useEffect(() => {

  }, [currentValidationStep])

  const handleAudio0 = () => {
    setCurrentSubtitle(0);
  }
  const handleAudio1 = () => {
    setCurrentSubtitle(1);
  }

  // console.log("currentTools", currentTools);

  const subtitleItems = audioDatas.map((elm, index) => {
      return <TheSubTitle content={elm} currentSubtitle={currentSubtitle} key={index} onEnd={() => threeScene.addStep()} />
  });

  const stepValidationItems = stepValidationDatas.map((elm, index) => {
    return <TheStepValidation 
              title={elm.title} 
              btnText={elm.btnText} 
              destination={elm.destination} 
              key={index} 
              appear={currentValidationStep === index} 
              onClick={() => setCurrentValidationStep(currentValidationStep + 1)} 
            />
  })

  return (
    <>
      <section>
        { subtitleItems }
        { stepValidationItems }
        {/* <TheAudioSnippet sound_url={"assets/audios/test_song.mp3"} play/> */}
        <button style={{position: "absolute",right:"0"}} onClick={handleAudio0}>Audio 0</button>
        <button style={{position: "absolute",right:"40px"}} onClick={handleAudio1}>Audio 1</button>
        <TheLoader />
        <TheBreadcrumb
        // isShowing={isShowingBreadcrumb} hide={toggle}
        />
        <TheToolChoiceButton array={currentStepTools} />

        <a href="/menu" className={`link-before ${styles['link-before']}`}>
          <span>Épisodes</span>
        </a>

        <TheVolume absolute />
        <div className={styles.pressureGauge} id="pressureGauge"></div>
        <div ref={ref} />
        <div className={styles.colorPickerContainer} ref={cursorColorPickerContainer}>
          <div className={styles.colorPickerInner} ref={cursorColorPickerInner}></div>
        </div>
      </section>
    </>
  )
}

export default SingleAtelierPage
