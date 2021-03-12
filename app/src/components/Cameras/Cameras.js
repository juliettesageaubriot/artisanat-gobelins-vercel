import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import GUI from "../GUI/gui";

const Cameras = () => {
  const ref = useRef(null)

  useEffect(() => {

    // Scene
    let scene = new THREE.Scene();
    const canvas = ref.current

    // Loader
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()

    dracoLoader.setDecoderPath('/assets/models/gltf/draco/')
    loader.setDRACOLoader(dracoLoader)

    loader.load(
      '/assets/models/gltf/draco/dracoModels/atelier.glb',
      (gltf) => {
        console.log(gltf);
        workshopGroup.add(gltf.scene)
      }
    )

    // Group
    const workshopGroup = new THREE.Group
    scene.add(workshopGroup)

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

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
    controls.enabled = true

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

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      const deltaTime = elapsedTime - previousTime
      previousTime = elapsedTime

      // Camera
      // camera.lookAt(vitrailGroup.position)

      // Update controls
      controls.update()

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
    </>
  )
}

export default Cameras
