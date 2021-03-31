import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Data from "@assets/data/scenes.json"
import styles from "./styles.module.scss"

import { SetupAtelier } from '@/helpers/atelierHelper';
import { SetupColorPicker } from '@/helpers/colorPickersHelper';


const SingleAtelierPage = () => {
  const ref = useRef(null)
  const cursorColorPickerContainer = useRef(null);
  const cursorColorPickerInner = useRef(null);


  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/assets/models/gltf/draco/')
  loader.setDRACOLoader(dracoLoader)

  useEffect(() => {
    // Data.scene1.array.forEach(element => {
    //   buildScene(scene)
    // });

    const raycaster = new THREE.Raycaster();

    let objectToTest = [];
    let vitrailObjects = [];

    // Scene
    let scene = new THREE.Scene();
    const canvas = ref.current

    // Group
    const vitrailGroup = new THREE.Group
    const atelierGroup = new THREE.Group
    scene.add(vitrailGroup, atelierGroup)

    // Parameters
    const params = {
      load: false
    }

    let mixer
    let currentCamera
    let cameraClip

    // Loaders

    const buildScene = (currentScene) => {
      return loader.loadAsync(
        currentScene.modelUrl,
      )
    }

    Promise.all(Data.map(buildScene)).then((objects) => {
      objects.map((elm, i) => {
        let parent = elm.scene.children[0]
        let parentName = elm.scene.children[0].name

        if ("colorPickerGroup" === parentName) {
          vitrailGroup.add(parent)
          SetupColorPicker(parent, objectToTest, vitrailObjects)
        } else if ("atelierGroup" === parentName) {
          atelierGroup.add(parent)
          SetupAtelier()
          // console.log(parent.children);
        }

        if ("atelierCamGroup" === parentName) {
          mixer = new THREE.AnimationMixer(elm.scene)
          cameraClip = mixer.clipAction(elm.animations[0])
          // console.log(cameraClip);

          currentCamera = elm.cameras[0]
          // console.log(currentCamera);
        }
      })
      params.load = true
      console.log("InsideCurrentCamera", currentCamera);
      console.log("inside", params.load);
    })

    console.log("outside", params.load);
    console.log("OutsideCurrentCamera", currentCamera);

    // Elements positions
    vitrailGroup.position.set(-1.5, 1.2, 2.2)
    vitrailGroup.rotation.set(0, Math.PI / 2, 0)
    vitrailGroup.scale.set(0.7, 0.7, 0.7)

    // console.log(params.load);

    // if (true === params.load) {
    //   console.log(vitrailGroup.children[0]);
    // }

    //COLORPICKER CURRENT COLOR
    const colorPicked = {
      current: null,
      old: null
    }

    let isMouseDown = false;
    const handleMouseDown = () => {
      isMouseDown = true;
      if (currentIntersect) {
        switch (currentIntersect.object.name) {
          case "green":
            colorPicked.current = currentIntersect.object.material.color;
            cursorColorPickerInner.current.setAttribute("data-color-cursor", "green");
            cursorColorPickerInner.current.style.transform = "scale(1.5)"
            break
          case "purple":
            colorPicked.current = currentIntersect.object.material.color;
            cursorColorPickerInner.current.setAttribute("data-color-cursor", "purple");
            cursorColorPickerInner.current.style.transform = "scale(1.5)"
            break
          case "white":
            colorPicked.current = currentIntersect.object.material.color;
            cursorColorPickerInner.current.setAttribute("data-color-cursor", "white");
            cursorColorPickerInner.current.style.transform = "scale(1.5)"
            break
        }
      }
    }
    const handleMouseUp = () => {
      isMouseDown = false;
      if (currentIntersect) {
        if (vitrailObjects.includes(currentIntersect.object.name)) {
          currentIntersect.object.material.color = colorPicked.current;
        }
        colorPicked.current = null;
        cursorColorPickerInner.current.setAttribute("data-color-cursor", "default");
        cursorColorPickerInner.current.style.transform = "scale(.8)"
      } else {
        colorPicked.current = null;
        cursorColorPickerInner.current.setAttribute("data-color-cursor", "default");
        cursorColorPickerInner.current.style.transform = "scale(.8)"
      }
    }

    const mouse = new THREE.Vector2()

    const handleMouseMove = (event) => {
      mouse.x = event.clientX / sizes.width * 2 - 1
      mouse.y = - (event.clientY / sizes.height) * 2 + 1
      // cursorColorPickerContainer.current.style.transform = `translate(${event.clientX - 25}px, ${event.clientY - 25}px)`;
      // console.log(mouse)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // window.addEventListener('click', handleClickOnObjects)

    window.addEventListener('pointerdown', handleMouseDown)

    window.addEventListener('pointerup', handleMouseUp)

    /**
  * Lights
  */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.set(1024, 1024)
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.camera.left = - 7
    directionalLight.shadow.camera.top = 7
    directionalLight.shadow.camera.right = 7
    directionalLight.shadow.camera.bottom = - 7
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    /**
* Sizes
*/
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }


    // Resize
    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
    * Camera
    */
    // Base camera

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    // const camera = new THREE.PerspectiveCamera(currentCamera.fov, sizes.width / sizes.height, currentCamera.near, currentCamera.far)

    camera.position.set(- .3, 2, 2.2)
    camera.lookAt(vitrailGroup.position)
    scene.add(camera)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.target.set(0, 1, 0)
    // controls.enableDamping = true
    // controls.enabled = true


    /**
 * Renderer
 */
    const renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    canvas.appendChild(renderer.domElement);


    const clock = new THREE.Clock()
    let previousTime = 0
    let currentIntersect = null

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      const deltaTime = elapsedTime - previousTime
      previousTime = elapsedTime

      //Raycast
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(objectToTest)

      if (intersects.length) {
        if (currentIntersect && currentIntersect !== intersects[0]) {
          if (isMouseDown === true) {
            currentIntersect.object.material.color = colorPicked.old;
          }
        }
        currentIntersect = intersects[0]
        // console.log('mouse enter')
        colorPicked.old = currentIntersect.object.material.color;
        if (isMouseDown === true && vitrailObjects.includes(currentIntersect.object.name)) {
          currentIntersect.object.material.color = colorPicked.current;
        }
        // console.log(intersects);

      }
      else {
        if (currentIntersect) {
          // console.log('mouse leave')
          if (isMouseDown === true) {
            currentIntersect.object.material.color = colorPicked.old;
          }
          colorPicked.old = null;
          // console.log(currentIntersect.object.name);

        }

        currentIntersect = null
      }

      // Camera
      // camera.lookAt(vitrailGroup.position)

      // Update controls
      // controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()

  }, [])


  return (
    <>
      <div ref={ref} />
      <div className={styles.colorPickerContainer} ref={cursorColorPickerContainer}>
        <div className={styles.colorPickerInner} ref={cursorColorPickerInner}></div>
      </div>
    </>
  )
}

export default SingleAtelierPage
