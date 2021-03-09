import React from "react"
import Cameras from "../components/Cameras/Cameras"
import Seo from '../components/Structure/Seo/Seo'

const Page = () => {
  return (
    <>
      <Seo
        title="regards d'artisans"
        description="description du projet"
      />
      <Cameras />
    </>
  )
}

export default Page
