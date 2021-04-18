//react
import React, { useEffect, useRef, useState } from 'react';

//styles
import styles from "./styles.module.scss"

//components
import TheBreadcrumb from '@components/Breadcrumb/TheBreadcrumb';
import useBreadcrumb from '@hooks/useBreadcrumb'
import ThreeScene from '@/three-utils/SetUpThree/threeScene';
import TheAudioSnippet from '@/components/AudioSnippet/TheAudioSnippet';

const SingleAtelierPage = () => {
  const { isShowingBreadcrumb, toggle } = useBreadcrumb();
  const [isPlaying, setIsPlaying] = useState(false)

  const ref = useRef(null)
  const cursorColorPickerContainer = useRef(null);
  const cursorColorPickerInner = useRef(null);

  const state = {
    function1: () => {setIsPlaying(true)}
  }

  useEffect(() => {
    const canvas = ref.current
    const threeScene = new ThreeScene(canvas, state);
  }, [])

  return (
    <>
      <section>
        <TheBreadcrumb isShowing={isShowingBreadcrumb} hide={toggle} />
        <div ref={ref} />
        <div className={styles.colorPickerContainer} ref={cursorColorPickerContainer}>
          <div className={styles.colorPickerInner} ref={cursorColorPickerInner}></div>
        </div>
      </section>
    </>
  )
}

export default SingleAtelierPage
