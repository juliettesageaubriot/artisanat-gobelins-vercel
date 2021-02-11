import Seo from '../components/Seo/Seo'
import useStore from '../helpers/store'

const Menu = () => {
  useStore.setState({ title: 'Sphere' })
  return (
    <>
      <Seo 
      title="regards d'artisans"
      description="description du projet"
      />
      <h1>menu</h1>
    </>
  )
}

export default Menu
