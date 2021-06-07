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
import TheStepValidation from '@components/StepValidation/TheStepValidation';
import TheToolChoiceButton from '@components/ToolChoiceButton/TheToolChoiceButton';
import TheCursor from '@/components/Cursor/TheCursor';
import ThePressionUX from '@/components/PressionUX/ThePressionUX';
import TheClickPoints from '@/components/ClickPoints/TheClickPoints';
import TheOverlay from '@/components/Overlay/TheOverlay';

//utils
import useIsMounted from '@hooks/useIsMounted'

//datas
import subtitlesData from "assets/data/subtitles.json";
import audioDatas from "assets/data/audios.json";
import toolsData from '@assets/data/tools.json';
import stepValidationDatas from "assets/data/step-validation.json";

const SingleAtelierPage = () => {
  const isMounted = useIsMounted();

  //Three Scene
  const [threeScene, setThreeScene] = useState(null)

  // Sound states
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShouldPlayOnStart, setIsShouldPlayOnStart] = useState(false);
  const [atelierAudioFadeOut, setAtelierAudioFadeOut] = useState(0.1);
  const [barAudioFadeIn, setBarAudioFadeIn] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState(30);
  const [currentStepTools, setCurrentStepTools] = useState(toolsData.toolsArray0)
  const [currentValidationStep, setCurrentValidationStep] = useState();
  const [soundInteractionToPlay, setSoundInteractionToPlay] = useState({
    url: "assets/audios/atelier/decoupe_du_trace/ciseaux/ciseaux_01.mp3",
    play: false,
    loop: false
  });

  const [fonduAppear, setFonduAppear] = useState(false);

  const ref = useRef(null)
  const cursorColorPickerContainer = useRef(null);
  const cursorColorPickerInner = useRef(null);

  const data = toolsData;
  // console.log(data);

  const state = {
    playSound: () => { setIsPlaying(true) },
    stopSound: () => { setIsPlaying(false) },
    start: () => { setCurrentSubtitle(0); },
    setNextSubtitle: (index) => { setCurrentSubtitle(index) },
    setToolsArray: (toolsArray) => { setCurrentStepTools(toolsArray) },
    setStepValidation: (index) => { setCurrentValidationStep(index) },
    setSoundInteractionToPlay: (url, play, loop) => setSoundInteractionToPlay({url, play, loop}),
    setFonduAppear: (bool) => setFonduAppear(bool),
    fadeBackgroundAudios: () => fadeBackgroundAudios()
  }

  useEffect(() => {
    const canvas = ref.current
    setThreeScene(new ThreeScene(canvas, state));
  }, [])


  const fadeBackgroundAudios = () => {
    const intervalAtelier = setInterval(() => {
      if(atelierAudioFadeOut === 0)
        clearInterval(intervalAtelier);

      setAtelierAudioFadeOut(current => current -= 0.01);
    }, 100);

    const intervalBar = setInterval(() => {
      if(barAudioFadeIn >= 0.1) {
        clearInterval(intervalBar);
      }
      setBarAudioFadeIn(current => current += 0.01);
    }, 100);
  }

  const subtitleItems = subtitlesData.map((elm, index) => {
    return <TheSubTitle
      content={elm}
      currentSubtitle={currentSubtitle}
      key={index}
      onEnd={() => threeScene._actionStepManager.actionsManager(elm.actionOnEnd)}
      onEndReplay={() => elm.actionOnReplay != null ? threeScene._actionStepManager.actionsManager(elm.actionOnReplay) : console.log("no replay")}
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

  // console.log('currentStepTools', currentStepTools);

  return (
    <>
      <section>
        <TheOverlay />
        {subtitleItems}
        {stepValidationItems}
        {/* <button>Margin lefttttt</button>
        <button onClick={() => console.log(threeScene._camera)}> currentCamera </button>
        <button onClick={() => console.log(threeScene._stepManager._globalStep + " " + threeScene._stepManager._subStep)}> currentStep </button>
        <button onClick={() => console.log(threeScene._glassCutOutRaycastObject)}> object glass raycast </button> */}
        <TheAudioSnippet sound_url={"assets/audios/atelier/main_musique_atelier.mp3"} play loop specificVolume={atelierAudioFadeOut}/>
        <TheAudioSnippet sound_url={"assets/audios/bar/AMBIANCE_BAR_01.mp3"} play loop specificVolume={barAudioFadeIn}/> 
        <TheCursor />
        <TheLoader />
        <TheBreadcrumb
        // isShowing={isShowingBreadcrumb} hide={toggle}
        />
        <TheToolChoiceButton array={currentStepTools} />
        {/* <button onClick={() => fadeBackgroundAudios()}> currentCamera </button> */}
        {/* <a href="/" className={` link link-secondary link-black ${styles['link-before']} ${styles['link-black']}`}>
          <span>Épisodes</span>
        </a> */}

        <a className={` link link-secondary link-black ${styles["colorPicker-cta"]}`} id="colorPicker-cta" onClick={() => threeScene._actionStepManager.actionsManager(16)}>
          <span>J'ai choisi mes couleurs !</span>
        </a>

        <div className={styles["page-singleAtelier"]}></div>

        <div className={`${styles["fondu"]} ${fonduAppear ? styles["appear"] : ""}`}></div>

        <img src="/assets/images/ui/pictos-ux/CLIC_GRUGER_V02.gif" alt="Picto UX pour le click gruger" className="picto-ux click-points" id="clickPoints" />
        <img src="/assets/images/ui/pictos-ux/DRAG_DROP_GABARIT_IN.gif" alt="Picto UX pour le drag and drop" className="picto-ux drag-and-drop" id="dragAndDrop" />
        <img src="/assets/images/ui/pictos-ux/drag-and-drop.gif" alt="Picto UX pour le drag and drop de fin" className="picto-ux drag-and-drop-end" id="dragAndDropEnd" />
        <img src="/assets/images/ui/pictos-ux/DRAG_DROP_ENLEVER_PAPIER_V01.gif" alt="Picto UX pour le drag and drop out" className="picto-ux drag-and-drop-out" id="dragAndDropOut" />
        <img src="/assets/images/ui/pictos-ux/DRAG_DROP_color_picker_V01.gif" alt="Picto UX pour le drag and drop du color picker" className="picto-ux drag-and-drop-color-picker" id="dragAndDropColorPicker" />
        <img src="/assets/images/ui/pictos-ux/JAUGE_PRESSION_V02.gif" alt="Picto UX pour la jauge de pression" className="picto-ux pression" id="pression" />
        <img src="/assets/images/ui/pictos-ux/scroll.gif" alt="Picto UX pour le scroll" className="picto-ux scroll" id="scroll" />
        <img src="/assets/images/ui/pictos-ux/TRACE_GLISSIERE_V02.gif" alt="Picto UX pour la trace glissière" className="picto-ux trace" id="trace" />
        <img src="/assets/images/ui/pictos-ux/TRACE_GLISSIERE_FIXE.png" alt="Picto UX pour la trace glissière fixe" className="picto-ux trace-fixe" id="trace-fixe" />

        
        <TheAudioSnippet sound_url={soundInteractionToPlay.url}  play={soundInteractionToPlay.play} loop={soundInteractionToPlay.loop} specificVolume={0.5}/>


        <TheClickPoints />
        <ThePressionUX />
        <div ref={ref} />
        <div className={styles.colorPickerContainer} ref={cursorColorPickerContainer}>
          <div className={styles.colorPickerInner} ref={cursorColorPickerInner}></div>
        </div>
      </section>
    </>
  )
}

export default SingleAtelierPage
