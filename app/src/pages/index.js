import React from "react"
import TheSeo from '@components/Structure/Seo/TheSeo'
import IntroEpisodePage from "@pageElement/IntroEpisodePage/IntroEpisodePage"

const Page = () => {
  return (
    <>
      <TheSeo
        title="regards d'artisans"
        description="description du projet"
      />
      <IntroEpisodePage />
    </>
  )
}

export default Page
