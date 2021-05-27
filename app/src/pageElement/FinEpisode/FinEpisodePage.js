import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import TheModal from '@components/Modal/TheModal'
import useModal from '@hooks/useModal'

import data from '@assets/data/interviews.json'

import styles from "./styles.module.scss";

const FinEpisodePage = () => {
  const { isShowing: isShowingAbout, toggle: toggleAbout } = useModal();

  // const slider = useRef();
  const sliderRef = useRef();
  const parentRef = useRef(null);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let slider1 = []
  let slider2 = []


  const modalTextAbout = [{
    title: "À propos",
    slug: "Crédits",
    content: "Ce projet a été réalisé dans le cadre du master de design et développement de l'innovation interactive. Il a été crée par deux développeurs <span>Juliette Sage--Aubriot, Aurélien Hémidy</span> et trois designers <span>Éloïse Luna, Vincent Calas et Chloélia Breton.</span>",
    credits: "Un merci particulier pour tous les intervenants qui nous ont aidés tout au long du projet, à la comédienne <span>Roxane Fomberteau</span> qui a prêté sa voix à notre maître d'apprentissage, à <span>Louise Doublet</span> qui nous a accompagné dans la découverte du métier de vitrailliste, et à <span>Adrien Melchior</span> pour la création musicale.",
    typographies: "Typographies : cirka, fonderie pangram pangram",
    gobelins: '/assets/images/logo/logo_gobelins.png',
    buttons: false
  }]

  useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
  }, [slider1, slider2,])

  const settings1 = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true
  };

  const settings2 = {
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true
  };


  useEffect(() => {
    if (!parentRef.current) {
      return;
    }
    parentRef.current.addEventListener('wheel', (e) => { handleScroll(e) });
    return (() => {
      parentRef.current.removeEventListener('wheel', (e) => handleScroll(e));
    });
  }, [parentRef]);


  const handleScroll = (e) => {
    console.log(e);
    if (e.deltaY > 0) {
      nav1 && nav1.slickPrev();
      nav2 && nav2.slickPrev();
    } else if (e.deltaY < 0) {
      nav1 && nav1.slickNext();
      nav2 && nav2.slickNext();
    }
  };


  return (
    <section className={styles["page-fin"]}>
      <div className={styles["page-fin_container"]}>

        <div className={styles.head}>
          <h1>De l'atelier d'initiation... <br /> <span>À la rencontre des professionnels</span></h1>
          <div className={`${styles["btn_container"]}`}>
            <div className={`${styles["btn__inner"]}`}>
              <button className={`btn btn-about ${isShowingAbout === true && styles.disabled}`} onClick={toggleAbout}><span>À propos</span></button>
            </div>
          </div>
        </div>


        <div
        className={styles.sliders}
          ref={parentRef}
        >
          <Slider
            {...settings1}
            asNavFor={nav2}

            // ref={sliderRef}
            ref={slider => (slider1 = slider)}
          >
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
          </Slider>

          <Slider
            {...settings2}
            asNavFor={nav1}

            // ref={sliderRef}
            ref={slider => (slider2 = slider)}

            swipeToSlide={true}
            focusOnSelect={true}
          >
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
          </Slider>

        </div>


        <div className={styles.footer}>
          <div className={`${styles["btn_container"]}`}>
            <a href="/" className={`link link-secondary link-black ${styles['link-before']} ${styles['link-black']}`}>
              <span>Épisodes</span>
            </a>
          </div>
        </div>
      </div>

      <TheModal isShowing={isShowingAbout} hide={toggleAbout} content={modalTextAbout} />
      <div className={`${styles['overlay-gribouillis']}`}></div>
    </section>
  )
}

export default FinEpisodePage
