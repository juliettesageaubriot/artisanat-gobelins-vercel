import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'
import { Group } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const ColorPicker = () => {
  const ref = useRef(null)

  useEffect(() => {
    const dat = require('dat.gui');
    const gui = new dat.GUI();

    // Scene
    let scene = new THREE.Scene();
    const canvas = ref.current

    // Parameters
    const parameters = {
      PositionX: 0
    }

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    /**
     * Groups
     */

    const cubesGroupVitrail = new THREE.Group()
    const rectanglesGroupVitrail = new THREE.Group()
    const trianglesGroupVitrail = new THREE.Group()
    scene.add(cubesGroupVitrail, rectanglesGroupVitrail, trianglesGroupVitrail)

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


    /**
     * Plane
     */

    // Workbench
    const workbench = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.2, 1),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.5,
      })
    )
    workbench.receiveShadow = true
    workbench.position.set(0, 0.101, 0)
    scene.add(workbench)

    // Workbench 2
    const workbench2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.2, 1),
      new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        metalness: 0,
        roughness: 0.5,
      })
    )
    workbench2.receiveShadow = true
    workbench2.rotation.x = Math.PI / 2
    workbench2.position.set(0, 0.501, -1)
    scene.add(workbench2)



    // Elements
    const ElementMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    // Cube
    const cube = new THREE.BoxGeometry(0.15, 0.05, 0.15)

    const cubeTopLeft = new THREE.Mesh(cube, ElementMaterial)
    const cubeTopRight = new THREE.Mesh(cube, ElementMaterial)
    const cubeBottomLeft = new THREE.Mesh(cube, ElementMaterial)
    const cubeBottomRight = new THREE.Mesh(cube, ElementMaterial)

    cubesGroupVitrail.add(cubeTopLeft, cubeTopRight, cubeBottomLeft, cubeBottomRight)
    cubeTopLeft.position.set(-0.5 + 0.1501 / 2, 0, -0.5 + 0.1501 / 2)
    cubeTopRight.position.set(0.5 - 0.1501 / 2, 0, -0.5 + 0.1501 / 2)
    cubeBottomLeft.position.set(-0.5 + 0.1501 / 2, 0, 0.5 - 0.1501 / 2)
    cubeBottomRight.position.set(0.5 - 0.1501 / 2, 0, 0.5 - 0.1501 / 2)

    cubesGroupVitrail.position.set(0, 0.201, 0)

    // Rectangle 
    const rectangle = new THREE.BoxGeometry(0.15, 0.0501, 0.5)

    const rectangleLeft = new THREE.Mesh(rectangle, ElementMaterial)
    const rectangleRight = new THREE.Mesh(rectangle, ElementMaterial)
    const rectangleTop = new THREE.Mesh(rectangle, ElementMaterial)
    const rectangleBottom = new THREE.Mesh(rectangle, ElementMaterial)

    rectangleLeft.position.set(-0.5 + 0.1501 / 2, 0, 0)
    rectangleRight.position.set(0.5 - 0.1501 / 2, 0, 0)
    rectangleTop.position.set(0, 0, -0.5 + 0.1501 / 2)
    rectangleBottom.position.set(0, 0, 0.5 - 0.1501 / 2)

    rectangleTop.rotation.y = Math.PI / 2
    rectangleBottom.rotation.y = Math.PI / 2

    rectanglesGroupVitrail.add(rectangleLeft, rectangleRight, rectangleTop, rectangleBottom)
    rectanglesGroupVitrail.position.set(0, 0.201, 0)

    // Triangles 

    // Create an empty BufferGeometry
    const geometry = new THREE.BufferGeometry()

    // Create a Float32Array containing the vertices position (3 by 3)
    const positionsArray = new Float32Array([
      0, 0, 0, // First vertex
      0, 1, 0, // Second vertex
      1, 0, 0  // Third vertex
    ])

    // Create the attribute and name it 'position'
    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
    geometry.setAttribute('position', positionsAttribute)

    // Losange
    const losangeElement = new THREE.BoxGeometry(0.30, 0.0501, 0.30)
    const losange = new THREE.Mesh(losangeElement, ElementMaterial)
    losange.position.set(0, 0.201, 0)
    losange.rotation.y = Math.PI / 4
    scene.add(losange)

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
    camera.position.z = 2
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.target.set(0, 1, 0)
    controls.enableDamping = true

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

      // if (mixer) {
      //   mixer.update(deltaTime)
      // }

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
      <div ref={ref} />
    </>
  );
}

export default ColorPicker;
