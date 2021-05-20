import styles from "./styles.module.scss"

const ThePressionUX = () => {
    return ( 
         <div id="pressureGauge" className={styles["pressureGauge"]}>
             <div id="scale-pressure" className={styles["pressureGauge__scale-pressure"]}></div>
             <div className={styles["pressureGauge__point"]}></div>
             <div className={styles["pressureGauge__circle1"]}></div>
             <div className={styles["pressureGauge__circle2"]}></div>
             <div className={styles["pressureGauge__circle3"]}></div>
         </div>
     );
}
 
export default ThePressionUX;