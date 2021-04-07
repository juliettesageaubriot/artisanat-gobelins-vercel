import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Data from "@assets/data/scenes.json"
import styles from "./styles.module.scss"

import { SetupAtelier } from '@/helpers/atelierHelper';
import { SetupColorPicker } from '@/helpers/colorPickersHelper';

import AnimationManager from "@three-utils/animation.js";
import CameraManager from "@three-utils/cameraManager.js";


const SingleAtelierPage = () => {
  const ref = useRef(null)
  const cursorColorPickerContainer = useRef(null);
  const cursorColorPickerInner = useRef(null);


  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/assets/models/gltf/draco/')
  loader.setDRACOLoader(dracoLoader)

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const cubeTextureLoader = new THREE.CubeTextureLoader()

    let objectToTest = [];
    let vitrailObjects = [];

    // Scene
    let scene = new THREE.Scene();
    const canvas = ref.current

    // Group
    const vitrailGroup = new THREE.Group
    const atelierGroup = new THREE.Group
    const atelierV04Group = new THREE.Group
    const cameraGroup = new THREE.Group
    scene.add(vitrailGroup, atelierGroup, atelierV04Group, cameraGroup)

    // Parameters
    const params = {
      load: false
    }

    // Variables
    let currentCamera = null

    let mixer = null
    let action = null
    let camera = null


    let cameraAnimation;
    let cameraManager;
    // Loaders

    const dataMap = async () => {

      const buildScene = (currentScene) => {
        return loader.loadAsync(
          currentScene.modelUrl,
        )
      }

      await Promise.all(Data.map(buildScene)).then((objects) => {

        objects.map((gltf, i) => {
          gltf.scene.traverse(child => {

            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
              // child.material.envMap = environmentMap
              // child.material.envMapIntensity = 5
              child.castShadow = true
              child.receiveShadow = true
            }

            if ("colorPickerGroup" === child.name) {
              vitrailGroup.add(child);
              SetupColorPicker(child, objectToTest, vitrailObjects);
            }
            else if ("atelierCamGroup" === child.name) {
              // atelierGroup.add(child);

              cameraAnimation = new AnimationManager(child, gltf.animations);
              cameraManager = new CameraManager(cameraAnimation);

              // if ("Camera" === gltf.cameras[0].parent.name) currentCamera = gltf.cameras[0]
            } else if ("atelier_03" === child.name) {
              atelierV04Group.add(child)
            }
          })
        })
      })

      /**
     * Environment map
     */
      const environmentMap = cubeTextureLoader.load([
        'assets/textures/environmentMaps/px.png',
        'assets/textures/environmentMaps/nx.png',
        'assets/textures/environmentMaps/py.png',
        'assets/textures/environmentMaps/ny.png',
        'assets/textures/environmentMaps/pz.png',
        'assets/textures/environmentMaps/nz.png'
      ])
      environmentMap.encoding = THREE.sRGBEncoding
      scene.background = environmentMap
      scene.environment = environmentMap

      // Elements positions
      vitrailGroup.position.set(-1.5, 1, 2.2)
      vitrailGroup.rotation.set(0, Math.PI / 2, 0)
      vitrailGroup.scale.set(0.7, 0.7, 0.7)


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

      /**
    * Sizes
    */
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      /**
      * Camera
      */
      // Base camera
      let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
      // const newCam = currentCamera
      // console.log(newCam);
      camera.position.set(0, 1, 0)
      scene.add(camera)

      //Camera helper
      // const helper = new THREE.CameraHelper(newCam);
      // scene.add(helper);


      // button
      let buttonCamera1 = document.createElement("button");
      buttonCamera1.style.position = "absolute";
      buttonCamera1.style.top = 0;
      buttonCamera1.innerHTML = "Camera 1";

      // 2. Append somewhere
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(buttonCamera1);

      // 3. Add event handler
      buttonCamera1.addEventListener("click", function () {
        cameraManager.StartAnimation(0);
      });
      let buttonCamera2 = document.createElement("button");
      buttonCamera2.style.position = "absolute";
      buttonCamera2.style.top = "20px";
      buttonCamera2.innerHTML = "Camera 1 reverse";

      // 2. Append somewhere
      body = document.getElementsByTagName("body")[0];
      body.appendChild(buttonCamera2);

      // 3. Add event handler
      buttonCamera2.addEventListener("click", function () {
        cameraManager.ReverseAnimation(0);
      });
      ////


      // Controls
      const controls = new OrbitControls(camera, canvas)
      controls.target.set(0, 0, 0)
      controls.enableDamping = true

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
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        antialias: true
      })
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

        //update mixer
        if (cameraAnimation) {
          cameraAnimation.update(deltaTime)
        }

        // Update controls
        controls.update()
        // helper.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }

      tick()
    }

    dataMap()

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
