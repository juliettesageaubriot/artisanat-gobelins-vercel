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
          <div className={styles["vitrail"]} ref={imagesRefVitrail} >
            <img src="assets/images/vitrail.png" className={styles['img']} alt="A vitrail"/>
            {/* <Image
              src="/assets/images/vitrail.png"
              alt="A vitrail"
              layout='fill'
              className={styles['img']}
            /> */}
          </div>
          <div className={styles["violon"]} ref={imagesRefViolon}>
            <img src="/assets/images/violon.png" className={styles["img"]} alt="A violon"/>
            {/* <Image
              src="/assets/images/violon.png"
              alt="A violon"
              layout='fill'
              className={styles['img']}
            /> */}
          </div>
          <div className={styles["chapeau"]} ref={imagesRefChapeau}>
            <img src="/assets/images/chapeau.png" className={styles["img"]} alt="A hat"/>
            {/* <Image
              src="/assets/images/chapeau.png"
              alt="A hat"
              layout='fill'
              className={styles['img']}
            /> */}
          </div>
          <div className={styles["bijoux"]} ref={imagesRefBijoux}>
            <img src="/assets/images/bijoux.png" className={styles["img"]} alt="A bijoux"/>
            {/* <Image
              src="/assets/images/bijoux.png"
              alt="A bijoux"
              layout='fill'
              className={styles['img']}
            /> */}
          </div>
        </div>
        
    </section>
   );
}
 
export default ChoixEpisodePage;