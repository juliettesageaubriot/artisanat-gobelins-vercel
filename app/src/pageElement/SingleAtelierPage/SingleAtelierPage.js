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

//datas
import audioDatas from "assets/data/subtitles.json";
import stepValidationDatas from "assets/data/step-validation.json";
import TheStepValidation from '@/components/StepValidation/TheStepValidation';


const SingleAtelierPage = () => {
  //Breadcrumb states
  // const { isShowingBreadcrumb, toggle, setIsShowingBreadcrumb, addStep } = useBreadcrumb();

  //Three Scene
  let threeScene;

  // Sound states
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShouldPlayOnStart, setIsShouldPlayOnStart] = useState(false)
  const [currentSubtitle, setCurrentSubtitle] = useState(30);
  const [currentValidationStep, setCurrentValidationStep] = useState();

  const ref = useRef(null)
  const cursorColorPickerContainer = useRef(null);
  const cursorColorPickerInner = useRef(null);

  const state = {
    playSound: () => { setIsPlaying(true) },
    stopSound: () => { setIsPlaying(false) },

    // showBreadcumb: () => {setIsShowingBreadcrumb(true)},
    // hideBreadcrumb: () => {setIsShowingBreadcrumb(false)},
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
