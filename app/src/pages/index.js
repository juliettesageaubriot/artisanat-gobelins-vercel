import React from "react"
import TheCameras from "../components/Cameras/TheCameras"
import TheColorPicker from "../components/ColorPicker/TheColorPicker"
import TheSeo from '../components/Structure/Seo/TheSeo'
import IntroEpisode from "./intro-episode"

const Page = () => {
  return (
    <>
      <TheSeo
        title="regards d'artisans"
        description="description du projet"
      />
      {/* <TheCameras /> */}
      <IntroEpisode />
      {/* <TheColorPicker /> */}
    </>
  )
}

export default Page
