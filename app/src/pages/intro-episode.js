import useModal from '../hooks/useModal'
import Modal from '../components/Modal/Modal'
import Seo from '../components/Structure/Seo/Seo'

const IntroEpisode = () => {
  const { isShowing : isShowingAbout, toggle : toggleAbout } = useModal();
  const { isShowing : isShowingWarning, toggle : toggleWarning } = useModal();
  const { isShowing : isShowingReturnExperience, toggle : toggleReturnExperience } = useModal();

  const modalTextAbout = [{
    title: "À propos",
    content: "Le projet a été réalisé dans le cadre du master de design et développement de l’innovation interactive. <br/>Ce projet a pour vocation de mettre en lumière les enjeux contemporains de l’artisanat.",
    credits: "Réalisé par deux développeurs Juliette Sage--Aubriot, Aurélien Hémidy et trois designers Eloïse Luna, Vincent Calas et Chloélia Breton",
    buttons: false
  }]

  const modalTextWarning = [{
    title: "Attention, <br/> vous allez quittez l’expérience.",
    content: "Vous allez revenir au menu de choix des épisodes. <br/>Souhaitez-vous vraiment quittez l’expérience ?",
    buttons: true
  }]

  const modalReturnExperience = [{
    title: "Reprendre l’expérience",
    content: "Souhaitez-vous reprendre là ou vous en étiez dans l’atelier ?",
    buttons: true
  }]

  return (
    <>
      <Seo
        title="regards d'artisans"
        description="description du projet"
      />
    <button onClick={toggleAbout}>About</button>
      <button onClick={toggleWarning}>Warning</button>
      <button onClick={toggleWarning}>Warning</button>
      <button onClick={toggleReturnExperience}>Return experience</button>

      <Modal isShowing={isShowingAbout} hide={toggleAbout} content={modalTextAbout} />
      <Modal isShowing={isShowingWarning} hide={toggleWarning} content={modalTextWarning} />
      <Modal isShowing={isShowingReturnExperience} hide={toggleReturnExperience} content={modalReturnExperience} />

    </>
  )
}

export default IntroEpisode
