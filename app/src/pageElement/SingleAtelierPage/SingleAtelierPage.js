//react
import React, { useEffect, useRef, useState } from 'react';

//styles
import styles from "./styles.module.scss"

//components
import TheBreadcrumb from '@components/Breadcrumb/TheBreadcrumb';
import useBreadcrumb from '@/three-utils/breadcrumbManager'
import ThreeScene from '@/three-utils/SetUpThree/threeScene';
import TheAudioSnippet from '@components/AudioSnippet/TheAudioSnippet';
import TheLoader from '@/components/Structure/Loader/TheLoader'

//datas
import audioDatas from "assets/data/subtitles.json";
import TheSubTitle from '@/components/Subtitle/TheSubTitle';

const SingleAtelierPage = () => {
  //Breadcrumb states
  // const { isShowingBreadcrumb, toggle, setIsShowingBreadcrumb, addStep } = useBreadcrumb();

  // Sound states
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShouldPlayOnStart, setIsShouldPlayOnStart] = useState(false)
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

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
    const threeScene = new ThreeScene(canvas, state);
  }, [])

  const handleAudio0 = () => {
    setCurrentSubtitle(0);
  }
  const handleAudio1 = () => {
    setCurrentSubtitle(1);
  }

  const audioItems = audioDatas.map((elm, index) => {
      return <TheSubTitle content={elm} currentSubtitle={currentSubtitle} key={index} />
  });

  return (
    <>
      <section>
        {/* { audioItems } */}
        <button style={{position: "absolute",right:"0"}} onClick={handleAudio0}>Audio 0</button>
        <button style={{position: "absolute",right:"40px"}} onClick={handleAudio1}>Audio 1</button>
        <TheLoader />
        <TheBreadcrumb 
        // isShowing={isShowingBreadcrumb} hide={toggle}
        />
        <div ref={ref} />
        <div className={styles.colorPickerContainer} ref={cursorColorPickerContainer}>
          <div className={styles.colorPickerInner} ref={cursorColorPickerInner}></div>
        </div>
      </section>
    </>
  )
}

export default SingleAtelierPage
