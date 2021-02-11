import Seo from '@/components/Seo/Seo'
import useStore from '@/helpers/store'

const Page = () => {
  useStore.setState({ title: 'Sphere' })
  return (
    <>
      <Seo 
      title="regards d'artisans"
      description="description du projet"
      />
      <h1>Hello world</h1>
    </>
  )
}

export default Page
