import TheSeo from '@components/Structure/Seo/TheSeo'

// custom pages/404.js !! Do not remove please or it will break build
export default function Error() {
  return (
    <>
      <TheSeo
        title="regards d'artisans"
        description="description du projet"
      />
      <h1>404 - Page Not Found</h1>
    </>
  )
}
