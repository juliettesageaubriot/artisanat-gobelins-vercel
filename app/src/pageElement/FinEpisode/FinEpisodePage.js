import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import TheModal from '@components/Modal/TheModal'
import useModal from '@hooks/useModal'
import TheAudioSnippet from '@components/AudioSnippet/TheAudioSnippet';

import data from '@assets/data/interviews.json'

import styles from "./styles.module.scss";

const FinEpisodePage = () => {

  const { isShowing: isShowingAbout, toggle } = useModal();

  const [isPlay, setIsPlay] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1)
  const [isMutedSound, setIsMutedSound] = useState(false)

  const slider1 = useRef();
  const parentRef = useRef(null);

  // let slides1
  let video

  if (typeof window !== 'undefined') {
    video = document.querySelectorAll('.videoElm')
  }

  useEffect(() => {
    const buttonsElement = document.querySelectorAll('button')
    buttonsElement.forEach((elm) => {
      elm.addEventListener('click', () => {
        setIsMutedSound(true)
      })
    })
  }, [])


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
        <img src="/assets/images/ui/pictos-ux/scroll.gif" alt="Picto UX pour le scroll" className={`picto-ux ${styles.scroll}`} id="scroll" />
      </div>
    ),
    customPaging: i => (
      <button></button>
    ),
    beforeChange: () => {
      // slides1.classList.add('anim-fade')
      video.forEach((elm) => {
        elm.pause();
        setIsPlay(false);
      })
    },
    afterChange: (event) => {
      // slides1.classList.remove('anim-fade')
      video.forEach((elm) => {
        elm.pause();
        setIsPlay(false);
      })
      setIsMutedSound(false)
      setCurrentSlide(event + 1)
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
      slider1 && slider1.current.slickNext();
    } else if (e.deltaY < 0) {
      slider1 && slider1.current.slickPrev();
    }
  };

  const handleClick = (event) => {
    video.forEach((elm) => {
      if (event.target.id == elm.id) {
        elm.play();
        setIsPlay(true);
      }
    })
  }

  return (
    <>
      <section className={styles["page-fin"]}>
        <div className={styles["page-fin_container"]}>
          <div className={styles.head}>
            <h1>De l'atelier d'initiation... <br /> <span>À la rencontre des professionnels</span></h1>

            <div className={`${styles["btn_container"]}`}>
              <div className={`${styles["btn__inner"]}`}>
                <button className={`btn btn-about ${isShowingAbout === true && styles.disabled}`} data-color="blanc" onClick={toggle}>
                  <span>À propos</span>
                </button>
              </div>
            </div>
          </div>

          <div
            className={styles.sliders}
            ref={parentRef}>

            <div className={styles.container}>
              <Slider
                {...settings1}
                ref={slider1}
              >
                {data.map((elm, i) => {
                  return (
                    <div key={i} className={`${styles.sliders}`}>
                      <div className={styles.left}>
                        <p className={styles.citation}>" {elm.content} "</p>
                        <div className={styles.maitre}>
                          <img src={elm.img} />
                          <p><span>Marion</span>,<br />{elm.signature}</p>
                        </div>
                      </div>


                      <div className={`${styles.right}`}>
                        <div className={styles.video}>
                          <video id={elm.id}
                            className='videoElm'
                            controls={isPlay === true ? true : false}>
                            <source src={elm.video} />
                          Sorry, your browser doesn't support embedded videos.
                          </video>
                          <button
                            id={elm.id}
                            className={`${styles.play} ${isPlay === false ? '' : styles.invisible}`}
                            onClick={handleClick}>
                            <span>
                              <i id={elm.id} className="fas fa-play"></i>
                            </span>
                          </button>
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


                          <div className={styles["the-craft"]}>
                            <div className={styles.head}>
                              <h2 className={styles["en-savoir-plus"]}>En savoir plus <br />
                                <span>The Craft Project</span>
                              </h2>
                            </div>
                            <p>Cette association est un moteur du #sauvonslesmetiersdarts.</p>

                          </div>


                          <div className={styles.link}>
                            <a href={elm.link} target="_blank">{elm.linkName}</a>
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

        <TheModal isShowing={isShowingAbout} hide={toggle} content={modalTextAbout} />
        <div className={`${styles['overlay-gribouillis']}`}></div>
      </section>

      <TheAudioSnippet sound_url={`/assets/audios/itw/citation_0${currentSlide}.mp3`} play={isPlay === true || isMutedSound === true ? false : true} specificVolume={1} />
    </>
  )
}

export default FinEpisodePage
