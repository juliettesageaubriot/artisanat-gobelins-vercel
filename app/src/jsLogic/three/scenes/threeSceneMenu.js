//vendors
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//utils
import bindAll from '@jsLogic/utils/bindAll';

//modules
import AssetsLoader from '@jsLogic/three/assetsLoader';
import dataMenu from '@assets/data/content-menu.json'

import { SetupMenuChaptersRaycast } from '@jsLogic/utils/menuChaptersRaycastHelper';
import MenuHoveredManager from '@jsLogic/utils/menuHoveredManager'

//shader
import textureHoveredVertexShader from '../../../shaders/menu/texturesHovered/vertex.glsl'
import textureHoveredFragmentShader from '../../../shaders/menu/texturesHovered/fragment.glsl'

const SETTINGS = {
  enableRaycast: true,
  enableOrbitControl: false,
  idCamera: [0]
}

class ThreeSceneMenu {
  constructor(canvas, state) {
    bindAll(
      this,
      '_tickHandler',
      '_resizeHandler',
      '_setupEventListeners',
      '_setEnvironmentMap',
      '_loadTexture',
      '_assetsLoadedHandler',
      '_setOrbitalControls',
      '_orbitControlsHandler',
      '_mousemoveHandler',
      '_setIsReadyRaycast',
      '_setMouseMoveTargetCamera',
      '_changeShaderTextureHovered'
    )

    this._canvas = canvas;

    this._state = state;

    // this._delta = 0;
    this._clock = new THREE.Clock()
    this._previousTime = 0;

    this._camera;

    this._controls;

    this._currentIntersectID = 0;

    this._enableRaycastMenu = false

    //Groups
    this._vitrailGroup = new THREE.Group;
    this._collierGroup = new THREE.Group;
    this._violoncelleGroup = new THREE.Group;
    this._chapeauGroup = new THREE.Group;

    this._chaptersTestObject = []

    this._newColorTextureHover = []
    this._currentColorTextureHover = []

    this._newMaterialArray = [
      // '/assets/textures/menu/newMaterials/verre_baseColor.png',
      '',
      '/assets/textures/menu/newMaterials/plombs_baseColor.jpg',
      '/assets/textures/menu/newMaterials/collier_baseColor.jpg',
      '/assets/textures/menu/newMaterials/contreBasse_baseColor.jpg',
      '/assets/textures/menu/newMaterials/chapeau_baseColor.jpg'
    ]

    this._currentMaterialArray = [
      // '/assets/textures/menu/currentMaterials/vitrail_baseColor.jpg',
      '',
      '/assets/textures/menu/currentMaterials/plombs_baseColor.png',
      '/assets/textures/menu/currentMaterials/collier_baseColor.jpg',
      '/assets/textures/menu/currentMaterials/contreBasse_baseColor.jpg',
      '/assets/textures/menu/currentMaterials/chapeau_baseColor.jpg'
    ]

    this._soundsChaptersHoveredArray = [
      'assets/audios/menu/chapters/vitrailliste.mp3',
      'assets/audios/menu/chapters/joallier.mp3',
      'assets/audios/menu/chapters/luthier.mp3',
      'assets/audios/menu/chapters/chapelier.mp3',
    ]

    this._loadingManager

    //Set the visible vitrail child
    this._vitrailVisible

    // Mouse target camera
    this._windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    this._mouse = new THREE.Vector2();
    this._target = new THREE.Vector2();


    this._setup();
    this._loadAssets();
    this._scene.add(this._vitrailGroup, this._collierGroup, this._violoncelleGroup, this._chapeauGroup);
  }

  _setup() {
    this._scene = new THREE.Scene();

    this._camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    this._camera.position.set(0, 1, 0);
    this._camera.rotation.set(0, 0, 0)
    this._scene.add(this._camera);

    this._ambientLight = new THREE.AmbientLight(0xffffff, 1)
    this._scene.add(this._ambientLight);

    this._renderer = new THREE.WebGLRenderer({
      //canvas: this._canvas,
      antialias: true,
    });

    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.toneMapping = THREE.NoToneMapping
    this._renderer.outputEncoding = THREE.sRGBEncoding

    this._canvas.appendChild(this._renderer.domElement);

    this._mouse = new THREE.Vector2();
    this._rayCaster = new THREE.Raycaster();
    this._pointerControls

    this._modal = {
      current: null,
      old: null
    }

    this._currentIntersect = null;

    // this._setOrbitalControls();
    this._setupEventListeners();
    this._resizeHandler();
    this._setEnvironmentMap();
    this._loadTexture();
    this._setNewState();
    this._setNewAudioHovered()
    this._setIsReadyRaycast()

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
    for (let name in this._models) {
      this.object = this._models[name].scene;
      this.object.traverse(child => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          // child.material.envMap = environmentMap
          // child.material.envMapIntensity = 5

          child.castShadow = true
          child.receiveShadow = true
        }

        if ("menu" === child.name) {
          this._addToScene(child)
          console.log(child);
          SetupMenuChaptersRaycast(child, this._chaptersTestObject)
          this.idChapterHovered = new MenuHoveredManager(0);
        }
        if ("vitrailVisible" === child.name) {
          this._vitrailVisible = child;
        }
        if ("vitrail" === child.name) {
          child.material.opacity = 0;
          child.material.transparent = true;
        }
        if ("cameraMenu_Orientation" === child.name) {
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
  }

  _rayCast(e) {
    //return la bonne valeur
    if (this._enableRaycastMenu === false) return;

    this._mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this._mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

    this._rayCaster.setFromCamera(this._mouse, this._camera);

    let intersects = this._rayCaster.intersectObjects(this._chaptersTestObject, false);

    this.rayCastHandler(intersects);
  }

  rayCastHandler(intersects) {
    this._object

    this._currentModal;
    this._previousModal;

    this._currentObjectName
    this._previousObjectName

    if (intersects[0]) {
      this._object = intersects[0].object;

      this._currentIntersect = this._object;

      document.querySelector("html").style.cursor = "pointer";

      this._currentObjectName = this._currentIntersect.name;
      this.idChapterHovered.SetCurrentIdHovered(this._currentObjectName);

      this._modal.current = this.idChapterHovered.currentID;

      this._idModal = 'modal-menu-' + this._modal.current;
      this._currentModal = document.getElementById(this._idModal);

      // if(!!this._currentModal) return;
      if (this._currentModal) {
        this._currentModal.classList.remove('invisible');
      }


      if (this._currentModal !== this._previousModal) {
        if (this._previousModal) {
          this._previousModal.classList.add('invisible');
        }
      }


      if (0 === this.idChapterHovered.textureID) {
        this._vitrailVisible.children.map((elm) => {

          if ("vitrailVerre" === elm.name) {
            // elm.material = new THREE.MeshBasicMaterial({ map: this._newColorTextureHover[0] })
          } else if ("vitrailPlomb" === elm.name) {
            console.log('ALLLLO');
            // elm.material = new THREE.MeshBasicMaterial({ map: this._newColorTextureHover[1] })
            elm.material = new THREE.ShaderMaterial({
              vertexShader: textureHoveredVertexShader,
              fragmentShader: textureHoveredFragmentShader,
              uniforms: {
                uTexture: { value: this._newColorTextureHover[1] }
              }
            })
          }
          // elm.material.needsUpdate = true;
        })
      } else {
        this._currentIntersect.material = new THREE.ShaderMaterial({
          vertexShader: textureHoveredVertexShader,
          fragmentShader: textureHoveredFragmentShader,
          uniforms: {
            uTexture: { value: this._newColorTextureHover[this.idChapterHovered.textureID] }
          }
        })
        // this._currentIntersect.material.needsUpdate = true;
      }


      this._setNewAudioHovered(this._soundsChaptersHoveredArray[this.idChapterHovered.soundID])

      //   console.log('mouse enter')
    }
    else {
      if (this._currentIntersect) {
        //   _previousModal.log('mouse leave')

        this._previousModal = this._currentModal;
        this._previousObjectName = this._currentObjectName;

        if (0 === this.idChapterHovered.textureID) {
          this._vitrailVisible.children.map((elm) => {

            if ("vitrailVerre" === elm.name) {
              //Add shader texture verre
              // elm.material = new THREE.MeshBasicMaterial({ map: this._currentColorTextureHover[0] })

            } else if ("vitrailPlomb" === elm.name) {
              elm.material = new THREE.ShaderMaterial({
                vertexShader: textureHoveredVertexShader,
                fragmentShader: textureHoveredFragmentShader,
                uniforms: {
                  uTexture: { value: this._currentColorTextureHover[1] }
                }
              })
            }
            // elm.material.needsUpdate = true;
          })
        } else {
          this._currentIntersect.material = new THREE.ShaderMaterial({
            vertexShader: textureHoveredVertexShader,
            fragmentShader: textureHoveredFragmentShader,
            uniforms: {
              uTexture: { value: this._currentColorTextureHover[this.idChapterHovered.textureID] }
            }
          })
          // this._currentIntersect.material.needsUpdate = true;
        }


        document.querySelector("html").style.cursor = "initial";
      }
    }

  }

  _loadTexture() {

    this._loadingManager = new THREE.LoadingManager()
    this._textureLoader = new THREE.TextureLoader(this._loadingManager)

    this._newMaterialArray.map((url) => {
      this.colorTextureInstance = this._textureLoader.load(url);

      this.colorTextureInstance.wrapS = THREE.RepeatWrapping;
      this.colorTextureInstance.wrapT = THREE.RepeatWrapping;
      this.colorTextureInstance.flipY = false;
      this.colorTextureInstance.flipX = false;
      this.colorTextureInstance.encoding = THREE.sRGBEncoding;

      this._newColorTextureHover.push(this.colorTextureInstance);
    })

    this._currentMaterialArray.map((url) => {
      this.colorTextureInstance = this._textureLoader.load(url);

      this.colorTextureInstance.wrapS = THREE.RepeatWrapping;
      this.colorTextureInstance.wrapT = THREE.RepeatWrapping;
      this.colorTextureInstance.flipY = false;
      this.colorTextureInstance.flipX = false;
      this.colorTextureInstance.encoding = THREE.sRGBEncoding;

      this._currentColorTextureHover.push(this.colorTextureInstance);
    })

  }

  _changeShaderTextureHovered(texture) {
    new THREE.ShaderMaterial({
      vertexShader: textureHoveredVertexShader,
      fragmentShader: textureHoveredFragmentShader,
      uniforms: {
        uTexture: { value: texture }
      }
    })
  }

  _mousemoveHandler(e) {
    this._rayCast(e);
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

  _render() {
    const elapsedTime = this._clock.getElapsedTime();
    const deltaTime = elapsedTime - this._previousTime;
    this._previousTime = elapsedTime;

    if (this.cameraAnimator) {
      this.cameraAnimator.update(deltaTime)
    }

    this._orbitControlsHandler();

    this._renderer.render(this._scene, this._camera);
  }

  _tick() {
    this._target.x = - (this._mouse.x) * 0.00005;
    this._target.y = - (this._mouse.y) * 0.00003;

    this._camera.rotation.y += (this._target.x - this._camera.rotation.y)
    this._camera.rotation.x += (this._target.y - this._camera.rotation.x) + 300

    this._render();
  }

  _tickHandler() {
    this._tick();
    window.requestAnimationFrame(this._tickHandler);
  }

  _setupEventListeners() {
    this._tickHandler();
    window.addEventListener('resize', this._resizeHandler);
    window.addEventListener('mousemove', this._mousemoveHandler);
    window.addEventListener('mousemove', this._setMouseMoveTargetCamera, false)
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
    // this._controls.update();
  }

  _setNewState() {
    // this._state.toggleBreadcrumb();
  }

  _setNewAudioHovered(url) {
    this._state.handleUrl(url)
  }

  _setIsReadyRaycast() {
    const discoverButton = document.getElementById('discoverBtn')
    discoverButton.addEventListener('click', () => {
      this._enableRaycastMenu = true
    })
    return this._enableRaycastMenu
  }

  _setMouseMoveTargetCamera(event) {
    if (this._enableRaycastMenu === false) return;
    this._mouse.x = (event.clientX - this._windowHalf.x);
    this._mouse.y = (event.clientY - this._windowHalf.y);
  }

}

export default ThreeSceneMenu;