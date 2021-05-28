import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import TheModal from '@components/Modal/TheModal'
import useModal from '@hooks/useModal'

import data from '@assets/data/interviews.json'

import styles from "./styles.module.scss";

const FinEpisodePage = () => {
  const { isShowing: isShowingAbout, toggle: toggleAbout } = useModal();

  const slider1 = useRef();
  const slider2 = useRef();

  const sliderRef = useRef();
  const parentRef = useRef(null);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let slides1
  let slides2
  if (typeof window !== 'undefined') {
    slides1 = document.querySelector('.slick-slider1')
    slides2 = document.querySelector('.slick-slider2')
  }

  useEffect(() => {
    setNav1(slider1.current)
  }, [slider1.current])

  const modalTextAbout = [{
    title: "À propos",
    slug: "Crédits",
    content: "Ce projet a été réalisé dans le cadre du master de design et développement de l'innovation interactive. Il a été crée par deux développeurs <span>Juliette Sage--Aubriot, Aurélien Hémidy</span> et trois designers <span>Éloïse Luna, Vincent Calas et Chloélia Breton.</span>",
    credits: "Un merci particulier pour tous les intervenants qui nous ont aidés tout au long du projet, à la comédienne <span>Roxane Fomberteau</span> qui a prêté sa voix à notre maître d'apprentissage, à <span>Louise Doublet</span> qui nous a accompagné dans la découverte du métier de vitrailliste, et à <span>Adrien Melchior</span> pour la création musicale.",
    typographies: "Typographies : cirka, fonderie pangram pangram",
    gobelins: '/assets/images/logo/logo_gobelins.png',
    buttons: false
  }]

  const settings1 = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    // slidesToScroll: 1,
    className: 'slick-slider1',
    vertical: true,
    appendDots: dots => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <button></button>
    ),
    beforeChange: () => {
      slides1.classList.add('anim-fade')
    },
    afterChange: () => {
      slides1.classList.remove('anim-fade')
    }
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
    if (e.deltaY > 0) {
      slider1 && slider1.current.slickPrev();
    } else if (e.deltaY < 0) {
      slider1 && slider1.current.slickNext();
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

          <div className={styles.container}>
            <Slider
              {...settings1}
              ref={slider1}
            >
              {data.map((elm, i) => {
                return (
                  <div key={i} className={`${styles.sliders}`}>
                    <div className={styles.slider1}>
                      <p className={styles.citation}>" {elm.content} "</p>
                      <div className={styles.maitre}>
                        <img src={elm.img} />
                        <span>{elm.signature}</span>
                      </div>
                    </div>


                    <div className={`slider2 ${styles.slider2}`}>
                      <div className={styles.video}>
                        <video controls>
                          <source src={elm.video} />
                          Sorry, your browser doesn't support embedded videos.
                          </video>
                      </div>

                      <div className={styles['content-itw']}>
                        <h2>{elm.question}</h2>

                        <p className={styles.itw}>
                          <span>Interview</span> avec
                        </p>

                        <div className={styles.person}>
                          <span>{elm.person}</span> <br />
                          <p>{elm.job}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                )
              })}
            </Slider>


          </div>

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
