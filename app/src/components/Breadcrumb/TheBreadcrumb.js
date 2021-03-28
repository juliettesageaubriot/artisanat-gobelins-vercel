
import styles from './styles.module.scss'

const TheBreadcrumb = () => {

  return (
    <div className={`${styles["breadcrumb_container"]}`}>
      <div className={`${styles["breadcrumb__inner"]}`}>
        <h2>La découpe du tracé</h2>
        <ul data-length={5}>
          <li className={styles.actived}></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default TheBreadcrumb