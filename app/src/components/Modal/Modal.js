
import styles from './styles.module.scss'

const Modal = ({ isShowing, hide }) => {
  return (
    <>
      {isShowing
        ?
        <div className={styles['intro-modal_container']}>
          <div className={styles['intro-modal__inner']}>
            <div className={styles.modal}>

              <button
                className={`${styles.btn} ${styles["btn_close"]} btn btn_no-text`}
                onClick={hide}
              >
                <span className={styles['btn__icon']}>
                  <i className="fal fa-times"></i>
                  {/* <i className="fas fa-times"></i> */}
                </span>
                <span className={`btn__label`}>Close</span>
              </button>

              <h2 className={styles.title}>À propos</h2>
              <p className={styles.intro}>Le projet a été réalisé dans le cadre du master de design et développement de l’innovation interactive.<br />
              Ce projet a pour vocation de mettre en lumière les enjeux contemporains de l’artisanat.</p>
              <p className={styles.credits}>Réalisé par deux développeurs Juliette Sage--Aubriot, Aurélien Hémidy et trois designers Eloïse Luna, Vincent Calas et Chloélia Breton</p>
            </div>
          </div>
          <div className={styles.overlay}></div>
        </div>
        : null
      }
    </>
  )
}

export default Modal
