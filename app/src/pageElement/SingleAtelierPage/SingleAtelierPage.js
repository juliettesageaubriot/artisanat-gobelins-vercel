//react
import React, { useEffect, useRef, useState } from 'react';

//styles
import styles from "./styles.module.scss"

//components
import TheBreadcrumb from '@components/Breadcrumb/TheBreadcrumb';
import ThreeScene from '@jsLogic/three/scenes/threeScene'
import TheAudioSnippet from '@components/AudioSnippet/TheAudioSnippet';
import TheLoader from '@components/Structure/Loader/TheLoader';
import TheSubTitle from '@components/Subtitle/TheSubTitle';
import TheVolume from '@components/VolumeSettings/TheVolume';
import TheStepValidation from '@components/StepValidation/TheStepValidation';
import TheToolChoiceButton from '@components/ToolChoiceButton/TheToolChoiceButton';

import useIsMounted from '@hooks/useIsMounted'

//datas
import audioDatas from "assets/data/subtitles.json";
import toolsData from '@assets/data/tools.json';
import stepValidationDatas from "assets/data/step-validation.json";



const SingleAtelierPage = () => {
  const isMounted = useIsMounted();

  //Three Scene
  const [threeScene, setThreeScene]= useState(null)

  // Sound states
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShouldPlayOnStart, setIsShouldPlayOnStart] = useState(false)
  const [currentSubtitle, setCurrentSubtitle] = useState(30);
  const [currentStepTools, setCurrentStepTools] = useState(toolsData.toolsArray0)
  const [currentValidationStep, setCurrentValidationStep] = useState();

  const ref = useRef(null)
  const cursorColorPickerContainer = useRef(null);
  const cursorColorPickerInner = useRef(null);

  const data = toolsData;

  const state = {
    playSound: () => { setIsPlaying(true) },
    stopSound: () => { setIsPlaying(false) },
    start: () => { setCurrentSubtitle(0); },
    setNextSubtitle: () => {setCurrentSubtitle(1)},
    setToolsArray1: () => { setCurrentStepTools(data.toolsArray1) },
    setToolsArray2: () => { setCurrentStepTools(data.toolsArray2) },
    setStepValidation: (index) => { setCurrentValidationStep(index)}
  }

  useEffect(() => {
    const canvas = ref.current
    setThreeScene(new ThreeScene(canvas, state));


    setCurrentStepTools(data.toolsArray0);
  }, [])

  const handleAudio0 = () => {
    setCurrentSubtitle(0);
    // console.log(currentSubtitle)
  }
  const handleAudio1 = () => {
    setCurrentSubtitle(1);
    // console.log(currentSubtitle)
  }

  // const nextAudio = (action) => {
  //   console.log(action);
  //   if(action === "next") {
  //     setCurrentSubtitle(currentSubtitle + 1);
  //   } else if(action === "cam1") {
  //     threeScene._setCameraAnimationPlay(0);
  //     setTimeout(() => {
  //       setCurrentSubtitle(2);
  //     }, 3000)
  //   } else if(action === "cam2") {
  //     // threeScene._setCameraAnimationPlay(1);
  //     // setCurrentSubtitle();
  //   }
  // }

  // const nextStep = () => {
  //   threeScene._setCameraAnimationPlay(1);
  //   // threeScene._stepManager.setStep(0, 1);
  //   setCurrentSubtitle(5);
  //   setCurrentValidationStep(null);
  //   console.log(threeScene._stepManager._globalStep)
  // }


  // console.log("currentTools", currentTools);

  const subtitleItems = audioDatas.map((elm, index) => {
      return <TheSubTitle 
                content={elm} 
                currentSubtitle={currentSubtitle} 
                key={index} 
                onEnd={() => threeScene.testOnEndSound(elm.actionOnEnd)} 
              />
  });

  const stepValidationItems = stepValidationDatas.map((elm, index) => {
    return <TheStepValidation 
              title={elm.title} 
              btnText={elm.btnText} 
              destination={elm.destination} 
              key={index} 
              appear={currentValidationStep === index} 
              onClick={() => console.log("Change step")} 
            />
  });

  return (
    <>
      <section>
        { subtitleItems }
        { stepValidationItems }
        {/* <TheAudioSnippet sound_url={"assets/audios/test_song.mp3"} play/> */}
        <button style={{position: "absolute",right:"0"}} onClick={handleAudio0}>Audio 0</button>
        <button style={{position: "absolute",right:"70px"}} onClick={handleAudio1}>Audio 1</button>
        <TheLoader />
        <TheBreadcrumb
        // isShowing={isShowingBreadcrumb} hide={toggle}
        />
        <TheToolChoiceButton array={currentStepTools} />

        <a href="/menu" className={`link-before ${styles['link-before']}`}>
          <span>Épisodes</span>
        </a>

        <div className={styles["page-singleAtelier"]}></div>

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
