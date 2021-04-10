//Class CameraManager takes the currentCamera, the several scene cameras and the animationManager of the cameras
export default class CameraManager {
    constructor(currentCamera, cameras, cameraAnimations) {
        this.currentCamera = currentCamera;
        this.cameras = cameras;
        this.cameraAnimations = cameraAnimations;
    }

    StartAnimation(index) {
        //When we fire the camera animation, we set the current camera to the camera we want to transition and then we fire the animation
        this.currentCamera = this.cameras[index]
        this.cameraAnimations.playClipByIndex(index);
    }

    ReverseAnimation(index) {
        this.cameraAnimations.playClipReverseByIndex(index);
    }
}