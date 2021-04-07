
export default class CameraManager {
    constructor(camera) {
        this.camera = camera;
    }

    StartAnimation(index) {
        this.camera.playClipByIndex(index);
    }

    ReverseAnimation(index) {
        this.camera.playClipReverseByIndex(index);
    }

}