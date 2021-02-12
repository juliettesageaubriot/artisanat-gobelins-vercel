import styles from "./styles.module.scss";
import React, {useRef, lazy, Suspense} from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber";

import { Html, useGLTFLoader, useFBX } from "@react-three/drei";

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

  // const Model = () => {
  //   const fbx = useFBX("/public/table_plateau.fbx", true);
   
  //   return <primitive object={fbx.scene} dispose={null} />;
  // }

//   const Model = lazy(() => import("../../public/table_plateau.fbx")); // 

//   function Asset({ url }) {
//     const fbx = useLoader(FBXLoader, url)
//     return <primitive object={fbx} dispose={null} />
// }

// const Model = lazy(() => import("./table_plateau.fbx")); // has imports from three/jsm

  

const Test = () => {
    return ( 
        <>
        <Canvas>     
            <Box color="#18a36e" position={[-1, 0, 3]} />
            <Box color="#f56f42" position={[1, 0, 3]} />
            <directionalLight color="#ffffff" intensity={1} position={[-1, 2, 4]} />
      </Canvas>
        </>
     );
}
 
export default Test;