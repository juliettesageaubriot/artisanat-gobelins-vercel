import React from "react";
import { Canvas } from 'react-three-fiber';

import Welcome from "../components/homepage/TestThree/TestThree";

const IndexPage = () => (

    <main>

        <Canvas>
            <Welcome position={[-1.2, 0, 0]} />
            <Welcome position={[1.2, 0, 0]} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
        </Canvas>
    </main>
)

export default IndexPage
