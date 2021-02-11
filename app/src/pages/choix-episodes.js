import Seo from '@/components/Seo/Seo'
import useStore from '@/helpers/store'

const ChoixEpisode = () => {
  useStore.setState({ title: 'Sphere' })
  return (
    <>
      <Seo 
      title="regards d'artisans"
      description="description du projet"
      />
      <h1>Choix épisode</h1>
    </>
  )
}

export default ChoixEpisode
