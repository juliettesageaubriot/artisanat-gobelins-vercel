import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const Cameras = () => {
  const ref = useRef(null)

  useEffect(() => {
    const dat = require('dat.gui');
    const gui = new dat.GUI();

    // Scene
    let scene = new THREE.Scene();
    const canvas = ref.current


    const parameters = {
      PositionX: 0
    }

    /**
     * Floor
     */
    const floor = new THREE.Mesh(
      new THREE.TorusGeometry( 5, 3, 16, 100 ),
      new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5,
        side: THREE.DoubleSide
      })
    )
    floor.receiveShadow = true
    floor.position.x = parameters.PositionX
    gui.add(floor.position, "x").min(-10).max(10).step(0.001)

    scene.add(floor)


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
    camera.position.y = -10
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

export default Cameras;
