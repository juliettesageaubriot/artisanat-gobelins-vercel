import Link from 'next/link'

import styles from './styles.module.scss';

const MenuModal = ({ id, title, caption, duration, date, left, top, disponibility, url }) => {
  return (
    <div id={`modal-menu-${id}`} className={`invisible menu-modals menu-modal_container ${styles['menu-modal_container']}`} data-left={left} data-top={top}>
      <div className={styles['menu-modal__inner']}>
        <div className={styles.modal}>

          <div className={styles.head}>
            <span className={`${styles.episode} upp`}>Épisode {id}</span>
            <span className={styles.circle}></span>
            <span>{duration} minutes</span>
          </div>

          <div className={styles.content}>
            <h1>{title}</h1>
            <span>{caption}</span>
          </div>

          <div className={styles.bottom}>
            <Link href={url}>
              <a className={`${styles.link} link link-primary ${disponibility === true ? "" : "nodispo"}`}>
                {disponibility === true ?
                  <span>J'entre dans l'atelier</span>
                  :
                  <span>L'atelier est fermé</span>
                }
              </a>
            </Link>
            <span className={`${styles.disponible} upp`}>Disponible {disponibility === true && "depuis"} le {date}</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MenuModal;