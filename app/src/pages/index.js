import React from "react"
import TheSeo from '@components/Structure/Seo/TheSeo'
import IntroEpisodePage from "@pageElement/IntroEpisodePage/IntroEpisodePage"
import FinEpisodePage from "../pageElement/FinEpisode/FinEpisodePage"

const Page = () => {
  return (
    <>
      <TheSeo
        title="regards d'artisans"
        description="description du projet"
      />
      {/* <IntroEpisodePage /> */}
      <FinEpisodePage />
    </>
  )
}

export default Page
