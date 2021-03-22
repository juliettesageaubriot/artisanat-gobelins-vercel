
import styles from './styles.module.scss'

const TheModal = ({ isShowing, hide, content }) => {


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

              {content.map((item, k) => {
                return (
                  <div key={k}>
                    <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: item.title }}></h2>
                    <p className={styles.intro} dangerouslySetInnerHTML={{ __html: item.content }} ></p>
                    <p className={styles.credits} dangerouslySetInnerHTML={{ __html: item.credits }}></p>

                    <div className={`${styles.buttons} ${item.buttons === false && styles.none}`}>
                      <button
                        className={`${styles.btn} ${styles["btn_yes"]} btn`}
                        onClick={hide}
                      >
                        <span className={styles['btn__icon']}>
                        </span>
                        <span className={`btn__label ${styles['btn__label']}`}>Oui</span>
                      </button>
                      <button
                        className={`${styles.btn} ${styles["btn_no"]} btn`}
                        onClick={hide}
                      >
                        <span className={styles['btn__icon']}>
                        </span>
                        <span className={`btn__label ${styles['btn__label']}`}>Non</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.overlay}></div>
        </div>
        : null
      }
    </>
  )
}

export default TheModal
