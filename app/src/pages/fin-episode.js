import Seo from '@/components/Seo/Seo'
import useStore from '@/helpers/store'

const IntroEpisode = () => {
  useStore.setState({ title: 'Sphere' })
  return (
    <>
      <Seo 
      title="regards d'artisans"
      description="description du projet"
      />
      <h1>IntroEpisode</h1>
    </>
  )
}

export default IntroEpisode
