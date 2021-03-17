import IntroEpisodePage from '../PageElement/introEpisodePage/IntroEpisodePage';
import Seo from '../components/Structure/Seo/Seo'

const IntroEpisode = () => {

  return (
    <>
      <Seo
        title="regards d'artisans"
        description="description du projet"
      />
      <IntroEpisodePage />
    </>
  )
}

export default IntroEpisode
