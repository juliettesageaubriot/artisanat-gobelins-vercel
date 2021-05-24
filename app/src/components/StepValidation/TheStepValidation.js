import { useState } from "react";
import styles from "./styles.module.scss";

const TheStepValidation = ({ title, btnText, destination, onClick, appear }) => {

    const [stepAppear, setStepAppear] = useState(true);

    const handleClick = () => {
      onClick();
      setStepAppear(false)
    }

    return ( 
       <div className={`${styles["stepValidationContainer"]} ${appear && stepAppear ? styles["appear"] : ""}`}>
        <h1>Bravo tu as réussi, </h1>
        <h4> direction { destination } !</h4>
        <img src="/assets/images/ui/validation/applause_V01.gif" alt="success clapping"/>
        <button className={`link link-primary ${styles["stepValidationContainer__validationBtn"]}`} onClick={ handleClick }>{ btnText }</button>
       </div>
     );
}
 
export default TheStepValidation;