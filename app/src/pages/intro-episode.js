import useModal from '../hooks/useModal'
import Modal from '../components/Modal/Modal'
import Seo from '../components/Structure/Seo/Seo'

const IntroEpisode = () => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <Seo 
      title="regards d'artisans"
      description="description du projet"
      />
      <button onClick={toggle} >CLICK</button>
      <Modal isShowing={isShowing} hide={toggle}/>
    </>
  )
}

export default IntroEpisode
