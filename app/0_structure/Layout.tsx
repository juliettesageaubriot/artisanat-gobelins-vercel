import React, { ReactNode } from 'react'
import Header from "./Header/Header"

import { Canvas } from 'react-three-fiber'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children }: Props) => (
  <div>
    <Canvas>
      <Header position={[-1.2, 0, 0]} />
      <Header position={[1.2, 0, 0]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
    {children}
  </div>
)

export default Layout
