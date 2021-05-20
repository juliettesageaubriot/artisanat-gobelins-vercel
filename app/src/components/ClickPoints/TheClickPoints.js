import styles from "./styles.module.scss";

const TheClickPoints = () => {

    return ( 
        <>
        <div id="clickPointsOne" className={styles["clickPointsOne"]}></div>
        <div id="clickPointsTwo" className={styles["clickPointsTwo"]}></div>
        <div id="clickPointsThree" className={styles["clickPointsThree"]}></div>
        </>
     );
}
 
export default TheClickPoints;