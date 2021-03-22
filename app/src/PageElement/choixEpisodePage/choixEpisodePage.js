import styles from "./styles.module.scss"
import { useRef } from 'react';

const ChoixEpisodePage = () => {
    const imagesRefGuitar = useRef(null);
  const imagesRefPoterie = useRef(null);
  const imagesRefVitrail = useRef(null);
  const imagesRefChapeau = useRef(null);

  const handleMouseMove = (e) => {
    imagesRefGuitar.current.style.transform = `translate(-${e.clientX * .01}px, -${e.clientY * .01}px)`;
    imagesRefPoterie.current.style.transform = `translate(-${e.clientX * .01}px, -${e.clientY * .01}px)`;
    imagesRefVitrail.current.style.transform = `translate(-${e.clientX * .01}px, -${e.clientY * .01}px)`;
    imagesRefChapeau.current.style.transform = `translate(-${e.clientX * .01}px, -${e.clientY * .01}px)`;
  }

  return ( 
    <section className={styles["Menu_container"]} onMouseMove={handleMouseMove}>
        <div className={styles["Menu_container_guitar"]} >
          <img className={styles["img"]}  alt="A guitar" ref={imagesRefGuitar}/>
        </div>
        <div className={styles["Menu_container__poterie"]}>
          <img className={styles["img"]}  alt="A poterie" ref={imagesRefPoterie}/>
        </div>
        <div className={styles["Menu_container___vitrail"]}>
          <img className={styles["img"]}  alt="A vitrail" ref={imagesRefVitrail}/>
        </div>
        <div className={styles["Menu_container___chapeau"]}>
          <img className={styles["img"]}  alt="chapeau" ref={imagesRefChapeau}/>
        </div>
    </section>
   );
}
 
export default ChoixEpisodePage;