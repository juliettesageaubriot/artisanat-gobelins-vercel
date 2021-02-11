import Seo from '@/components/Seo/Seo'
import useStore from '@/helpers/store'

const SingleAtelier = () => {
  useStore.setState({ title: 'Sphere' })
  return (
    <>
      <Seo 
      title="regards d'artisans"
      description="description du projet"
      />
      <h1>Single atelier</h1>
    </>
  )
}

export default SingleAtelier
