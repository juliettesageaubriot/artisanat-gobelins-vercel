import { useState } from "react";
import * as THREE from 'three'

const useAnimationsManager = (cameraAnimations, currentScene) => {
  // const [currentScene, setCurrentScene] = useState(null);
  // const [animations, setAnimations] = useState(null);

  let mixer = new THREE.AnimationMixer(currentScene);
  let action

  const playClipByIndex = (index) => {
    // console.log('click', cameraAnimations[index])

    // action = mixer.clipAction(cameraAnimations[index]);
    // action.reset()
    // action.timeScale = 1;
    // action.setLoop(THREE.LoopOnce);
    // action.clampWhenFinished = true;
    // action.play()
    // console.log(action);
  }

  const playClipReverseByIndex = (index) => {
    action = mixer.clipAction(cameraAnimations[index]);
    action.paused = false;
    action.timeScale = -1;
    action.setLoop(THREE.LoopOnce);
    action.play();
  }

  const playClipReverseByIndex_Forced = (index) => {
    action = mixer.clipAction(cameraAnimations[index]);

    if (action.time === 0) {
      action.time = action.getClip().duration;
    }

    action.paused = false;
    action.setLoop(THREE.LoopOnce);
    action.timeScale = -1;
    action.play();
  }

  const update = (delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  }

  return {
    playClipByIndex,
    playClipReverseByIndex,
    playClipReverseByIndex_Forced,
    update
  }
};

export default useAnimationsManager;