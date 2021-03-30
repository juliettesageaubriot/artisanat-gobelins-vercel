import IntroEpisodePage from '@pageElement/introEpisodePage/IntroEpisodePage';
import TheSeo from '@components/Structure/Seo/TheSeo'

const IntroEpisode = () => {

  return (
    <>
      <TheSeo
        title="regards d'artisans"
        description="description du projet"
      />
      <IntroEpisodePage />
    </>
  )
}

export default IntroEpisode
