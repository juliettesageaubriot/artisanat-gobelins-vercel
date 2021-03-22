import React, { useEffect, useRef, useState } from 'react';
import styles from "./styles.module.scss";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import GUI from "../Gui/TheGui";

const ColorPicker = () => {
  const ref = useRef(null)
  const cursorColorPickerContainer = useRef(null);
  const cursorColorPickerInner = useRef(null);

  // Parameters GUI
  const parameters = []

  useEffect(() => {
    const raycaster = new THREE.Raycaster();

    let objectToTest = [];
    let vitrailObjects = [];

    // Scene
    let scene = new THREE.Scene();
    const canvas = ref.current

    // Loader
    const loader = new GLTFLoader()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/assets/models/gltf/draco/')
    loader.setDRACOLoader(dracoLoader)

    loader.load(
      '/assets/models/gltf/draco/dracoModels/vitrail.glb',
      (gltf) => {
        vitrailGroup.add(gltf.scene)

        //Add ColorPicker
        let colorPickers = gltf.scene.children[0].children;
        for (let colorPicker of colorPickers) {
          objectToTest.push(colorPicker);
          // vitrailObjects.push(colorPicker.name);
        }

        //Add Vitrail cube
        let vitrailCubes = gltf.scene.children[2].children;
        for (let vitrailCube of vitrailCubes) {
          objectToTest.push(vitrailCube);
          vitrailObjects.push(vitrailCube.name);
        }

        //Add Vitrail rectangles
        let vitrailRectangles = gltf.scene.children[1].children;
        for (let vitrailRectangle of vitrailRectangles) {
          objectToTest.push(vitrailRectangle);
          vitrailObjects.push(vitrailRectangle.name);
        }

        //Add Vitrail Losange
        let vitrailLosange = gltf.scene.children[3];
        objectToTest.push(vitrailLosange);
        vitrailObjects.push(vitrailLosange.name);
      }
    )

    // Group
    const vitrailGroup = new THREE.Group
    scene.add(vitrailGroup)

    //COLORPICKER CURRENT COLOR
    const colorPicked = {
      current: null,
      old: null
    }

    /**
    * Mouse
    */
    // const handleClickOnObjects = () => {
    //   if (currentIntersect) {
    //     switch (currentIntersect.object.name) {
    //       case "green":
    //         console.log('click on THE GREEN')
    //         break
    //       case "purple":
    //         console.log('click on THE PURPLE')
    //         break
    //       case "white":
    //         console.log('click on THE WHITE')
    //         break
    //       case "cubeTopLeft":
    //         console.log('click on cubeTopLeft')
    //         break
    //       case "cubeTopRight":
    //         console.log('click on cubeTopRight')
    //         break
    //       case "cubeBottomLeft":
    //         console.log('click on cubeBottomLeft')
    //         break
    //       case "cubeBottomRight":
    //         console.log('click on cubeBottomRight')
    //         break
    //       case "rectangleLeft":
    //         console.log('click on rectangleLeft')
    //         break
    //       case "rectangleTop":
    //         console.log('click on rectangleTop')
    //         break
    //       case "rectangleRight":
    //         console.log('click on rectangleRight')
    //         break
    //       case "rectangleBottom":
    //         console.log('click on rectangleBottom')
    //         break
    //       case "losange":
    //         console.log('click on losange')
    //         break
    //     }
    //   }
    // }

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
      cursorColorPickerContainer.current.style.transform = `translate(${event.clientX - 25}px, ${event.clientY - 25}px)`;
      // console.log(mouse)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // window.addEventListener('click', handleClickOnObjects)

    window.addEventListener('pointerdown', handleMouseDown)

    window.addEventListener('pointerup', handleMouseUp)

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    /**
     * Groups
     */

    /**
     * Plane
     */

    //Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10, 10),
      new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5,
        side: THREE.DoubleSide
      })
    )
    floor.receiveShadow = true
    floor.rotation.x = Math.PI / 2
    scene.add(floor)

    parameters.push(
      {
        element: floor.position,
        property: "x",
        max: 10,
        min: -10,
        step: 0.01,
        addColor: false
      }
    )

    console.log("In useEffect colorPicker", parameters)

    /**
     * Plane
     */


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
    camera.position.set(0, 2, 2)
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.target.set(0, 1, 0)
    controls.enableDamping = true
    controls.enabled = false

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    canvas.appendChild(renderer.domElement);

    /**
     * Animate
     */
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
        if (!currentIntersect) {
          currentIntersect = intersects[0]
          // console.log('mouse enter')
          colorPicked.old = currentIntersect.object.material.color;
          if (isMouseDown === true && vitrailObjects.includes(currentIntersect.object.name)) {
            currentIntersect.object.material.color = colorPicked.current;
          }
        }
      }
      else {
        if (currentIntersect) {
          // console.log('mouse leave')
          if (isMouseDown === true) {
            currentIntersect.object.material.color = colorPicked.old;
          }
          colorPicked.old = null;
        }

        currentIntersect = null
      }

      // Camera
      camera.lookAt(vitrailGroup.position)

      // Update controls
      controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()

  }, []);


  return (
    <>
      <GUI parameters={parameters} />
      <div ref={ref} />
      <div className={styles.colorPickerContainer} ref={cursorColorPickerContainer}>
        <div className={styles.colorPickerInner} ref={cursorColorPickerInner}></div>
      </div>
    </>
  );
}

export default ColorPicker;
