//react
import React, { useEffect, useRef, useState } from 'react';

//styles
import styles from "./styles.module.scss"

//components
import TheBreadcrumb from '@components/Breadcrumb/TheBreadcrumb';
import ThreeScene from '@/three-utils/SetUpThree/threeScene';
import TheAudioSnippet from '@components/AudioSnippet/TheAudioSnippet';
import TheLoader from '@/components/Structure/Loader/TheLoader'

const SingleAtelierPage = () => {
  //Breadcrumb states
  // const { isShowingBreadcrumb, toggle, setIsShowingBreadcrumb, addStep } = useBreadcrumb();

  // Sound states
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShouldPlayOnStart, setIsShouldPlayOnStart] = useState(false)

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


  return (
    <>
      <section>
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
