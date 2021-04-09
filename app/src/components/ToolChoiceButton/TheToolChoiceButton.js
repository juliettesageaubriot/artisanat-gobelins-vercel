import { useEffect, useState } from 'react';
import styles from './styles.module.scss'

const TheToolChoiceButton = ({ icon, onClickTool, onClickInfo }) => {

    return ( 
        <div className={styles["tool-choice_container"]}>
            <div className={styles["tool-choice_container__inner"]} onClick={onClickTool}>
                <img src={icon} alt=""/>
            </div>
            <div className={styles["tool-choice_container__plus-info"]} onClick={onClickInfo}>
                <div className={styles["tool-choice_container__plus-info___vertical-bar"]}></div>
                <div className={styles["tool-choice_container__plus-info___horizontal-bar"]}></div>
            </div>
        </div>
     );
}
 
export default TheToolChoiceButton;