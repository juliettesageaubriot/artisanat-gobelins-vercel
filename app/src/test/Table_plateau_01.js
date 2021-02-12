/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF';

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/table_plateau_01.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={nodes.table_plateau.material}
        geometry={nodes.table_plateau.geometry}
        position={[0, 0.69, 0]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.01, 0.01, 0.01]}
      />
    </group>
  )
}

useGLTF.preload('/table_plateau_01.gltf')
