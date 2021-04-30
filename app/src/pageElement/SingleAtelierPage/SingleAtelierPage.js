//react
import React, { useEffect, useRef, useState } from 'react';

//styles
import styles from "./styles.module.scss"

//components
import TheBreadcrumb from '@components/Breadcrumb/TheBreadcrumb';
import ThreeScene from '@/three-utils/SetUpThree/threeScene';
import TheAudioSnippet from '@components/AudioSnippet/TheAudioSnippet';
import TheLoader from '@/components/Structure/Loader/TheLoader'

//datas
import audioDatas from "assets/data/subtitles.json";
import TheSubTitle from '@/components/Subtitle/TheSubTitle';
import TheToolChoiceButton from '@/components/ToolChoiceButton/TheToolChoiceButton';

import toolsData from '@assets/data/tools.json'

const SingleAtelierPage = () => {
  //Breadcrumb states
  // const { isShowingBreadcrumb, toggle, setIsShowingBreadcrumb, addStep } = useBreadcrumb();

  // Sound states
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShouldPlayOnStart, setIsShouldPlayOnStart] = useState(false)
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [currentStepTools, setCurrentStepTools] = useState([])

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
    const threeScene = new ThreeScene(canvas, state);
  }, [])

  const handleAudio0 = () => {
    setCurrentSubtitle(0);
  }
  const handleAudio1 = () => {
    setCurrentSubtitle(1);
  }

  // console.log("currentTools", currentTools);


  const audioItems = audioDatas.map((elm, index) => {
    return <TheSubTitle content={elm} currentSubtitle={currentSubtitle} key={index} />
  });

  return (
    <>
      <section>
        {/* { audioItems } */}
        {/* <button style={{position: "absolute",right:"0"}} onClick={handleAudio0}>Audio 0</button>
        <button style={{position: "absolute",right:"40px"}} onClick={handleAudio1}>Audio 1</button> */}
        <TheLoader />
        <TheBreadcrumb
        // isShowing={isShowingBreadcrumb} hide={toggle}
        />
        <TheToolChoiceButton array={currentStepTools} />

        <a href="/menu" className={`link-before ${styles['link-before']}`}>
          <span>Épisodes</span>
        </a>

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
