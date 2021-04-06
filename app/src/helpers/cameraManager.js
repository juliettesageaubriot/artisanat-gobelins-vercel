import { gsap } from 'gsap';

export class CameraManager {
    constructor(camera) {
        this.camera = camera;
    }

    StartingPointInSceneToDecoupeDuTrace() {
        let tl = gsap.timeline({ease: "expo"});
        tl.to(this.camera.position, {z: -1.7, duration: 2})
        tl.to(this.camera.position, {y: 1.5, duration: 2, ease: "ease"}, ">-2")
        tl.to(this.camera.rotation, {x: Math.PI / 4, duration: 2}, ">-2")
    }

    FromDecoupeDutraceToColorPicker() {
        let tl = gsap.timeline({ease: "expo"});
        tl.to(this.camera.position, {z: 2.2, duration: 2})
        tl.to(this.camera.position, {y: 2, duration: 2, ease: "ease"}, ">-2")
        tl.to(this.camera.rotation, {y: Math.PI / 2, duration: 2}, ">-2")
        tl.to(this.camera.rotation, {x: 0, duration: 2},">-2")
    }
}