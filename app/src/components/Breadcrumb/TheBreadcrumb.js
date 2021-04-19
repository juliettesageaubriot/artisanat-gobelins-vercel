import styles from './styles.module.scss'

const TheBreadcrumb = ({ isShowing }) => {

  return (
    // ${isShowing === true ? styles["breadcrumb_visible"] : styles["breadcrumb_hide"]}
    <div className={`${styles["breadcrumb_container"]} breadcrumb_container show`} data-step="0">
      <div className={`${styles["breadcrumb__inner"]} breadcrumb__inner`}>
        <h2 className="breadcrumb-title">La découpe du tracé</h2>
        <ul className='list-breadcrumb' data-length={5}>
          <li></li>
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
