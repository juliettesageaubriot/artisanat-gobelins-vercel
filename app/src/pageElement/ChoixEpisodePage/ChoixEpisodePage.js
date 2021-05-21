//react
import React, { useEffect, useRef, useState } from 'react';
import TheLoader from '@components/Structure/Loader/TheLoader';
import MenuModal from '@components/MenuModal/MenuModal'
import TheVolume from '@components/VolumeSettings/TheVolume'
import TheAudioSnippet from '@components/AudioSnippet/TheAudioSnippet';

import dataMenu from '@assets/data/content-menu.json'
//styles
import styles from "./styles.module.scss"

//components
import ThreeSceneMenu from '@jsLogic/three/scenes/threeSceneMenu';

const ChoixEpisodeAtelierPage = () => {
  const ref = useRef(null)

  // overlay state
  const [isReady, setIsready] = useState(false)

  // Sound states
  const [isShouldPlayOnStart, setIsShouldPlayOnStart] = useState(false)

  const [url, setUrl] = useState()
  const [isPlaying, setIsPlaying] = useState(false)

  const state = {
    handleUrl: (urlElement) => { setUrl(urlElement) },
    stopSound: (event) => { setIsPlaying(event) },
  }

  useEffect(() => {
    const canvas = ref.current
    const threeScene = new ThreeSceneMenu(canvas, state);
    return () => {
      setUrl()
      setIsPlaying()
      threeScene
    }
  }, [])

  const handleClick = () => {
    setIsready(true)
  }


  return (
    <section>
      <TheLoader />

      {!!url && <TheAudioSnippet sound_url={url} play={true} shouldPlayOnStart={false} loop={false} />}
      <TheAudioSnippet sound_url="/assets/audios/menu/menu.mp3" play={true} shouldPlayOnStart={true} loop={true} />
      {
        dataMenu.map((elm, i) => {
          return (
            <MenuModal
              key={i}
              id={elm.id}
              title={elm.title}
              caption={elm.caption}
              duration={elm.duration}
              date={elm.date}
              left={elm.left}
              top={elm.top}
              disponibility={elm.disponibility}
              url={elm.url}
            />
          )
        })
      }
      <div className={`${styles.menu} ${styles['menu-overlay']} ${true === isReady && styles['overlay-none']}`} id="menu-overlay">
        <div className={`${styles['menu_container']}`}>
          <img src="/assets/images/logo/logo_regards_dartisans.png" alt="logo Regards d'Artisans" />
          <p className={styles.pitch}>Regards d'artisans nous invite à nous glisser dans la peau d'un apprenti artisan, dans le cadre intime d'un atelier, lieu de partage d'un savoir-faire.</p>
          <p className={`upp ${styles.casque}`}>Pour une expérience optimale, utilisez un casque !</p>
          <div className={`${styles["button-discover"]}`}>
            <button className={`btn btn-primary`} id="discoverBtn" onClick={handleClick}>
              <span>Je découvre</span>
            </button>
          </div>
        </div>
      </div>

      <TheVolume absolute={true} colorPicto="noir"/>
      <div ref={ref} />

    </section>
  )
}

export default ChoixEpisodeAtelierPage
