import TheSeo from '@components/Structure/Seo/TheSeo'
import SingleAtelierPage from "@pageElement/singleAtelierPage/SingleAtelierPage"

const SingleAtelier = () => {
  return (
    <>
      <TheSeo 
      title="regards d'artisans"
      description="description du projet"
      />
      <SingleAtelierPage />
    </>
  )
}

export default SingleAtelier
