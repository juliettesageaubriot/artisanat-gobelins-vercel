//react
import React, { useEffect, useRef, useState } from 'react';
import TheLoader from '@components/Structure/Loader/TheLoader';
import MenuModal from '@components/MenuModal/MenuModal'
import TheAudioSnippet from '@components/AudioSnippet/TheAudioSnippet';
import TheModal from '@components/Modal/TheModal'

import useModal from '@hooks/useModal'
import dataMenu from '@assets/data/content-menu.json'
//styles
import styles from "./styles.module.scss"

//components
import ThreeSceneMenu from '@jsLogic/three/scenes/threeSceneMenu';

const ChoixEpisodeAtelierPage = () => {
  const ref = useRef(null)
  const { isShowing: isShowingAbout, toggle: toggleAbout } = useModal();

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

  const modalTextAbout = [{
    title: "À propos",
    slug: "Crédits",
    content: "Ce projet a été réalisé dans le cadre du master de design et développement de l'innovation interactive. Il a été crée par deux développeurs <span>Juliette Sage--Aubriot, Aurélien Hémidy</span> et trois designers <span>Éloïse Luna, Vincent Calas et Chloélia Breton.</span>",
    credits: "Un merci particulier pour tous les intervenants qui nous ont aidés tout au long du projet, à la comédienne <span>Roxane Fomberteau</span> qui a prêté sa voix à notre maître d'apprentissage, à <span>Louise Doublet</span> qui nous a accompagné dans la découverte du métier de vitrailliste, et à <span>Adrien Melchior</span> pour la création musicale.",
    typographies: "Typographies : cirka, fonderie pangram pangram",
    gobelins: '/assets/images/logo/logo_gobelins.png',
    buttons: false
  }]

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

  useEffect(async () => {
    localStorage.setItem("showingAboutModal", isShowingAbout);
  }, [isShowingAbout])

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
              slug={elm.slug}
              typographies={elm.typographies}
            />
          )
        })
      }

      <div className={`${styles.menu} ${styles['menu-overlay']} ${true === isReady && styles['overlay-none']}`} id="menu-overlay">

        <div className={`${styles['menu_container']}`}>
          <img src="/assets/images/logo/logo_regards_dartisans.png" alt="logo Regards d'Artisans" />
          <p className={styles.pitch}>Cette expérience t'invite à te glisser dans la peau d'un apprenti artisan d'art, dans le cadre intime d'un atelier, lieu de partage d'un savoir-faire.</p>
          <p className={`upp ${styles.casque}`}><i className="fal fa-headphones-alt"></i> Pour une expérience optimale, utilisez un casque !</p>
          <div className={`${styles["button-discover"]}`}>
            <button className={`btn btn-primary`} id="discoverBtn" onClick={handleClick}>
              <span>Je découvre</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.about}>
        <div className={`${styles["btn_container"]}`}>
          <div className={`${styles["btn__inner"]}`}>
            <button className={`btn btn-about ${isShowingAbout === true && styles.disabled}`} onClick={toggleAbout} id='btnAboutOpen'><span>À propos</span></button>
          </div>
        </div>
        <TheModal isShowing={isShowingAbout} hide={toggleAbout} content={modalTextAbout} />
      </div>

      <div ref={ref} />

    </section>

  )
}

export default ChoixEpisodeAtelierPage
