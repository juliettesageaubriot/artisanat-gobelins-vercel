//vendors
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//utils
import bindAll from './bindAll.js';

//modules
import AssetsLoader from './AssetsLoader';
import AnimationManager from "@three-utils/animationManager.js";
import CameraManager from "@three-utils/cameraManager.js";
import { SetupColorPicker } from '@helpers/colorPickersHelper';

// import ThreeModele from './ThreeModele';

const SETTINGS = {
    enableRaycast: true,
    enableOrbitControl: false,
    idCamera: [0, 1, 2]
}

class ThreeScene {
    constructor(canvas, state) {
        bindAll(
            this,
            '_tickHandler',
            '_resizeHandler',
            '_setupEventListeners',
            '_setEnvironmentMap',
            '_assetsLoadedHandler',
            '_animateCameraPlay',
            '_animateCameraReverse',
            '_setCameraAnimationPlay',
            '_setCameraAnimationReverse',
            '_setOrbitalControls',
            '_orbitControlsHandler',
            '_mousemoveHandler',
            '_mousePointerUpHandler',
            '_mousePointerDownHandler',
            'rayCastHandler'
        );

        this._canvas = canvas;

        this._state = state;

        // this._delta = 0;
        this._clock = new THREE.Clock()
        this._previousTime = 0;

        this._camera;
        this._cameras;

        this._controls;

        //Groups
        this._vitrailGroup = new THREE.Group;
        this._atelierGroup = new THREE.Group;
        this._atelierV04Group = new THREE.Group;

        this._colorPickerTestObject = [];
        this._vitrailObjects = [];

        this._setup();
        this._loadAssets();
        this._scene.add(this._vitrailGroup, this._atelierGroup, this._atelierV04Group);
        
    }

    _setup() {
        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this._camera.position.set(0, 1, 0);
        this._scene.add(this._camera);

        this._ambientLight = new THREE.AmbientLight(0xffffff, 1)
        this._scene.add(this._ambientLight);
        
        this._renderer = new THREE.WebGLRenderer({
            //canvas: this._canvas,
            antialias: true,
        });

        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this._canvas.appendChild(this._renderer.domElement);

        this._mouse = new THREE.Vector2();
        this._isMouseDown = false;
        this._rayCaster = new THREE.Raycaster();

        this._colorPicked = {
            current: null,
            old: null
        }

        this._currentIntersect = null;

        // this._setOrbitalControls();
        this._setupEventListeners();
        this._resizeHandler();
        this._setEnvironmentMap();
        this._setNewState();
    }

    _setCameraAnimationPlay(index) {
        this._camera = this._cameras[index];
        this.cameraManager.StartAnimation(index);
    }
    _setCameraAnimationReverse(index) {
        this._camera = this._cameras[index];
        this.cameraManager.ReverseAnimation(index);
    }

    _loadAssets() {
        this._loader = new AssetsLoader();
        this._loader.loadAssets().then(this._assetsLoadedHandler);
    }

    _assetsLoadedHandler() {
        this._models = this._loader.getModels();
        setTimeout(() => {
            this._start();
        }, 100);
    }

    _createModels() {
        for(let name in this._models) {
            this.object = this._models[name].scene;

            this.object.traverse(child => {
                

                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    // child.material.envMap = environmentMap
                    // child.material.envMapIntensity = 5
                    child.castShadow = true
                    child.receiveShadow = true
                }

                if ("colorPickerGroup" === child.name) {
                    this._vitrailGroup.add(child);
                    SetupColorPicker(child, this._colorPickerTestObject, this._vitrailObjects);

                    this._vitrailGroup.position.set(-1.5, 1, 2.2);
                    this._vitrailGroup.rotation.set(0, Math.PI, 0);
                    this._vitrailGroup.scale.set(0.7, 0.7, 0.7);

                } else if ("atelier_03" === child.name) {
                    this._addToScene(child)

                    this._cameras = [...this._models[name].cameras];
                    this._cameraAnimations = [...this._models[name].animations];

                    this.cameraAnimator = new AnimationManager(child, this._cameraAnimations);
                    this.cameraManager = new CameraManager(this._camera, this._cameras, this.cameraAnimator);
                    
                    // console.log(this._cameras)
                } else if("CameraAnim1_Orientation" === child.name) {

                    // console.log(child)
                    this._camera = child;
                }
            })
        }
    }

    _addToScene(object) {
        this._scene.add(object);
    }

    _start() {
        this._createModels(this._models);
        //Action à faire au démarrage

        this._animateCameraPlay(SETTINGS.idCamera[0]);
        this._animateCameraPlay(SETTINGS.idCamera[1]);
        this._animateCameraReverse(SETTINGS.idCamera[0]);
        this._animateCameraReverse(SETTINGS.idCamera[1]);
    }

    _rayCast(e) {
        if (!SETTINGS.enableRaycast) return;

        this._mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this._mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

        

        this._rayCaster.setFromCamera(this._mouse, this._camera);

        let intersects = this._rayCaster.intersectObjects(this._colorPickerTestObject);

        this.rayCastHandler(intersects);
    }

    rayCastHandler(intersects) {

        if (intersects[0]) {
            this._object = intersects[0].object;
            if (this._currentIntersect) {
              if (this._isMouseDown === true) {
                this._currentIntersect.material.color = this._colorPicked.old;
              }
            }
            this._currentIntersect = this._object;
            // console.log('mouse enter')
            this._colorPicked.old = this._currentIntersect.material.color;
            if (this._isMouseDown === true && this._vitrailObjects.includes(this._currentIntersect.name)) {
                this._currentIntersect.material.color = this._colorPicked.current;
            }
          }
          else {
            if (this._currentIntersect) {
            //   console.log('mouse leave')
              if (this._isMouseDown === true) {
                this._currentIntersect.material.color = this._colorPicked.old;
              }
              this._colorPicked.old = null;
              // console.log(currentIntersect.name);
  
            }
  
            this._currentIntersect = null
          }
    }

    _animateCameraPlay(index) {
        let buttonCamera1 = document.createElement("button");
        buttonCamera1.style.position = "absolute";
        buttonCamera1.style.top = (1 + (index * 30)) + "px";
        buttonCamera1.innerHTML = "Camera "+ (index + 1);

        // // 2. Append somewhere
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(buttonCamera1);

        // // 3. Add event handler
        buttonCamera1.addEventListener("click", () => {
            this._setCameraAnimationPlay(index);
        });
    }

    _animateCameraReverse(index) {
        let buttonCamera1 = document.createElement("button");
        buttonCamera1.style.position = "absolute";
        buttonCamera1.style.top = (60 + (index * 30)) + "px";
        buttonCamera1.innerHTML = "Camera reverse"+ (index + 1);

        // // 2. Append somewhere
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(buttonCamera1);

        // // 3. Add event handler
        buttonCamera1.addEventListener("click", () => {
            this._setCameraAnimationReverse(index);
        });
    }

    _getSceneObjectWithName(object, name) {
        let mesh;
        object.traverse((child) => {
            if (child.isMesh && child.name === name) {
                mesh = child;
            }
        });
        return mesh;
    }

    _resize(width, height) {
        this._width = width;
        this._height = height;

        this._camera.aspect = this._width / this._height;
        this._camera.updateProjectionMatrix();
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._renderer.setSize(this._width, this._height);
    }

    _resizeHandler() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._resize(this._width, this._height);
    }

    _mousePointerDownHandler(e) {
        // console.log("pointer down" , e)
        this._isMouseDown = true;
        if (this._currentIntersect) {
          switch (this._currentIntersect.name) {
            case "green":
              this._colorPicked.current = this._currentIntersect.material.color;
            //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "green");
            //   cursorColorPickerInner.current.style.transform = "scale(1.5)"
              break
            case "purple":
                this._colorPicked.current = this._currentIntersect.material.color;
            //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "purple");
            //   cursorColorPickerInner.current.style.transform = "scale(1.5)"
              break
            case "white":
                this._colorPicked.current = this._currentIntersect.material.color;
            //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "white");
            //   cursorColorPickerInner.current.style.transform = "scale(1.5)"
              break
          }
        }
    }

    _mousePointerUpHandler(e) {
        // console.log("pointer up", e)
        // rayCast(e);
        this._isMouseDown = false;
        if (this._currentIntersect) {
          if (this._vitrailObjects.includes(this._currentIntersect.name)) {
            this._currentIntersect.material.color = this._colorPicked.current;
          }
          this._colorPicked.current = null;
        //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "default");
        //   cursorColorPickerInner.current.style.transform = "scale(.8)"
        } else {
            this._colorPicked.current = null;
        //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "default");
        //   cursorColorPickerInner.current.style.transform = "scale(.8)"
        }
    }

    _mousemoveHandler(e) {
        this._rayCast(e);
    }

    _render() {
        const elapsedTime = this._clock.getElapsedTime();
        const deltaTime = elapsedTime - this._previousTime;
        this._previousTime = elapsedTime;

        if (this.cameraAnimator) {
            this.cameraAnimator.update(deltaTime)
        }

        // this._orbitControlsHandler();

        this._renderer.render(this._scene, this._camera);
    }

    _tick() {
        this._render();
    }

    _tickHandler() {
        this._tick();
        window.requestAnimationFrame(this._tickHandler);
    }

    _setupEventListeners() {
        this._tickHandler();
        window.addEventListener('resize', this._resizeHandler);
        window.addEventListener('pointerdown', this._mousePointerDownHandler);
        window.addEventListener('pointerup', this._mousePointerUpHandler);
        window.addEventListener('mousemove', this._mousemoveHandler);
    }

    _setEnvironmentMap() {
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const environmentMap = cubeTextureLoader.load([
            'assets/textures/environmentMaps/px.png',
            'assets/textures/environmentMaps/nx.png',
            'assets/textures/environmentMaps/py.png',
            'assets/textures/environmentMaps/ny.png',
            'assets/textures/environmentMaps/pz.png',
            'assets/textures/environmentMaps/nz.png'
          ])
        environmentMap.encoding = THREE.sRGBEncoding;
        this._scene.background = environmentMap;
        this._scene.environment = environmentMap;
    }

    _setOrbitalControls() {
      this._controls = new OrbitControls(this._camera, this._canvas);
      this._controls.target.set(0, 0, 0);
      this._controls.enableDamping = true;
    }

    _orbitControlsHandler() {
        this._controls.update();
    }

    _setNewState() {
        // this._state.function1();
    }
    
}

export default ThreeScene;