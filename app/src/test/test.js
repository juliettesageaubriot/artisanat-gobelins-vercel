import styles from "./styles.module.scss";
import React, {useRef, lazy, Suspense} from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber";

import { Html, useGLTF } from "@react-three/drei";
import Model from "./Table_plateau_01";

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

  

  

const Test = () => {
    return ( 
        <>
        <Canvas>  
            <Suspense fallback={null}>
              <Model />
            </Suspense>   
            <Box color="#18a36e" position={[-1, 0, 3]} />
            <Box color="#f56f42" position={[1, 0, 3]} />
            <directionalLight color="#ffffff" intensity={1} position={[-1, 2, 4]} />
      </Canvas>
        </>
     );
}
 
export default Test;