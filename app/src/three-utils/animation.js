import * as THREE from 'three';

export default class AnimationManager {
  constructor(scene, animations) {
    this.scene = scene;
    this.animations = animations;

    this.mixer = new THREE.AnimationMixer(this.scene);
  }

  playClipByIndex(index) {
    this.action = this.mixer.clipAction(this.animations[index]);
    this.action.reset()
    this.action.timeScale = 1;
    this.action.setLoop(THREE.LoopOnce);
    this.action.clampWhenFinished = true;
    this.action.play();
  }

  playClipReverseByIndex(index) {
    this.action = this.mixer.clipAction(this.animations[index]);
    this.action.paused = false;
    this.action.timeScale = -1;
    this.action.setLoop(THREE.LoopOnce);      
    this.action.play();
  }

  playClipReverseByIndex_Forced(index) {
    this.action = this.mixer.clipAction(this.animations[index]);

    if(this.action.time === 0) {
        this.action.time = this.action.getClip().duration;
    }
    
    this.action.paused = false;
    this.action.setLoop(THREE.LoopOnce);      
    this.action.timeScale = -1;
    this.action.play();
  }

  update(delta) {
    if(this.mixer) {
      this.mixer.update(delta);
    }
  }
}