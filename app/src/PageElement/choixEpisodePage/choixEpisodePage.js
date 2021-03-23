import styles from "./styles.module.scss"
import { useRef } from 'react';

const ChoixEpisodePage = () => {
  const imagesRefVitrail = useRef(null);
  const imagesRefViolon = useRef(null);
  const imagesRefChapeau = useRef(null);
  const imagesRefBijoux = useRef(null);

  const handleMouseMove = (e) => {
    imagesRefViolon.current.style.transform = `translate(-${e.clientX * .01}px, -${e.clientY * .01}px)`;
    imagesRefBijoux.current.style.transform = `translate(-${e.clientX * .01}px, -${e.clientY * .01}px)`;
    imagesRefVitrail.current.style.transform = `translate(-${e.clientX * .01}px, -${e.clientY * .01}px)`;
    imagesRefChapeau.current.style.transform = `translate(-${e.clientX * .01}px, -${e.clientY * .01}px)`;
  }

  return ( 
    <section className={styles["Menu_container"]} onMouseMove={handleMouseMove}>
        <h1>Les quatres saisons de l'artisanat</h1>

        <div className={styles["Menu_container_parallaxSection"]}>
          <div className={styles["vitrail"]} >
            <img className={styles["img"]} alt="A vitrail" ref={imagesRefVitrail}/>
          </div>
          <div className={styles["violon"]}>
            <img className={styles["img"]} alt="A violon" ref={imagesRefViolon}/>
          </div>
          <div className={styles["chapeau"]}>
            <img className={styles["img"]} alt="A hat" ref={imagesRefChapeau}/>
          </div>
          <div className={styles["bijoux"]}>
            <img className={styles["img"]} alt="A bijoux" ref={imagesRefBijoux}/>
          </div>
        </div>
        
    </section>
   );
}
 
export default ChoixEpisodePage;