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
import TheCursor from '@/components/Cursor/TheCursor';

//utils
import useIsMounted from '@hooks/useIsMounted'

//datas
import audioDatas from "assets/data/subtitles.json";
import toolsData from '@assets/data/tools.json';
import stepValidationDatas from "assets/data/step-validation.json";




const SingleAtelierPage = () => {
  const isMounted = useIsMounted();

  //Three Scene
  const [threeScene, setThreeScene] = useState(null)

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
    setNextSubtitle: (index) => { setCurrentSubtitle(index) },
    setToolsArray1: () => { setCurrentStepTools(data.toolsArray0) },
    setToolsArray2: () => { setCurrentStepTools(data.toolsArray1) },
    setToolsArray3: () => { setCurrentStepTools(data.toolsArray2) },
    setStepValidation: (index) => { setCurrentValidationStep(index) }
  }

  useEffect(() => {
    const canvas = ref.current
    setThreeScene(new ThreeScene(canvas, state));
    setCurrentStepTools(data.toolsArray0);
  }, [])


  const subtitleItems = audioDatas.map((elm, index) => {
    return <TheSubTitle
      content={elm}
      currentSubtitle={currentSubtitle}
      key={index}
      onEnd={() => threeScene._actionStepManager.actionsManager(elm.actionOnEnd)}
    />
  });

  const stepValidationItems = stepValidationDatas.map((elm, index) => {
    return <TheStepValidation
      title={elm.title}
      btnText={elm.btnText}
      destination={elm.destination}
      key={index}
      appear={currentValidationStep === index}
      onClick={() => threeScene._actionStepManager.actionsManager(elm.actionOnClick)}
    />
  });

  return (
    <>
      <section>
        {subtitleItems}
        {stepValidationItems}
        {/* <button>Margin lefttttt</button>
        <button onClick={() => console.log(threeScene._camera)}> currentCamera </button>
        <button onClick={() => console.log(threeScene._stepManager._globalStep)}> currentStep </button> */}
        {/* <TheAudioSnippet sound_url={"assets/audios/atelier/main_musique_atelier.mp3"} play loop specificVolume={0.2}/> */}
        <TheCursor />
        <TheLoader />
        <TheBreadcrumb
        // isShowing={isShowingBreadcrumb} hide={toggle}
        />
        <TheToolChoiceButton array={currentStepTools} />

        <a href="/menu" className={`link-before ${styles['link-before']}`}>
          <span>Épisodes</span>
        </a>

        <div className={styles["page-singleAtelier"]}></div>

        <img src="/assets/images/ui/pictos-ux/click-points.gif" alt="Picto UX pour le click gruger" className="picto-ux click-points" id="clickPoints"/>
        <img src="/assets/images/ui/pictos-ux/drag-and-drop.gif" alt="Picto UX pour le drag and drop" className="picto-ux drag-and-drop" id="dragAndDrop"/>
        <img src="/assets/images/ui/pictos-ux/pression.gif" alt="Picto UX pour la jauge de pression" className="picto-ux pression" id="pression"/>
        <img src="/assets/images/ui/pictos-ux/scroll.gif" alt="Picto UX pour le scroll" className="picto-ux scroll" id="scroll"/>
        <img src="/assets/images/ui/pictos-ux/trace.gif" alt="Picto UX pour la trace glissière" className="picto-ux trace" id="trace"/>

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
