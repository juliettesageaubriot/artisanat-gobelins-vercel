import Seo from '@/components/Seo/Seo'
import useStore from '@/helpers/store'

const FinEpisode = () => {
  useStore.setState({ title: 'Sphere' })
  return (
    <>
      <Seo 
      title="regards d'artisans"
      description="description du projet"
      />
      <h1>Fin episode</h1>
    </>
  )
}

export default FinEpisode
