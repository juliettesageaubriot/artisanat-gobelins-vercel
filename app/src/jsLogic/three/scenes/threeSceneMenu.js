//vendors
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//utils
import bindAll from '@jsLogic/utils/bindAll';
import Stats from 'stats.js'

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
      '_setClickUrl',
      '_setTextureStructure',
      '_setTextureVitrail',
      '_setTextureContrebasse',
      '_setTextureChapeau',
      '_setTextureCollier',
      // '_setTextureGodRays',
      '_setMouseScss',
      '_setStats',
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

    this.objectsCurrentRaycast = []

    // Chaque tableau dépend de qui on hover, vitrailArray = j'hover le vitrail
    // Dans vitrailArray il y a la texture du collier qui provient d'un autre elm, c'est parce qu'il ne change pas

    this._currentTexture = []
    this._newVitrailColorTextureHover = []
    this._newChapeauColorTextureHover = []
    this._newCollierColorTextureHover = []
    this._newContrebasseColorTextureHover = []

    this._vitrailArray = [
      '/assets/textures/menu/newMaterials/vitrail/vitrail_baseColor.jpg',
      '/assets/textures/menu/newMaterials/vitrail/sol_baseColor.jpg',
      // '/assets/textures/menu/alphaGodRays.jpg'
    ]

    this._collierArray = [
      '/assets/textures/menu/newMaterials/collier/collier_baseColor.jpg',
      '/assets/textures/menu/newMaterials/collier/sol_baseColor.jpg',
    ]

    this._chapeauArray = [
      '/assets/textures/menu/newMaterials/chapeau/chapeau_baseColor.jpg',
      '/assets/textures/menu/newMaterials/chapeau/sol_baseColor.jpg',
    ]

    this._contrebasseArray = [
      '/assets/textures/menu/newMaterials/contrebasse/contreBasse_baseColor.jpg',
      '/assets/textures/menu/newMaterials/contrebasse/sol_baseColor.jpg',
    ]

    this._currentMaterialArray = [
      '/assets/textures/menu/currentMaterials/vitrail_baseColor.jpg',
      '/assets/textures/menu/currentMaterials/collier_baseColor.jpg',
      '/assets/textures/menu/currentMaterials/contreBasse_baseColor.jpg',
      '/assets/textures/menu/currentMaterials/chapeau_baseColor.jpg',
      '/assets/textures/menu/currentMaterials/sol_baseColor.jpg',
      // '/assets/textures/menu/alphaGodRays.jpg'
    ]

    this._soundsChaptersHoveredArray = [
      'assets/audios/menu/chapters/vitrailliste.mp3',
      'assets/audios/menu/chapters/chapelier.mp3',
      'assets/audios/menu/chapters/luthier.mp3',
      'assets/audios/menu/chapters/joallier.mp3',
    ]

    this._progress = 0
    this._increase

    /////
    this._loadingManager

    // Change texture
    this._materialEnable = false

    // chaque model
    this._verreElm
    this._plombElm
    this._chapeauElm
    this._contreBasseElm
    this._collierElm
    this._structureElm

    //Set the visible vitrail child
    this._vitrailVisible

    // Mouse target camera
    this._windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    this._mouse = new THREE.Vector2();
    this._target = new THREE.Vector2();

    //Stats
    this._stats

    this._setup();
    this._loadAssets();
    this._scene.add(this._vitrailGroup, this._collierGroup, this._violoncelleGroup, this._chapeauGroup);
  }

  _setup() {
    this._scene = new THREE.Scene();

    this._camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    this._camera.position.set(0, 1, 0);
    this._scene.add(this._camera);

    this._ambientLight = new THREE.AmbientLight(0xffffff, 1)
    this._scene.add(this._ambientLight);

    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas.current,
      antialias: true,
    });

    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.toneMapping = THREE.NoToneMapping
    this._renderer.outputEncoding = THREE.sRGBEncoding
    this._renderer.shadowMap.autoUpdate = false

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
    this._loadTexture();
    this._setupEventListeners();
    this._resizeHandler();
    this._setEnvironmentMap();
    this._setNewState();
    this._setNewAudioHovered()
    this._setIsReadyRaycast()
    this._setStats()
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
        // if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        // child.material.envMap = environmentMap
        // child.material.envMapIntensity = 5

        // child.castShadow = true
        // child.receiveShadow = true
        // }

        if ("menu" === child.name) {
          console.log(child);
          this._addToScene(child)
          SetupMenuChaptersRaycast(child, this.objectsCurrentRaycast)
          this.idChapterHovered = new MenuHoveredManager(0);
          child.children.map((elm) => {
            switch (elm.name) {
              case 'vitrail':
                this._vitrailElm = elm
                break;
              case 'collier':
                this._collierElm = elm
                break;
              case 'contrebasse':
                this._contreBasseElm = elm
                break;
              case 'chapeau':
                this._chapeauElm = elm
                break;
              case 'structure':
                this._structureElm = elm
                break;
              case 'rayonsLumineux':
                this._godRays = elm
                break;
            }
          })
        }

        if ("cameraMenu_Orientation" === child.name) {
          this._camera = child;
        }

        if ("structure" === child.name) {
          // Le GLTF nous donne une texture beaucoup plus claire
          this._structureElm.material = new THREE.MeshBasicMaterial({
            map: this._currentTexture[4]
          })
        }

        if ("rayonsLumineux" === child.name) {
          console.log(child);

          // child.rotation.x = Math.PI
          // child.material.color = '#CBE7DB'
          child.material.alphaMap = this.alphaGodRay
          child.material.transparent = true
          child.material.opacity = 0.5
          child.material.alphaTest = 0.5
          // child.material.opacity = 1
          // child.material.depthWrite = false
          // child.material.depthTest = false
          // child.material.opacity = 0.9
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

    let intersects = this._rayCaster.intersectObjects(this.objectsCurrentRaycast, false);

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

      this._increase = true

      this._currentObjectName = this._currentIntersect.name;
      this.idChapterHovered.SetCurrentIdHovered(this._currentObjectName);

      this._modal.current = this.idChapterHovered.currentID;

      this._idModal = 'modal-menu-' + this._modal.current;
      this._currentModal = document.getElementById(this._idModal);

      if (this._currentModal) {
        this._currentModal.classList.remove('invisible');
      }

      if (this._materialEnable === false) {

        switch (this.idChapterHovered.textureID) {
          case 0:
            this._vitrailElm.material = this._setTextureVitrail(this._currentTexture[0], this._newVitrailColorTextureHover[0], 1.0)
            this._collierElm.material = this._setTextureCollier(this._currentTexture[1], this._currentTexture[1], 1.0)
            this._contreBasseElm.material = this._setTextureContrebasse(this._currentTexture[2], this._currentTexture[2], 1.0)
            this._chapeauElm.material = this._setTextureChapeau(this._currentTexture[3], this._currentTexture[3], 1.0)
            this._structureElm.material = this._setTextureStructure(this._currentTexture[4], this._newVitrailColorTextureHover[1], 1.0)
            // this._godRays.material = this._setTextureGodRays(this._currentTexture[5], this._newVitrailColorTextureHover[2], 1.0)
            this._setMouseScss(true, false)
            break;


          case 1:
            this._vitrailElm.material = this._setTextureVitrail(this._currentTexture[0], this._currentTexture[0], 1.0)
            this._collierElm.material = this._setTextureCollier(this._currentTexture[1], this._currentTexture[1], 1.0)
            this._contreBasseElm.material = this._setTextureContrebasse(this._currentTexture[2], this._currentTexture[2], 1.0)
            this._chapeauElm.material = this._setTextureChapeau(this._currentTexture[3], this._newChapeauColorTextureHover[0], 1.0)
            this._structureElm.material = this._setTextureStructure(this._currentTexture[4], this._newChapeauColorTextureHover[1], 1.0)
            // this._godRays.material = this._setTextureGodRays(this._currentTexture[5], this._currentTexture[5], 0.0)
            this._setMouseScss(false, true)
            break;


          case 2:
            this._vitrailElm.material = this._setTextureVitrail(this._currentTexture[0], this._currentTexture[0], 1.0)
            this._collierElm.material = this._setTextureCollier(this._currentTexture[1], this._currentTexture[1], 1.0)
            this._contreBasseElm.material = this._setTextureContrebasse(this._currentTexture[2], this._newContrebasseColorTextureHover[0], 1.0)
            this._chapeauElm.material = this._setTextureChapeau(this._currentTexture[3], this._currentTexture[3], 1.0)
            this._structureElm.material = this._setTextureStructure(this._currentTexture[4], this._newContrebasseColorTextureHover[1], 1.0)
            // this._godRays.material = this._setTextureGodRays(this._currentTexture[5], this._currentTexture[5], 0.0)
            this._setMouseScss(false, true)
            break;

          case 3:
            this._vitrailElm.material = this._setTextureVitrail(this._currentTexture[0], this._currentTexture[0], 1.0)
            this._collierElm.material = this._setTextureCollier(this._currentTexture[1], this._newCollierColorTextureHover[0], 1.0)
            this._contreBasseElm.material = this._setTextureContrebasse(this._currentTexture[2], this._currentTexture[2], 1.0)
            this._chapeauElm.material = this._setTextureChapeau(this._currentTexture[3], this._currentTexture[3], 1.0)
            this._structureElm.material = this._setTextureStructure(this._currentTexture[4], this._newCollierColorTextureHover[1], 1.0)
            // this._godRays.material = this._setTextureGodRays(this._currentTexture[5], this._currentTexture[5], 0.0)
            this._setMouseScss(false, true)
            break;
        }
        this._setNewAudioHovered(this._soundsChaptersHoveredArray[this.idChapterHovered.soundID])
        this._materialEnable = true
        //   console.log('mouse enter')
      }

    } else {
      if (this._materialEnable === true) {

        if (this._currentIntersect) {
          if (this._currentModal) {
            this._currentModal.classList.add('invisible');
          }
          // this._previousModal = this._currentModal;
          // this._previousObjectName = this._currentObjectName;
          if (this._materialEnable === true) {
            this._currentIntersect.material.needsUpdate = true;

            this._materialEnable = false
            this._currentIntersect = null;
            this._increase = false

            document.querySelector("html").style.cursor = "url('/assets/images/ui/cursor/cursor.svg') 0 0, auto";
            // this._removeInactifMouse()
          }
        }
      }
    }
  }

  _loadTexture() {

    this._loadingManager = new THREE.LoadingManager()
    this._textureLoader = new THREE.TextureLoader(this._loadingManager)

    // Vitrail
    this._vitrailArray.map((url) => {
      this.colorTextureInstance = this._textureLoader.load(url);

      this.colorTextureInstance.wrapS = THREE.RepeatWrapping;
      this.colorTextureInstance.wrapT = THREE.RepeatWrapping;
      this.colorTextureInstance.flipY = false;
      this.colorTextureInstance.flipX = false;
      this.colorTextureInstance.encoding = THREE.sRGBEncoding;
      this.colorTextureInstance.transparent = true

      this._newVitrailColorTextureHover.push(this.colorTextureInstance);
    })

    // Collier
    this._collierArray.map((url) => {
      this.colorTextureInstance = this._textureLoader.load(url);

      this.colorTextureInstance.wrapS = THREE.RepeatWrapping;
      this.colorTextureInstance.wrapT = THREE.RepeatWrapping;
      this.colorTextureInstance.flipY = false;
      this.colorTextureInstance.flipX = false;
      this.colorTextureInstance.encoding = THREE.sRGBEncoding;

      this._newCollierColorTextureHover.push(this.colorTextureInstance);
    })

    // Contrebasse
    this._contrebasseArray.map((url) => {
      this.colorTextureInstance = this._textureLoader.load(url);

      this.colorTextureInstance.wrapS = THREE.RepeatWrapping;
      this.colorTextureInstance.wrapT = THREE.RepeatWrapping;
      this.colorTextureInstance.flipY = false;
      this.colorTextureInstance.flipX = false;
      this.colorTextureInstance.encoding = THREE.sRGBEncoding;

      this._newContrebasseColorTextureHover.push(this.colorTextureInstance);
    })

    // Chapeau
    this._chapeauArray.map((url) => {
      this.colorTextureInstance = this._textureLoader.load(url);

      this.colorTextureInstance.wrapS = THREE.RepeatWrapping;
      this.colorTextureInstance.wrapT = THREE.RepeatWrapping;
      this.colorTextureInstance.flipY = false;
      this.colorTextureInstance.flipX = false;
      this.colorTextureInstance.encoding = THREE.sRGBEncoding;

      this._newChapeauColorTextureHover.push(this.colorTextureInstance);
    })

    // CurrentMaterial
    this._currentMaterialArray.map((url) => {
      this.colorTextureInstance = this._textureLoader.load(url);

      this.colorTextureInstance.wrapS = THREE.RepeatWrapping;
      this.colorTextureInstance.wrapT = THREE.RepeatWrapping;
      this.colorTextureInstance.flipY = false;
      this.colorTextureInstance.flipX = false;
      this.colorTextureInstance.encoding = THREE.sRGBEncoding;

      this._currentTexture.push(this.colorTextureInstance);
    })

    // Alpha 
    this.alphaGodRay = this._textureLoader.load('/assets/textures/menu/alphaGodRays.jpg');
    this.alphaGodRay.wrapS = THREE.RepeatWrapping;
    this.alphaGodRay.wrapT = THREE.RepeatWrapping;
    this.alphaGodRay.flipY = false;
    this.alphaGodRay.flipX = false;
    this.alphaGodRay.encoding = THREE.sRGBEncoding;

  }

  _setTextureStructure(texture1, texture2, opacity) {
    this._textureShaderStructure = new THREE.ShaderMaterial({
      vertexShader: textureHoveredVertexShader,
      fragmentShader: textureHoveredFragmentShader,
      transparent: true,
      precision: 'lowp',
      uniforms: {
        uTexture1: { value: texture1 },
        uTexture2: { value: texture2 },
        uOpacity: { value: opacity },
        progress: { value: 0 }
      }
    })
    return this._textureShaderStructure
  }

  _setTextureVitrail(texture1, texture2, opacity) {
    this._textureShaderVitrail = new THREE.ShaderMaterial({
      vertexShader: textureHoveredVertexShader,
      fragmentShader: textureHoveredFragmentShader,
      transparent: true,
      precision: 'lowp',
      uniforms: {
        uTexture1: { value: texture1 },
        uTexture2: { value: texture2 },
        uOpacity: { value: opacity },
        progress: { value: 0 }
      }
    })
    return this._textureShaderVitrail
  }

  _setTextureCollier(texture1, texture2, opacity) {
    this._textureShaderCollier = new THREE.ShaderMaterial({
      vertexShader: textureHoveredVertexShader,
      fragmentShader: textureHoveredFragmentShader,
      transparent: true,
      precision: 'lowp',
      uniforms: {
        uTexture1: { value: texture1 },
        uTexture2: { value: texture2 },
        uOpacity: { value: opacity },
        progress: { value: 0 }
      }
    })
    return this._textureShaderCollier
  }

  _setTextureChapeau(texture1, texture2, opacity) {
    this._textureShaderChapeau = new THREE.ShaderMaterial({
      vertexShader: textureHoveredVertexShader,
      fragmentShader: textureHoveredFragmentShader,
      transparent: true,
      precision: 'lowp',
      uniforms: {
        uTexture1: { value: texture1 },
        uTexture2: { value: texture2 },
        uOpacity: { value: opacity },
        progress: { value: 0 }
      }
    })
    return this._textureShaderChapeau
  }

  _setTextureContrebasse(texture1, texture2, opacity) {
    this._textureShaderContrebasse = new THREE.ShaderMaterial({
      vertexShader: textureHoveredVertexShader,
      fragmentShader: textureHoveredFragmentShader,
      transparent: true,
      precision: 'lowp',
      uniforms: {
        uTexture1: { value: texture1 },
        uTexture2: { value: texture2 },
        uOpacity: { value: opacity },
        progress: { value: 0 }
      }
    })
    return this._textureShaderContrebasse
  }

  // _setTextureGodRays(texture1, texture2, opacity) {
  //   this._textureShaderGodRays = new THREE.ShaderMaterial({
  //     vertexShader: textureHoveredVertexShader,
  //     fragmentShader: textureHoveredFragmentShader,
  //     transparent: true,
  //     precision: 'lowp',
  //     uniforms: {
  //       uTexture1: { value: texture1 },
  //       uTexture2: { value: texture2 },
  //       uOpacity: { value: opacity },
  //       progress: { value: 0 }
  //     }
  //   })
  //   return this._setTextureGodRays
  // }

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

    // Update renderer
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

    // this._orbitControlsHandler();
    this._renderer.render(this._scene, this._camera);
  }

  _tick() {
    if (this._stats) this._stats.begin()


    this._target.x = - (this._mouse.x) * 0.00005;
    this._target.y = - (this._mouse.y) * 0.00003;

    this._camera.rotation.y += (this._target.x - this._camera.rotation.y)
    this._camera.rotation.x += (this._target.y - this._camera.rotation.x) + 300

    if (this._increase === true) {
      if (this._progress < 1) {
        this._progress += 0.05;
      }
    } else if (this._increase === false) {
      if (this._progress > 0) {
        this._progress -= 0.05;
      }
    }
    if (this._progress) {
      if (this._textureShaderStructure) this._textureShaderStructure.uniforms.progress.value = this._progress;
      if (this._textureShaderVitrail) this._textureShaderVitrail.uniforms.progress.value = this._progress
      if (this._textureShaderCollier) this._textureShaderCollier.uniforms.progress.value = this._progress
      if (this._textureShaderContrebasse) this._textureShaderContrebasse.uniforms.progress.value = this._progress
      if (this._textureShaderChapeau) this._textureShaderChapeau.uniforms.progress.value = this._progress
      // if (this._textureShaderGodRays) this._textureShaderGodRays.uniforms.progress.value = this._progress

    }

    this._render();
    if (this._stats) this._stats.end()
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
    window.addEventListener('click', this._setClickUrl, false);
  }

  _setClickUrl() {
    if (this._currentIntersect) {
      this._currentObjectName = this._currentIntersect.name;
      this.idChapterHovered.SetCurrentIdHovered(this._currentObjectName);
      if (!!this.idChapterHovered.url) {
        document.location.href = this.idChapterHovered.url
      }
    }
  }

  _setEnvironmentMap() {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    this._environmentMap = cubeTextureLoader.load([
      'assets/textures/environmentMaps/px.png',
      'assets/textures/environmentMaps/nx.png',
      'assets/textures/environmentMaps/py.png',
      'assets/textures/environmentMaps/ny.png',
      'assets/textures/environmentMaps/pz.png',
      'assets/textures/environmentMaps/nz.png'
    ])
    this._environmentMap.encoding = THREE.sRGBEncoding;
    this._scene.background = this._environmentMap;
    this._scene.environment = this._environmentMap;

    return this._environmentMap;
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

  _setMouseScss(active, inactif) {
    const cursor = document.querySelector("html");
    if (active === true) {
      cursor.style.cursor = "url('/assets/images/ui/cursor/cursor.svg') 0 0, auto";
    } else if (inactif === true) {
      cursor.style.cursor = "url('/assets/images/ui/cursor/cursor-inactif.svg') 0 0, auto";
    }
  }

  _setStats() {
    this._stats = new Stats()
    this._stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this._stats.dom)
  }

}

export default ThreeSceneMenu;