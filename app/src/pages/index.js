import React from "react"
import TheSeo from '@components/Structure/Seo/TheSeo'
import ChoixEpisodeAtelierPage from "@/pageElement/ChoixEpisodePage/ChoixEpisodePage"

const Page = () => {
  return (
    <>
      <TheSeo
        title="regards d'artisans"
        description="description du projet"
      />
      <ChoixEpisodeAtelierPage />
    </>
  )
}

export default Page
