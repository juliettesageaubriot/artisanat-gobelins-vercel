import useModal from '@hooks/useModal'
import TheModal from '@components/Modal/TheModal'
import TheVolume from '@components/VolumeSettings/TheVolume';
import Link from 'next/link'

import styles from "./styles.module.scss"
import TheBreadcrumb from '@components/Breadcrumb/TheBreadcrumb';
import TheSubTitle from '@/components/SubTitle/TheSubTitle';
import { useState } from 'react';

const IntroEpisodePage = () => {
  const { isShowing: isShowingAbout, toggle: toggleAbout } = useModal();
  const { isShowing: isShowingWarning, toggle: toggleWarning } = useModal();
  const { isShowing: isShowingReturnExperience, toggle: toggleReturnExperience } = useModal();

  const [currentSubtitle, setCurrentSubtitle] = useState(null);

  const subTitlesArray = [
    {
      id: 0,
      text: "Je suis un subtitle et je m'affiche 5 secondes oulalala", 
      duration: "5000",
      appear: false
    },
    {
      id: 1,
      text: "Je suis un subtitle et je m'affiche 3 secondes oulalala", 
      duration: "3000",
      appear: false
    }
  ]

  const modalTextAbout = [{
    title: "À propos",
    content: "Le projet a été réalisé dans le cadre du master de design et développement de l’innovation interactive. <br/>Ce projet a pour vocation de mettre en lumière les enjeux contemporains de l’artisanat.",
    credits: "Réalisé par deux développeurs Juliette Sage--Aubriot, Aurélien Hémidy et trois designers Eloïse Luna, Vincent Calas et Chloélia Breton",
    buttons: false
  }]

  const modalTextWarning = [{
    title: "Attention, <br/> vous allez quittez l’expérience.",
    content: "Vous allez revenir au menu de choix des épisodes. <br/>Souhaitez-vous vraiment quittez l’expérience ?",
    buttons: true
  }]

  const modalReturnExperience = [{
    title: "Reprendre l’expérience",
    content: "Souhaitez-vous reprendre là ou vous en étiez dans l’atelier ?",
    buttons: true
  }]

  return (
    <section className={styles["page-intro"]}>
      {/* <TheBreadcrumb/> */}
      <button onClick={() => setCurrentSubtitle(0)}>0</button>
      <button onClick={() => setCurrentSubtitle(1)}>1</button>
      <div className={`${styles["page-intro_container"]}`}>
        <div className={`${styles["page-intro__inner"]}`}>

          <div className={`${styles["btn_container"]}`}>
            <div className={`${styles["btn__inner"]}`}>
              <button className={`btn btn-about ${isShowingAbout === true && styles.disabled}`} onClick={toggleAbout}>À propos</button>
            </div>
          </div>

          <div className={`${styles["main_container"]}`}>
            <div className={`${styles["main__inner"]}`}>
              <div className={`${styles.content}`}>
                <h1>Regards d’artisans</h1>
                <p>Regards d’artisans nous invite à nous glisser dans la peau d’un apprentit artisan, dans le cadre intime d’un ateliers, lieu de partage d’un savoir-faire.</p>

                <div className={`${styles.immersion}`}>
                  <span className={`${styles.hearphone}`}><i className="fal fa-headphones-alt"></i></span>
                  <span>Utilisez un casque pour plus d’immersion !</span>
                </div>

                <div className={`${styles.discover}`}>
                  <div className={`link link-primary ${styles['discover_inner']}`}>
                    <Link href="/menu">
                      <a><span>Découvrir</span></a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
            {/* <button onClick={toggleReturnExperience}>Return experience</button> */}

          <TheModal isShowing={isShowingAbout} hide={toggleAbout} content={modalTextAbout} />
          {/* <TheModal isShowing={isShowingWarning} hide={toggleWarning} content={modalTextWarning} />
            <TheModal isShowing={isShowingReturnExperience} hide={toggleReturnExperience} content={modalReturnExperience} /> */}
        </div>
        {
          subTitlesArray.map((subtitle, i) => {
            return <TheSubTitle content={subtitle} key={i} currentSubtitle={currentSubtitle}/>
          })
        }
        <TheVolume />
      </div>
    </section>
  )
}

export default IntroEpisodePage
