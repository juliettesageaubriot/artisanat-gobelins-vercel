import styles from './styles.module.scss'

const TheOverlayDesktop = () => {

  return (
    <div className={`${styles.overlay} ${styles['overlay-desktop']}`}>
      <div className={`${styles['overlay_container']}`}>
        <img src="/assets/images/logo/logo_regards_dartisans.png" />
        <p className={`upp`}>L'expérience est disponible sur ordinateur uniquement !</p>
      </div>
    </div>
  )

}

export default TheOverlayDesktop;