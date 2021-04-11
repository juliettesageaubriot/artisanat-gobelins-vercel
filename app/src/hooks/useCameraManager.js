import { useState } from "react";
import useAnimationsManager from '@hooks/useAnimationsManager' 

const useCameraManager = () => {
  const [currentCamera, setCurrentCamera] = useState(null);
  const [cameras, setCameras] = useState(null);
  // const [cameraAnimations, setCameraAnimations] = useState(null);
  
  const { playClipByIndex } = useAnimationsManager();

  const startAnimation = (index) => {
    setCurrentCamera(cameras[index]);
    console.log(currentCamera);
    // playClipByIndex(index)
  }

  const reverseAnimation = (index) => {
    setCurrentCamera(cameras[index]);
    playClipByIndex(index);
  }

  return {
    currentCamera,
    setCurrentCamera,
    setCameras,
    startAnimation,
    reverseAnimation
  };
};

export default useCameraManager;