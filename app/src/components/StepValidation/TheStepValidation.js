import styles from "./styles.module.scss";

const TheStepValidation = ({ title, onClick }) => {
    return ( 
       <>
        <h1> { title } </h1>
        <button onClick={ onClick }>J'ai fini !</button>
       </>
     );
}
 
export default TheStepValidation;