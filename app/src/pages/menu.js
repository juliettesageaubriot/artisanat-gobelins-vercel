import ChoixEpisodeAtelierPage from '@/pageElement/ChoixEpisodePage/ChoixEpisodePage'
import TheSeo from '@components/Structure/Seo/TheSeo'

const Menu = () => {
  return (
    <>
      <TheSeo 
      title="regards d'artisans"
      description="description du projet"
      />
      <ChoixEpisodeAtelierPage />
    </>
  )
}

export default Menu
