import { useEffect, useRef, useState } from "react";
import ThePrimaryButton from "@components/PrimaryButton/ThePrimaryButton";
import TheVolume from "@components/VolumeSettings/TheVolume";
import styles from "./styles.module.scss";

const FinEpisodePage = () => {
  const [indexCarousel, setIndexCarousel] = useState(2)
  let positionOneX;
  let positionOneY;
  let positionTwoX;
  let positionTwoY;
  let positionThreeX;
  let positionThreeY;

  const carouselContainer = useRef(null);
  const imageCarousel = useRef(null);
  const labelCarouselOne = useRef(null);
  const labelCarouselTwo = useRef(null);
  const labelCarouselThree = useRef(null);


  useEffect(() => {
    getNewCoordinates(labelCarouselOne, labelCarouselTwo, labelCarouselThree);
  }, [])

  const getNewCoordinates = (previousLabel, currentLabel, nextLabel) => {
    positionOneX = 20;
    positionOneY = carouselContainer.current.getBoundingClientRect().top - carouselContainer.current.getBoundingClientRect().top + 20

    positionTwoX = imageCarousel.current.getBoundingClientRect().left - currentLabel.current.getBoundingClientRect().left;
    positionTwoY = imageCarousel.current.getBoundingClientRect().top - carouselContainer.current.getBoundingClientRect().top - currentLabel.current.getBoundingClientRect().height;

    positionThreeX = 20;
    positionThreeY = carouselContainer.current.getBoundingClientRect().bottom - carouselContainer.current.getBoundingClientRect().top - nextLabel.current.getBoundingClientRect().height;

    previousLabel.current.style.transform = `translate3d(${positionOneX}px, ${positionOneY}px, 0) scale(1)`;
    currentLabel.current.style.transform = `translate3d(${positionTwoX}px, ${positionTwoY}px, 0) scale(1.5)`;
    nextLabel.current.style.transform = `translate3d(${positionThreeX}px, ${positionThreeY}px, 0) scale(1)`;

    previousLabel.current.style.opacity = .5;
    currentLabel.current.style.opacity = 1;
    nextLabel.current.style.opacity = .5;

    setTimeout(() => {
      setTransitions();
    }, 400);
  };

  const setTransitions = () => {
    labelCarouselOne.current.style.transition = ".3s transform ease-in-out, .5s opacity ease-in-out";
    labelCarouselTwo.current.style.transition = ".3s transform ease-in-out, .5s opacity ease-in-out";
    labelCarouselThree.current.style.transition = ".3s transform ease-in-out, .5s opacity ease-in-out";
  }

  const handleLabelOneCurrent = () => {
    //label ONE CURRENT
    if(indexCarousel === 1) 
      return
    setIndexCarousel(1);
    getNewCoordinates(labelCarouselThree, labelCarouselOne, labelCarouselTwo);
  };

  const handleLabelTwoCurrent = () => {
    //label THREE CURRENT
    if(indexCarousel === 2) 
      return
    setIndexCarousel(2);
    getNewCoordinates(labelCarouselOne, labelCarouselTwo, labelCarouselThree);
  };

  const handleLabelThreeCurrent = () => {
    //label TWO CURRENT
    if(indexCarousel === 3) 
      return
    setIndexCarousel(3);
    getNewCoordinates(labelCarouselTwo, labelCarouselThree, labelCarouselOne);
  };
  

  return (
    <section className={styles["page-fin"]}>
      <div className={styles["page-fin__carousel-container"]}>
          <h1 className={styles["page-fin__heading"]}> De l'atelier d'initiation...</h1>
          <div className={styles["carousel-inner"]}>
            <div className={styles["carousel-inner__counter"]}>
              <div className={styles["counter"]}>
                <p>{ indexCarousel }</p>
                <div className={styles["counter__separator"]}></div>
                <p>2</p>
              </div>
              <img src="assets/images/carousel-event.png" alt=""/>
            </div>
            <div className={styles["carousel-inner__content"]} ref={carouselContainer}>
              <p ref={labelCarouselOne} onClick={handleLabelOneCurrent}>“ Maintenant notre métier n'est pas si old school qu'on voudrait le laisser croire ” 1</p>
              <p ref={labelCarouselTwo} onClick={handleLabelTwoCurrent}>" C'est dommage que [l’artisanat] soit encore aux yeux des conseillers d'orientation la voie de secours " 2</p>
              <p ref={labelCarouselThree} onClick={handleLabelThreeCurrent}>“ On dit dans le métier qu'il faut une dizaine d'années, et c'est pas avec la réduction des heures de formation qu'on tend vers cela ” 3</p>
              <img src="assets/images/vitrailliste.png" className={styles["vitrailliste"]} alt=""/>
              <img className={styles["background"]} ref={imageCarousel} alt=""/>
            </div>
          </div>
          <div className={styles["page-fin__footer-container"]}>
              <ThePrimaryButton label="Episodes" to={"/"} active={false}/>
              <ThePrimaryButton label="Episode 2, le joailler ->" to={"/"} active={false} />
              <TheVolume absolute={false} />
          </div>
      </div>
      <div className={styles["page-fin__video-container"]}>
        <h1 className={`${styles["page-fin__heading"]} ${styles["--white"]}`}> ... A la rencontre des professionnels</h1>
        <div className={styles["video-inner"]}>
          <h4 className={styles["video-inner__subHeading"]}>Une dizaine d'années pour devenir vitrailliste ?</h4>
          <div className={styles["video-inner__content"]}>
            <div className={styles["avatar"]}>
              <div className={styles["avatar__img"]}>
                <img src="" alt=""/>
              </div>
              <h6>Marion Gosselin</h6>
              <p>Vitrailliste à l'atelier de Paris</p>
            </div>
            <div className={styles["avatar"]}>
              <div className={styles["avatar__img"]}>
                <img src="" alt=""/>
              </div>
              <h6>Louise Doublet</h6>
              <p>étudiante DNMADE à l'ENSAAMA</p>
            </div>
            <div className={styles["avatar"]}>
              <div className={styles["avatar__img"]}>
                <img src="" alt=""/>
              </div>
              <h6>Maxime Gauthier</h6>
              <p>maître d'apprentissage à l'atelier de Chartres</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinEpisodePage
