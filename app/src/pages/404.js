import Seo from '../components/Seo/Seo'

// custom pages/404.js !! Do not remove please or it will break build
export default function Error() {
  return (
    <>
      <Seo
        title="regards d'artisans"
        description="description du projet"
      />
      <h1>404 - Page Not Found</h1>
    </>
  )
}
