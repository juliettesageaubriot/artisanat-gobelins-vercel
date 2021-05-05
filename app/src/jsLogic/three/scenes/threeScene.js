//vendors
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'

//utils
import bindAll from '@jsLogic/utils/bindAll';

//modules
import AssetsLoader from '@jsLogic/three/assetsLoader';
import AnimationManager from "@jsLogic/three/animationManager.js";
import CameraManager from "@jsLogic/three/cameraManager.js";
import BreadcrumbManager from '@jsLogic/breadcrumb/breadcrumbManager.js';
import StepManager from "@jsLogic/stepManager/stepManager.js"
import UIManager from "@jsLogic/UIManager/UIManager.js";

import { SetupColorPicker } from '@jsLogic/utils/colorPickersHelper';

const SETTINGS = {
    enableRaycast: true,
    enableOrbitControl: false,
    idCamera: [0, 1, 2],
    enableDragAndDrop: true
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
            'rayCastHandler',
            '_dragAndDropControls',
            '_colorPickerHandler',
            '_toggleDragAndDropControls',
            '_glassCutOutPressureGauge',
            '_pressureGaugeHandler',
            '_paperCutOutScrollHandler',
            '_paperCutOutScrollAnimation',
            '_glassCutOut'
        );

        this._canvas = canvas;

        this._state = state;

        //Clock delta
        this._clock = new THREE.Clock()
        this._previousTime = 0;

        this._camera;
        this._cameras;

        this._controls;

        //Groups
        this._vitrailGroup = new THREE.Group;
        this._atelierGroup = new THREE.Group;
        this._atelierV04Group = new THREE.Group;

        //Raycast Arrays
        this._paperCutOutRaycastObject = [];
        this._colorPickerRaycastObject = [];
        this._glassCutOutRaycastObject = [];

        //ColorPickerName Array
        this._vitrailObjects = [];

        //PieceDecoupe Array
        this._piece_decoupeeObjects = [];

        //Draggable Objects
        this._dragItems = [];

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

        this._stepManager = new StepManager(3, 2);

        this._breadcrumbManager = new BreadcrumbManager(true, "La découpe du tracé");

        this._UIManager = new UIManager();

        this._pressureGaugeValue = 0;

        this._scrollTimeline = 0;
        this._scrollY = 0;

        this._colorPicked = {
            current: null,
            old: null
        }

        this._isRunningDecoupeTrace = false;

        this._feuilleAnimations = [];

        this._currentIntersect = null;

        this._enableDragAndDrop = true;

        // this._setOrbitalControls();
        this._setupEventListeners();
        this._resizeHandler();
        this._setEnvironmentMap();
        this._setNewState();
    }

    _setCameraAnimationPlay(index) {
        if (index === "none") return;
        this._camera = this._cameras[index];
        this.cameraManager.StartAnimation(index);
        // console.log(this._stepManager._globalStep);
        // this._stepManager.addGlobalStep();
        // this._toggleDragAndDropControls();
    }
    _setCameraAnimationReverse(index) {
        this._camera = this._cameras[index];
        this.cameraManager.ReverseAnimation(index)
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

            // console.log(this.object);
            this.object.traverse(child => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    // child.material.envMap = environmentMap
                    // child.material.envMapIntensity = 5
                    child.castShadow = true
                    child.receiveShadow = true
                }

                if ("colorPickerGroup" === child.name) {

                    this._vitrailGroup.add(child);
                    SetupColorPicker(child, this._colorPickerRaycastObject, this._vitrailObjects);

                    this._vitrailGroup.position.set(-1.5, 1, 2.2);
                    // this._vitrailGroup.position.set(0.5, 1, -1.5);
                    this._vitrailGroup.rotation.set(0, Math.PI / 2, 0);
                    this._vitrailGroup.scale.set(0.2, 0.2, 0.2);

                } else if ("atelier" === child.name) {

                    this._addToScene(child);
                    // console.log(child)

                    this._cameras = [...this._models[name].cameras];
                    this._cameraAnimations = [...this._models[name].animations];

                    this.cameraAnimator = new AnimationManager(child, this._cameraAnimations);
                    this.cameraManager = new CameraManager(this._camera, this._cameras, this.cameraAnimator);

                } else if ("CameraAtelier1_Orientation" === child.name) {

                    this._camera = child;

                } else if ("IPHONE001" === child.name) {

                    this._dragItems.push(child);
                    this._paperCutOutRaycastObject.push(child);

                } else if ("feuille" === child.name) {

                    this._feuilleAnimations = [...this._models[name].animations];
                    this._addToScene(child);

                    this.feuilleAnimator = new AnimationManager(child, this._feuilleAnimations);
                    this.feuilleManager = new CameraManager(this._camera, this._cameras, this.feuilleAnimator);

                } else if("Piece_decoupe" === child.name) {

                    this._addToScene(child);

                    this._piece_decoupeAnimations = [...this._models[name].animations];
                    this._piece_decoupeAnimationsClickOne = [];
                    this._piece_decoupeAnimationsClickTwo = [];
                    this._piece_decoupeAnimationsClickThree = [];
                    this._piece_decoupeAnimationsSuccessCut = [];

                    this._models[name].animations.map(animation => {
                        if("Click1" === animation.name) {

                            this._piece_decoupeAnimationsClickOne.push(animation);
                            console.log(this._piece_decoupeAnimationsClickOne)

                        } else if("Click2" === animation.name) {

                            this._piece_decoupeAnimationsClickTwo.push(animation);

                        } else if("Click3" === animation.name) {

                            this._piece_decoupeAnimationsClickThree.push(animation);

                        } else if("SuccessCut" === animation.name) {

                            this._piece_decoupeAnimationsSuccessCut.push(animation);
                            console.log(this._piece_decoupeAnimationsSuccessCut)

                        }
                    })
                    console.log(this._piece_decoupeAnimations);

                    this._piece_decoupeAnimationsClickOneAnimator = new AnimationManager(child, this._piece_decoupeAnimationsClickOne);
                    this._piece_decoupeAnimationsClickTwoAnimator = new AnimationManager(child, this._piece_decoupeAnimationsClickTwo);
                    this._piece_decoupeAnimationsClickThreeAnimator = new AnimationManager(child, this._piece_decoupeAnimationsClickThree);
                    this._piece_decoupeAnimationsSuccessCutAnimator = new AnimationManager(child, this._piece_decoupeAnimationsSuccessCut);
                    
                    // setTimeout(() => {
                    //     this._piece_decoupeAnimationsSuccessCutAnimator.playClipByIndex(0);
                    // }, 5000);

                    child.traverse(child => {
                        this._glassCutOutRaycastObject.push(child);
                        if("debut" === child.name || "milieu" === child.name || "fin" === child.name) {
                            this._piece_decoupeeObjects.push(child.name);
                        }
                    });

                    // console.log(this._glassCutOutRaycastObject);

                    child.position.set(0, 1.2, -2.2);
                    child.scale.set(0.10, 0.10, 0.10);
                    child.rotation.set(-Math.PI / 2, 0, 0);

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
        // this._dragAndDropControls();

        // this._state.start();

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

        let intersects = this._setRaycastObjectCheck();

        this.rayCastHandler(intersects);
    }

    _setRaycastObjectCheck() {
        this._globalStep = this._stepManager._globalStep;
        this._subStep = this._stepManager._subStep;

        this._currentRaycastObject = [];

        if (this._globalStep === 0) {

            this._currentRaycastObject = this._paperCutOutRaycastObject;

        } else if (this._globalStep === 1) {

            this._currentRaycastObject = this._colorPickerRaycastObject;

        } else if (this._globalStep === 2) {

            this._currentRaycastObject = this._glassCutOutRaycastObject;

        }

        return this._rayCaster.intersectObjects(this._currentRaycastObject);
    }

    rayCastHandler(intersects) {
        this._globalStep = this._stepManager._globalStep;
        this._subStep = this._stepManager._subStep;

        if (this._globalStep === 0) {

            switch (this._subStep) {
                case 0 :
                    this._paperCutOutDragAndDropHandler(intersects[0]);
                    break;
                case 1:
                    this._paperCutOutScrollAnimHandler(intersects[0]);
                    break;
            }

        } else if (this._globalStep === 1) {

            // this._colorPickerHandler(intersects[0]);

        } else if (this._globalStep === 2) {

            switch (this._subStep) {

                case 0:
                    //console.log("sous-étape 1: drag and drop patron sur bout de verre");
                    break;
                case 1:
                    // console.log("sous-étape 2: découpe du verre");
                    this._glassCutOut(intersects[0]);
                    break;
                case 2:
                    // console.log("sous-étape 3: drag and drop pour enlever le bout de papier");
                    break;
                case 3:
                    // console.log("sous-étape 4: Jauge de pression pour casser le bout de verre");
                    this._glassCutOutPressureGauge(intersects[0]);
                    break;
                case 4:
                    // console.log("sous-étape 5: cassage des derniers petits bout de verre");
                    this._glassCutOutPinceAGruger(intersects[0])
                    break;
                case 5:
                    // console.log("sous-étape 6: drag and drop au milieu du vitrail fini");
                    break;
            }

        }


    }

    _colorPickerHandler(intersect) {
        //On pourrait également utiliser cette technique
        // this._globalStep = this._stepManager._globalStep;
        // this._subStep = this._stepManager._subStep;

        // if(this._globalStep !== 1) return
        if (intersect) {
            this._object = intersect.object;
            //console.log(this._object);
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

    _colorPickerMouseDown() {
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
    _colorPickerMouseUp() {
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

    _paperCutOutDragAndDropHandler(intersect) {
        if (intersect) {
            this._object = intersect.object;
            console.log(this._object);
            // setInterval(() => {
            //     console.log(this._object);
            // }, 1000)
        }
        else {

        }
    }

    _paperCutOutMouseDown() {
        console.log("paper cut out mousedown");

    }
    _paperCutOutMouseUp() {
        console.log("paper cut out mouseup");
    }

    _paperCutOutScrollAnimHandler(intersect) {
        if (intersect) {
            this._object = intersect.object;
            console.log(this._object);
        }
        else {

        }
    }

    _glassCutOutPressureGauge(intersect) {
        if (intersect) {
            this._object = intersect.object;
            // console.log(this._object);
        }
        else {

        }
    }

    _glassCutOutPinceAGruger(intersect) {
        if (intersect) {
            this._object = intersect.object;
            // console.log(this._object);
        }
        else {

        }
    }

    _glassCutOutPinceAGrugerMouseDown() {
        console.log("pince à gruger mousedown");
    }

    _glassCutOutPinceAGrugerMouseUp() {
        console.log("pince à gruger up");
    }

    _glassCutOut(intersect) {
        if (intersect) {
            this._object = intersect.object;
            if (this._currentIntersect) {
                //C'est ce qui se passe quand on vient de rentrer dans l'object
                // console.log('mouse enter';
                if(!this._piece_decoupeeObjects.includes(this._currentIntersect.name) && this._isRunningDecoupeTrace === true) {
                    console.log("Vous avez raté ! Mince alors !");
                    this._isRunningDecoupeTrace = false;
                }
            }

            this._currentIntersect = this._object;
        }
        else {
            if (this._currentIntersect) {
                //Si on était sur un objet que l'on vient de quitter
                // console.log('mouse leave')
            }

            this._currentIntersect = null
        }
    }

    _glassCutOutMouseDown() {
        if (this._currentIntersect) {
            switch (this._currentIntersect.name) {
                case "debut":
                    console.log('je suis le début')
                    this._isRunningDecoupeTrace = true;
                    break
            }
        }
    }

    _glassCutOutMouseUp() {
        if (this._currentIntersect && this._isRunningDecoupeTrace === true) {
            switch (this._currentIntersect.name) {
                case "fin":
                    console.log("je suis la fin")
                    this._isRunningDecoupeTrace = false;
                    //Etape validé du coup actionstepmanager
                    break
                default:
                    this._isRunningDecoupeTrace = false;
                    console.log("perdu!")
            }
        }
    }

    _glassCutOutPressureGaugeMouseDown() {
        console.log("glass mouse down");
    }
    _glassCutOutPressureGaugeMouseUp() {
        console.log("glass mouse up")
        if (this._pressureGaugeValue > 80 && this._pressureGaugeValue < 100) {
            console.log("vous avez gagné !");
            this._piece_decoupeAnimationsSuccessCutAnimator.playClipByIndex(0);
        } else {
            console.log("vous avez perdu !");
            this._pressureGaugeValue = 0;
            this._UIManager.UI.pressureGauge.style.transform = `scale(1)`;
        }
    }



    _animateCameraPlay(index) {
        let buttonCamera1 = document.createElement("button");
        buttonCamera1.style.position = "absolute";
        buttonCamera1.style.top = (1 + (index * 30)) + "px";
        buttonCamera1.innerHTML = "Camera " + (index + 1);

        // // 2. Append somewhere
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(buttonCamera1);

        // // 3. Add event handler
        buttonCamera1.addEventListener("click", () => {
            this._setCameraAnimationPlay(index);
            this._UIManager.setTracePicto(50, 30)
        });
    }

    _animateCameraReverse(index) {
        let buttonCamera1 = document.createElement("button");
        buttonCamera1.style.position = "absolute";
        buttonCamera1.style.top = (60 + (index * 30)) + "px";
        buttonCamera1.innerHTML = "Camera reverse" + (index + 1);

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
        this._isMouseDown = true;
        this._globalStep = this._stepManager._globalStep;
        this._subStep = this._stepManager._subStep;

        if (this._globalStep === 0) {

            switch (this._subStep) {
                case 0 :
                    this._paperCutOutMouseDown();
                    break;
                case 1:
                    // console.log("sous-étape 2");
                    break;
            }

        } else if (this._globalStep === 1) {

            this._colorPickerMouseDown();

        } else if (this._globalStep === 2) {

            switch (this._subStep) {

                case 0:
                    // console.log("sous-étape 1: drag and drop patron sur bout de verre");
                    break;
                case 1:
                    // console.log("sous-étape 2: découpe du verre");
                    this._glassCutOutMouseDown();
                    break;
                case 2:
                    // console.log("sous-étape 3: drag and drop pour enlever le bout de papier");
                    break;
                case 3:
                    // console.log("sous-étape 4: Jauge de pression pour casser le bout de verre");
                    this._glassCutOutPressureGaugeMouseDown();
                    break;
                case 4:
                    // console.log("sous-étape 5: cassage des derniers petits bout de verre");
                    this._glassCutOutPinceAGrugerMouseDown();
                    break;
                case 5:
                    // console.log("sous-étape 5: drag and drop au milieu du vitrail fini");
                    break;
            }

        }

    }

    _mousePointerUpHandler(e) {
        this._isMouseDown = false;
        this._globalStep = this._stepManager._globalStep;
        this._subStep = this._stepManager._subStep;

        if (this._globalStep === 0) {
            switch (this._subStep) {
                case 0 :
                    this._paperCutOutMouseUp();
                    break;
                case 1:
                    // console.log("sous-étape 2");
                    break;
            }

        } else if (this._globalStep === 1) {

            this._colorPickerMouseUp();

        } else if (this._globalStep === 2) {

            switch (this._subStep) {

                case 0:
                    // console.log("sous-étape 1: drag and drop patron sur bout de verre");
                    break;
                case 1:
                    // console.log("sous-étape 2: découpe du verre");
                    this._glassCutOutMouseUp();
                    break;
                case 2:
                    // console.log("sous-étape 3: drag and drop pour enlever le bout de papier");
                    break;
                case 3:
                    // console.log("sous-étape 4: Jauge de pression pour casser le bout de verre");
                    this._glassCutOutPressureGaugeMouseUp();
                    break;
                case 4:
                    // console.log("sous-étape 5: cassage des derniers petits bout de verre");
                    break;
                case 5:
                    // console.log("sous-étape 5: drag and drop au milieu du vitrail fini");
                    break;
            }

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
        if (this.feuilleAnimator) {
            this.feuilleAnimator.update(deltaTime)
        }
        if (this._piece_decoupeAnimationsClickOneAnimator) {
            this._piece_decoupeAnimationsClickOneAnimator.update(deltaTime)
        }
        if (this._piece_decoupeAnimationsClickTwoAnimator) {
            this._piece_decoupeAnimationsClickTwoAnimator.update(deltaTime)
        }
        if (this._piece_decoupeAnimationsClickThreeAnimator) {
            this._piece_decoupeAnimationsClickThreeAnimator.update(deltaTime)
        }
        if (this._piece_decoupeAnimationsSuccessCutAnimator) {
            this._piece_decoupeAnimationsSuccessCutAnimator.update(deltaTime)
        }

        this._pressureGaugeHandler(deltaTime);

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
        window.addEventListener('wheel', this._paperCutOutScrollHandler);
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
        this._state.setToolsArray1()
    }

    _dragAndDropControls() {
        if (!SETTINGS.enableDragAndDrop) return;

        this._dragAndDropControls = new DragControls(this._dragItems, this._camera, this._renderer.domElement);

        this._dragAndDropControls.enabled = true;
        this._enableDragAndDrop = true;

        this._dragStart = (event) => {

            event.object.material.emissive.set(0xaaaaaa);

        }
        this._drag = (event) => {

            if (event.object.position.y < 1.05) {
                event.object.position.y = 1.05;
            }

        }
        this._dragEnd = (event) => {

            event.object.material.emissive.set(0x000000);
        }

        this._toggleDragAndDropControls();

    }

    _toggleDragAndDropControls() {
        //On utilise cette fonction afin de toggle le drag and drop
        if (this._enableDragAndDrop) {
            this._dragAndDropControls.addEventListener('dragstart', this._dragStart);
            this._dragAndDropControls.addEventListener('drag', this._drag)
            this._dragAndDropControls.addEventListener('dragend', this._dragEnd);
            this._enableDragAndDrop = false;
            this._dragAndDropControls.enabled = true;
        } else {
            this._dragAndDropControls.removeEventListener('dragstart', this._dragStart);
            this._dragAndDropControls.removeEventListener('drag', this._drag);
            this._dragAndDropControls.removeEventListener('dragend', this._dragEnd);
            this._enableDragAndDrop = true;
            this._dragAndDropControls.enabled = false;
        }
    }

    _setToggleBreadcrumb() {
        this.breadcrumbManager.breadcrumbToggle()

        const breadcrumbElm = document.querySelector('.breadcrumb_container')
        if (this.breadcrumbManager.show === false) {
            breadcrumbElm.classList.remove('show')
        } else {
            breadcrumbElm.classList.add('show')
        }
    }

    _setNameAtelierBreadcrumb(name) {
        this.breadcrumbManager.changeNameAtelier(name)
    }

    _setAddSubStep() {
        this.addStepManager.addSubStep()
        console.log(this.addStepManager.subStep)
    }

    _setAddGlobalStep() {
        // let ateliersNumber = 5

        this.addStepManager.addGlobalStep()
        console.log(this.addStepManager.globalStep)

        const breadcrumbElm = document.querySelector('.breadcrumb_container')
        // let breadcrumbUl = document.querySelector('.list-breadcrumb')
        // let li = breadcrumbUl.childNodes[this.addStepManager.globalStep - 1]

        breadcrumbElm.setAttribute('data-step', this.addStepManager.globalStep)

        // Si jamais les designs veulent changer la couleurs quand ça a été actif
        // if(this.addStepManager.globalStep > ateliersNumber) return
        // li.classList.add('actived')
    }

    _pressureGaugeHandler(deltaTime) {
        this._globalStep = this._stepManager._globalStep;
        this._subStep = this._stepManager._subStep;

        if (this._globalStep !== 2 || this._subStep !== 3) return;

        if (this._isMouseDown) {
            this._pressureGaugeValue += Math.ceil(deltaTime);
            console.log(this._pressureGaugeValue);
            this._UIManager.UI.pressureGauge.style.transform = `scale(${1 + this._pressureGaugeValue / 100})`;
        }
    }

    _paperCutOutScrollHandler(e) {
        // console.log(e);
        this._animationDuration = 5.5;
        this._numberOfWheelEvent = 100;


        if (e.deltaY > 0) {
            this._scrollTimeline += this._animationDuration / this._numberOfWheelEvent;
            this._scrollY += 1;
            this._paperCutOutScrollAnimation();
            // setTimeout(() => {
            //     this._state.setStepValidation(0);
            // }, 4000)
        }
        //console.log(this._scrollTimeline + " : " + this._scrollY);
    }

    _paperCutOutScrollAnimation() {
        this._feuilleAnimations.map((animations, index) => {
            this.feuilleManager.ScrollAnimation(index, this._scrollTimeline);
        })
    }   

    addStep() {
        this._stepManager.addGlobalStep();
        console.log(this._stepManager._globalStep);
    }

    testOnEndSound(action) {
        console.log("Fin d'un subtitle: " + action)
        this._state.setNextSubtitle();
    }

}

export default ThreeScene;