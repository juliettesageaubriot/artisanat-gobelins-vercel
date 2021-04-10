import { useState } from "react";
import useAnimationsManager from '@hooks/useAnimationsManager' 

const useCameraManager = () => {
  const [currentCamera, setCurrentCamera] = useState(null);
  const [cameras, setCameras] = useState(null);
  const [cameraAnimations, setCameraAnimations] = useState(null);
  const [currentScene, setCurrentScene] = useState(null);
  
  const { playClipByIndex } = useAnimationsManager(cameraAnimations, currentScene);

  const startAnimation = (index) => {
    setCurrentCamera(cameras[index]);
    // playClipByIndex(index)
  }

  const reverseAnimation = (index) => {
    setCurrentCamera(cameras[index]);
    playClipByIndex(index);
  }

  return {
    currentCamera,
    cameraAnimations,
    currentScene,
    setCurrentScene,
    setCurrentCamera,
    setCameras,
    setCameraAnimations,
    startAnimation,
    reverseAnimation
  };
};

export default useCameraManager;