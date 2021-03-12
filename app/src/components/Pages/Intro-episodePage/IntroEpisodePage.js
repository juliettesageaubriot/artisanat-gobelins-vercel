import styles from "./styles.module.scss";

const IntroEpisodePage = () => {
    return ( 
        <div className={styles.introContainer}>
            <h1 className={styles.title}>Regards d'artisans</h1>
            <p className={styles.text}>Regards d'artisans nous invite à nous glisser dans la peau d'un parrentit artisan, dans le cadre intime d'un atelier, lieu de partage d'un savoir-faire.</p>
            <div className="casque">
                <img src="" alt=""/>
                <p>Utilisez un casque pour plus d'immersion !</p>
            </div>
            <a className={styles.cta} href="/">
                Découvrir
            </a>
            <div className="about">
                
            </div>
        </div>
     );
}
 
export default IntroEpisodePage;