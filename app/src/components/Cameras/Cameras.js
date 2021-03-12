import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const Cameras = () => {
  const ref = useRef(null)

  useEffect(() => {
  //   const dat = require('dat.gui');
  //   const gui = new dat.GUI();

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

    // Right wall
    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 5, 10),
      new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        metalness: 0,
        roughness: 0.5,
        side: THREE.DoubleSide
      })
    )
    rightWall.receiveShadow = true
    rightWall.rotation.y = Math.PI / 2
    rightWall.position.set(5, 5 / 2, 0)
    scene.add(rightWall)

    // Back wall
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 5, 10),
      new THREE.MeshStandardMaterial({
        color: 0xff00ff,
        metalness: 0,
        roughness: 0.5,
        side: THREE.DoubleSide
      })
    )
    backWall.receiveShadow = true
    backWall.rotation.y = Math.PI / 2
    backWall.position.set(-5, 5 / 2, 0)
    scene.add(backWall)


    // Left wall
    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 5, 10),
      new THREE.MeshStandardMaterial({
        color: 0xffff00,
        metalness: 0,
        roughness: 0.5,
        side: THREE.DoubleSide
      })
    )
    leftWall.receiveShadow = true
    // leftWall.rotation.y = Math.PI
    leftWall.position.set(0, 5 / 2, -5)
    scene.add(leftWall)

    /**
     * Cube
     */

    // Cube 1
    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.5,
      })
    )
    cube1.receiveShadow = true
    cube1.position.set(0, 0.501, 0)
    scene.add(cube1)


    /**
     * Raycaster
     */

    const raycaster = new THREE.Raycaster()


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
 * Mouse
 */
    const mouse = new THREE.Vector2() //x and y
    window.addEventListener('mousemove', (_event) => {
      mouse.x = _event.clientX / sizes.width * 2 - 1
      mouse.y = - (_event.clientY / sizes.height) * 2 + 1
    })

    window.addEventListener('click', (_event) => {
      if (currentIntersect) {
        switch (currentIntersect.object) {
          case cube1:
            console.log('click on object 1')
            break
        }
      }
    })

    /**
   * Camera
   */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 10
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

      // Cast a ray
      raycaster.setFromCamera(mouse, camera)

      const objectsToTest = [
        cube1
      ]

      const intersects = raycaster.intersectObjects(objectsToTest)

      for (const object of objectsToTest) {
        object.material.color.set('#ff0000')
      }

      for (const intersect of intersects) {
        intersect.object.material.color.set('#0000ff')
      }

      if (intersects.length) {

        if (currentIntersect === null) {
          console.log('mouseEnter');
        }

        currentIntersect = intersects[0]
      } else {

        if (currentIntersect) {
          console.log('mouseLeave');
        }
        currentIntersect = null
      }


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
