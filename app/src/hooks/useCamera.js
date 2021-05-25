import { useEffect, useState } from "react";
import * as THREE from 'three'
const useCameraManager = (test) => {
  // console.log(test);
  const [currentCamera, setCurrentCamera] = useState(null);
  const [cameras, setCameras] = useState(null);
  const [cameraAnimations, setCameraAnimations] = useState(null);
  
  useEffect(() => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    
    setCurrentCamera(new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100))
  }, [])

  function startAnimation(index) {
    setCurrentCamera(cameras[index]);
    cameraAnimations.playClipByIndex(index);
  }
  function reverseAnimation(index) {
    setCurrentCamera(cameras[index]);
    cameraAnimations.playClipReverseByIndex(index);
  }

  return {
    currentCamera,
    setCurrentCamera,
    setCameras,
    cameraAnimations,
    setCameraAnimations,
    startAnimation,
    reverseAnimation
  };
};

export default useCameraManager;