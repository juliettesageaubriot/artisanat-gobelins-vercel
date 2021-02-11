import React, {useRef} from "react"
import ReactDOM from "react-dom"
import { Canvas, useFrame } from "react-three-fiber"
import Seo from '../components/Seo/Seo'
import useStore from '../helpers/store'

// import Canvas from "../components/examples/layout/_canvas"
// import Sphere from "../components/examples/canvas/Sphere"

function Box({ position, color }) {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))

  return (
    <mesh position={position} ref={ref}>
      <boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
      <meshPhongMaterial color={color} attach="material" />
    </mesh>
  )
}


const Page = () => {
  useStore.setState({ title: 'Sphere' })
  return (
    <>
      <Seo
        title="regards d'artisans"
        description="description du projet"
      />
      <h1>Hello world</h1>

      {/* <Canvas>
        <Sphere />
      </Canvas> */}


      <Canvas>
        <Box color="#18a36e" position={[-1, 0, 3]} />
        <Box color="#f56f42" position={[1, 0, 3]} />
        <directionalLight color="#ffffff" intensity={1} position={[-1, 2, 4]} />
      </Canvas>

    </>
  )
}

export default Page
