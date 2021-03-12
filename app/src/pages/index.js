import React from "react"
import Cameras from "../components/Cameras/Cameras"
import ColorPicker from "../components/ColorPicker/ColorPicker"
import Seo from '../components/Structure/Seo/Seo'
import IntroEpisode from "./intro-episode"

const Page = () => {
  return (
    <>
      <Seo
        title="regards d'artisans"
        description="description du projet"
      />
      {/* <Cameras /> */}
      {/* <ColorPicker /> */}
      <IntroEpisode />
    </>
  )
}

export default Page
