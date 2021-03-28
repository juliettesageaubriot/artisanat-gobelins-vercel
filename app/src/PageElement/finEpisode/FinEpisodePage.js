import useModal from '@hooks/useModal'
import TheModal from '@components/Modal/TheModal'
import TheVolume from '@components/VolumeSettings/TheVolume';
import Link from 'next/link'

import styles from "./styles.module.scss"

const IntroEpisodePage = () => {
  const { isShowing: isShowingAbout, toggle: toggleAbout } = useModal();

  const modalTextAbout = [{
    title: "À propos",
    content: "Le projet a été réalisé dans le cadre du master de design et développement de l’innovation interactive. <br/>Ce projet a pour vocation de mettre en lumière les enjeux contemporains de l’artisanat.",
    credits: "Réalisé par deux développeurs Juliette Sage--Aubriot, Aurélien Hémidy et trois designers Eloïse Luna, Vincent Calas et Chloélia Breton",
    buttons: false
  }]

  return (
    <section className={styles["page-intro"]}>
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
                  <div className={`${styles['discover_inner']}`}>
                    <Link href="/menu">
                      <a><span>Découvrir</span></a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TheModal isShowing={isShowingAbout} hide={toggleAbout} content={modalTextAbout} />
        </div>
        <TheVolume />
      </div>
    </section>
  )
}

export default IntroEpisodePage
