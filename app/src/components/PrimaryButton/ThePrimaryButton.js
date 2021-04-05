import Link from 'next/link'
import styles from "./styles.module.scss";

const ThePrimaryButton = ({ label, active = true , to}) => {
    return ( 
        <Link href={to} >
            <a className={`${styles["button-container"]} ${!active ? styles["button-container--inactive"] : ""}`}>
                { label }
            </a>
        </Link>
     );
}
 
export default ThePrimaryButton;