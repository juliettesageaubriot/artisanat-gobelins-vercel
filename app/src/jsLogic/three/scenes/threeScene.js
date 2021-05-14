//vendors
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { LinearFilter } from 'three'
import { gsap } from 'gsap';

//utils
import bindAll from '@jsLogic/utils/bindAll';

//modules
import AssetsLoader from '@jsLogic/three/assetsLoader.js';
import AnimationManager from "@jsLogic/three/animationManager.js";
import CameraManager from "@jsLogic/three/cameraManager.js";
import BreadcrumbManager from '@jsLogic/breadcrumb/breadcrumbManager.js';
import StepManager from "@jsLogic/stepManager/stepManager.js"
import UIManager from "@jsLogic/UIManager/UIManager.js";
import ActionsStepManager from '@jsLogic/stepManager/actionsStepManager.js';

import { SetupColorPicker } from '@jsLogic/utils/colorPickersHelper';

//raycasts handlers
import { _paperCutOutScrollAnimHandler, _paperCutOutMouseDown, _paperCutOutMouseUp  } from '@jsLogic/three/raycast/step1/raycastStepOne';
import { _colorPickerHandler, _colorPickerMouseDown, _colorPickerMouseUp } from '@jsLogic/three/raycast/step2/raycastStepTwo';
import { _glassCutOut, _glassCutOutMouseDown, _glassCutOutMouseUp } from '@jsLogic/three/raycast/step3/subStep2/raycastStepThree2';
import { _glassCutOutPressureGauge, _glassCutOutPressureGaugeMouseDown, _glassCutOutPressureGaugeMouseUp } from '@jsLogic/three/raycast/step3/subStep4/raycastStepThree4';
import { _glassCutOutPinceAGruger, _glassCutOutPinceAGrugerMouseDown, _glassCutOutPinceAGrugerMouseUp } from '@jsLogic/three/raycast/step3/subStep5/raycastStepThree5';

//mouse events
import { _mousePointerDownHandler } from '@jsLogic/three/mouseEvents/mouseDown/onMouseDownHandler';
import { _mousePointerUpHandler } from '@jsLogic/three/mouseEvents/mouseUp/onMouseUpHandler';


const SETTINGS = {
    enableRaycast: true,
    enableOrbitControl: false,
    idCamera: [0, 1, 2, 3, 4],
    idCameraEndAction: [2, "none", 9, "none", 16],
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
            '_setDragAndDropControls',
            '_toggleDragAndDropControls',
            '_paperCutOutScrollHandler',
            '_paperCutOutScrollAnimation',
            '_toggleArtisaneOpacity',
            '_setFinalColors'
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

        this._ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this._scene.add(this._ambientLight);

        this._renderer = new THREE.WebGLRenderer({
            canvas: this._canvas.current,
            antialias: true,
        });

        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this._renderer.setSize(window.innerwidth, window.innerHeight);
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
        this._RenderTargetClass = null;

        if(this._renderer.getPixelRatio() === 1 && this._renderer.capabilities.isWebGL2) {
            this._RenderTargetClass = THREE.WebGLMultisampleRenderTarget;
        } else {
            this._RenderTargetClass = THREE.WebGLRenderTarget;
        }

        this._renderTarget = new this._RenderTargetClass(
            800, 
            600,
            {
                minFilter: LinearFilter,
                magFilter: LinearFilter,
                format: THREE.RGBAFormat,
                encoding: THREE.sRGBEncoding
            }
        )

        this._effectComposer = new EffectComposer(this._renderer, this._renderTarget);
        this._effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._effectComposer.setSize(window.innerwidth, window.innerHeight);

        this._renderPass = new RenderPass(this._scene, this._camera);
        this._effectComposer.addPass(this._renderPass);

        // this._glitchPass = new GlitchPass();
        // this._glitchPass.enabled = true;
        // this._glitchPass.goWild = false;
        // this._effectComposer.addPass(this._glitchPass);

        this._outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), this._scene, this._camera );
        this._outlinePass.pulsePeriod = 5;
        this._outlinePass.edgeStrength = 3;
        this._outlinePass.edgeThickness = 2;
        this._outlinePass.edgeGlow = 1;
        this._outlinePass.visibleEdgeColor = new THREE.Color( 0xffd700 );
        this._outlinePass.hiddenEdgeColor = new THREE.Color( 0xffd700 );
        this._outlinePass.enabled = true;
        this._effectComposer.addPass( this._outlinePass );

        if(this._renderer.getPixelRatio() === 1 && this._renderer.capabilities.isWebGL2) {
            this._smaaPass = new SMAAPass();
            this._effectComposer.addPass(this._smaaPass);
        }

        this._canvas.appendChild(this._renderer.domElement);

        this._mouse = new THREE.Vector2();
        this._isMouseDown = false;
        this._rayCaster = new THREE.Raycaster();

        this._stepManager = new StepManager(0, 1);

        this._breadcrumbManager = new BreadcrumbManager(true, "La découpe du tracé");

        this._UIManager = new UIManager();

        this._actionStepManager = new ActionsStepManager(this._state, this._stepManager, this._UIManager, this._breadcrumbManager, this._setCameraAnimationPlay, this._toggleArtisaneOpacity, this._toggleDragAndDropControls);

        this._artisanes = [];

        this._pressureGaugeValue = 0;

        this._scrollTimeline = 0;
        this._scrollY = 0;

        this._colorPicked = {
            current: null,
            old: null
        }

        this._finalColorPicked = {
            cubeBottomLeft: "#00FF00",
            losange: "#00FF00",
            rectangleLeft: "#00FF00",
            triangles: "#00FF00"
        }

        this._isDraggingColor = false;

        this._isRunningDecoupeTrace = false;
        this._indexDecoupeTrace = 0;
        this._pieceDecoupeDropZone;
        this._pieceDecoupe;

        this._feuilleAnimations = [];

        this._currentIntersect = null;

        this._enableDragAndDrop = false;

        // this._setOrbitalControls();
        this._setupEventListeners();
        this._resizeHandler();
        this._setEnvironmentMap();
        // this._setNewState();
    }

    _setCameraAnimationPlay(index, actionIndex) {
        if (index === "none") return;
        this._camera = this._cameras[index];
        this.cameraManager.StartAnimation(index);
        this.cameraAnimator.mixer.addEventListener("finished", () => {
            if(actionIndex === "none") return;
            this._actionStepManager.actionsManager(actionIndex);
        });
    }
    _setCameraAnimationReverse(index) {
        this._camera = this._cameras[index];
        this.cameraManager.ReverseAnimation(index)
    }

    _setfeuilleLeveAnimationPlay(index, actionIndex) {
        if (index === "none") return;
        
        this._feuilleAnimations.map((animations, index) => {
            this.feuilleLeveAnimator.playClipByIndex(index);
        })
        this.feuilleLeveAnimator.mixer.addEventListener("finished", () => {
            if(actionIndex === "none") return;
            this._actionStepManager.actionsManager(actionIndex);
        });
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

                    // this._vitrailGroup.position.set(-1.5, 1, 2.2);
                    // // this._vitrailGroup.position.set(0.5, 1, -1.5);
                    // this._vitrailGroup.rotation.set(0, Math.PI / 2, 0);
                    // this._vitrailGroup.scale.set(0.2, 0.2, 0.2);
                    // this._vitrailGroup.position.set(-1.5, 1, 2.2);
                    this._vitrailGroup.position.set(0, 1, -2);
                    // this._vitrailGroup.rotation.set(0, Math.PI / 2, 0);
                    this._vitrailGroup.rotation.set(0, Math.PI, 0);
                    // this._vitrailGroup.scale.set(0.2, 0.2, 0.2);
                    this._vitrailGroup.scale.set(0.5, 0.5, 0.5);

                } else if ("atelier" === child.name) {

                    this._addToScene(child);

                    this._cameras = [...this._models[name].cameras];
                    this._cameraAnimations = [...this._models[name].animations];

                    this.cameraAnimator = new AnimationManager(child, this._cameraAnimations);
                    this.cameraManager = new CameraManager(this._camera, this._cameras, this.cameraAnimator);

                } else if('ciseau' === child.name) {

                    // this._dragItems.push(child);

                } else if ("CameraAtelier1_Orientation" === child.name) {

                    console.log(this._camera)
                    this._camera = child;
                    this._renderPass.camera = child;

                } else if ("artisane01" === child.name) {

                    this._artisanes.push(child);;

                } else if("artisane02" === child.name) {

                    this._artisanes.push(child);
                    this._toggleArtisaneOpacity("artisane02");

                } else if ("feuille" === child.name) {

                    this._feuilleAnimations = [...this._models[name].animations];
                    this._addToScene(child);

                    this.feuilleAnimator = new AnimationManager(child, this._feuilleAnimations);
                    this.feuilleManager = new CameraManager(this._camera, this._cameras, this.feuilleAnimator);

                } else if("Piece_decoupe" === child.name) {

                    // this._addToScene(child);

                    this._piece_decoupeAnimations = [...this._models[name].animations];
                    this._piece_decoupeAnimationsClickOne = [];
                    this._piece_decoupeAnimationsClickTwo = [];
                    this._piece_decoupeAnimationsClickThree = [];
                    this._piece_decoupeAnimationsSuccessCut = [];

                    this._models[name].animations.map(animation => {
                        if("Click1" === animation.name) {

                            this._piece_decoupeAnimationsClickOne.push(animation);

                        } else if("Click2" === animation.name) {

                            this._piece_decoupeAnimationsClickTwo.push(animation);

                        } else if("Click3" === animation.name) {

                            this._piece_decoupeAnimationsClickThree.push(animation);

                        } else if("SuccessCut" === animation.name) {

                            this._piece_decoupeAnimationsSuccessCut.push(animation);

                        }
                    })

                    this._piece_decoupeAnimationsClickOneAnimator = new AnimationManager(child, this._piece_decoupeAnimationsClickOne);
                    this._piece_decoupeAnimationsClickTwoAnimator = new AnimationManager(child, this._piece_decoupeAnimationsClickTwo);
                    this._piece_decoupeAnimationsClickThreeAnimator = new AnimationManager(child, this._piece_decoupeAnimationsClickThree);
                    this._piece_decoupeAnimationsSuccessCutAnimator = new AnimationManager(child, this._piece_decoupeAnimationsSuccessCut);

                    child.traverse(child => {
                        // if("surface_drop" !== child.name)
                        //     this._glassCutOutRaycastObject.push(child);

                        if("debut" === child.name 
                            || "milieu1" === child.name 
                            || "milieu2" === child.name 
                            || "milieu3" === child.name 
                            || "milieu4" === child.name 
                            || "milieu5" === child.name 
                            || "fin" === child.name) {

                            this._piece_decoupeeObjects.push(child.name);

                        } else if("surface_drop" === child.name) {
                            this._pieceDecoupeDropZone = child;
                            child.material.opacity = 0;
                        } else if("piece_principale_above" === child.name) {
                            this._pieceDecoupe = child;
                            child.material.opacity = 0;
                            child.material.transparent = true;
                        } else if("piece_principale" === child.name) {
                            console.log(child)
                            this._outlinePass.renderCamera = this._camera;
                            this._outlinePass.selectedObjects = [child]
                            console.log(this._outlinePass.selectedObjects)
                        }


                    });

                    child.position.set(-0.25, 1.3, -2.2);
                    child.rotation.set(-Math.PI / 3, -Math.PI, 0);

                } else if("papier_decoupe" == child.name) {

                    // this._addToScene(child);
                    this._dragItems.push(child);

                    // child.position.set(0, 1.2, -2.2);
                    // child.scale.set(0.10, 0.10, 0.10);
                    // child.rotation.set(-Math.PI / 2, 0, 0);

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
        //this._setDragAndDropControls();

        // this._actionStepManager.actionsManager(0);

        //couleur de base du vitrail
        this._setFinalColors();

        this._animateCameraPlay(SETTINGS.idCamera[0], SETTINGS.idCameraEndAction[0]);
        this._animateCameraPlay(SETTINGS.idCamera[1], SETTINGS.idCameraEndAction[1]);
        this._animateCameraReverse(SETTINGS.idCamera[0], SETTINGS.idCameraEndAction[0]);
        this._animateCameraReverse(SETTINGS.idCamera[1], SETTINGS.idCameraEndAction[1]);
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

            this._paperCutOutScrollAnimHandler(intersects[0]);

        } else if (this._globalStep === 1) {

            this._colorPickerHandler(intersects[0]);

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

    _animateCameraPlay(index, actionIndex) {
        let buttonCamera1 = document.createElement("button");
        buttonCamera1.style.position = "absolute";
        buttonCamera1.style.top = (1 + (index * 30)) + "px";
        buttonCamera1.innerHTML = "Camera " + (index + 1);

        // // 2. Append somewhere
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(buttonCamera1);

        // // 3. Add event handler
        buttonCamera1.addEventListener("click", () => {
            this._setCameraAnimationPlay(index, actionIndex);
            this._UIManager.setScrollPicto(50, 30)
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
            this._UIManager.removeScrollPicto()
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
        this._effectComposer.setSize(this._width, this._height)
        this._effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    _resizeHandler() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._resize(this._width, this._height);
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
                    //Choper le bon element du plain puis lui redonner l'ancienne couleur
                }
            }
            this._currentIntersect = this._object;
            // console.log('mouse enter')
            this._colorPicked.old = this._currentIntersect.material.color;
            if (this._isMouseDown === true && this._vitrailObjects.includes(this._currentIntersect.name) && this._isDraggingColor === true) {
                this._currentIntersect.material.color = this._colorPicked.current;
                //Choper le bon element du plain puis lui donner la bonne couleur
            }
        }
        else {
            if (this._currentIntersect) {
                //   console.log('mouse leave')
                if (this._isMouseDown === true) {
                    this._currentIntersect.material.color = this._colorPicked.old;
                    //Choper le bon element du plain puis lui redonner l'ancienne couleur
                }
                this._colorPicked.old = null;
                // console.log(currentIntersect.name);

            }

            this._currentIntersect = null
        }
    }

    _colorPickerMouseDown() {
        // this._UIManager.UI.cursor.classList.toggle("cursor-dragging");
        // this._UIManager.UI.cursor.classList.toggle("cursor-pointer-color-picker");
        if (this._currentIntersect) {
            switch (this._currentIntersect.name) {
                case "green":
                    this._colorPicked.current = this._currentIntersect.material.color;
                    this._isDraggingColor = true;
                    //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "green");
                    //   cursorColorPickerInner.current.style.transform = "scale(1.5)"
                    break
                case "purple":
                    this._colorPicked.current = this._currentIntersect.material.color;
                    this._isDraggingColor = true;
                    //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "purple");
                    //   cursorColorPickerInner.current.style.transform = "scale(1.5)"
                    break
                case "white":
                    this._colorPicked.current = this._currentIntersect.material.color;
                    this._isDraggingColor = true;
                    //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "white");
                    //   cursorColorPickerInner.current.style.transform = "scale(1.5)"
                    break
            }
        }
    }
    _colorPickerMouseUp() {
        // this._UIManager.UI.cursor.classList.toggle("cursor-dragging");
        // this._UIManager.UI.cursor.classList.toggle("cursor-pointer-color-picker");
        if (this._currentIntersect) {
            if (this._vitrailObjects.includes(this._currentIntersect.name) && this._isDraggingColor === true) {
                this._currentIntersect.material.color = this._colorPicked.current;
                this._setFinalColors();
                this._isDraggingColor = false;
                // this._actionStepManager.actionsManager(12);
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

    _setFinalColors() {
        this._colorPickerRaycastObject.map(elm => {
            if(this._vitrailObjects.includes(elm.name)) {
                if(elm.name === "cubeBottomLeft" || elm.name === "rectangleLeft" || elm.name === "losange") {
                    this._finalColorPicked[elm.name] = elm.material.color;
                }

            }
        });
        console.log(this._finalColorPicked);
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
        // this._actionStepManager.actionsManager(27);
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

                if(parseInt(this._currentIntersect.name.substr(this._currentIntersect.name.length - 1)) < this._indexDecoupeTrace && this._isRunningDecoupeTrace === true) {
                    console.log("Vous avez raté ! Mince alors !");
                    this._isRunningDecoupeTrace = false;
                } else {
                    switch(this._currentIntersect.name) {
                        case "milieu1":
                            this._indexDecoupeTrace = 1;
                            break;
                        case "milieu2":
                            this._indexDecoupeTrace = 2;
                            break;
                        case "milieu3":
                            this._indexDecoupeTrace = 3;
                            break;
                        case "milieu4":
                            this._indexDecoupeTrace = 4;
                            break;
                        case "milieu5":
                            this._indexDecoupeTrace = 5;
                            break;
                        default:
                            this._indexDecoupeTrace = 0;
                    }
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
                    // this._actionStepManager.actionsManager(22);
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
            // this._actionStepManager.actionsManager(25);
        } else {
            console.log("vous avez perdu !");
            this._pressureGaugeValue = 0;
            this._UIManager.UI.pressureGauge.style.transform = `scale(1)`;
        }
    }

    _mousePointerDownHandler(e) {
        this._isMouseDown = true;
        this._globalStep = this._stepManager._globalStep;
        this._subStep = this._stepManager._subStep;

        if (this._globalStep === 0) {

            this._paperCutOutMouseDown();

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
            this._paperCutOutMouseUp();

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
                    this._glassCutOutPinceAGrugerMouseUp();
                    break;
                case 5:
                    // console.log("sous-étape 5: drag and drop au milieu du vitrail fini");
                    break;
            }

        }
    }

    _mousemoveHandler(e) {
        this._rayCast(e);
        this._cursorPosition(e);
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
        if(this._dragAndDropTest) 
            this._dragAndDropTest.update();

        // this._renderer.render(this._scene, this._camera);
        this._effectComposer.render();
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

    _cursorPosition(e) {
        this._coordinates = {};

        this._coordinates.x = e.clientX;
        this._coordinates.y = e.clientY;


        this._UIManager.UI.cursor.style.transform = `translate(${this._coordinates.x - 20}px, ${this._coordinates.y - 20}px)`;
    }

    _setOrbitalControls() {
        this._controls = new OrbitControls(this._camera, this._canvas);
        this._controls.target.set(0, 0, 0);
        this._controls.enableDamping = true;
    }

    _orbitControlsHandler() {
        this._controls.update();
    }

    _setDragAndDropControls() {
        if (!SETTINGS.enableDragAndDrop) return;

        this._dragAndDropControls = new DragControls(this._dragItems, this._camera, this._renderer.domElement);

        this._dragAndDropControls.enabled = true;
        this._dragAndDropControls.transformGroup = true;
        this._enableDragAndDrop = true;

        this._initialPosition = {};
        this._isOnTarget = false;

        this._dragStart = (event) => {
            this._initialPosition.x = event.object.position.x;
            this._initialPosition.y = event.object.position.y;
            this._initialPosition.z = event.object.position.z;

            // event.object.material.emissive.set(0xaaaaaa);
            if (this._globalStep === 2 || this._subStep === 0) {

                //Action à faire sur le premier drag and drop de l'atelier 3

            } else if(this._globalStep === 2 || this._subStep === 2) {

                //Action à faire sur le drag and drop out 

            } else if(this._globalStep === 2 || this._subStep === 5) {

                //Action à faire sur le dernier drag and drop de fin sur le vitrail de fin

            }

            gsap.to(event.object.scale, {x: 1.2, y: 1.2, z: 1.2, duration: .3});
        }
        this._drag = (event) => {
            if (this._globalStep === 2 || this._subStep === 0) {

                //Action à faire sur le premier drag and drop de l'atelier 3

            } else if(this._globalStep === 2 || this._subStep === 2) {

                //Action à faire sur le drag and drop out 

            } else if(this._globalStep === 2 || this._subStep === 5) {

                //Action à faire sur le dernier drag and drop de fin sur le vitrail de fin

            }

            // event.object.position.z = this._initialPosition.z;

            // if (event.object.position.y < 1.05) {
            //     event.object.position.y = 1.05;
            // }

        }
        this._dragEnd = (event) => {

            this._pourcentageIntersect = this._dragItems[0].children.filter( intersectObject => this._detectCollision(this._pieceDecoupeDropZone, intersectObject)).length;

            if(this._pourcentageIntersect > 18) {
                this._isOnTarget = true;
            } else {
                this._isOnTarget = false;
            }

            if (this._globalStep === 2 && this._subStep === 0) {

                //Action à faire sur le premier drag and drop de l'atelier 3
                if(this._isOnTarget) {
                    console.log("fin du drag and drop: Success");
                    //Launch un certain son success
                    const {x, y, z} = this._pieceDecoupe.position;
                    gsap.to(event.object.position, {x: x, y: y, z: z, duration: 1});
                    this._stepManager.addSubStep();
                    //Action a faire dans le step action manager
                    
                } else {
                    const {x, y, z} = this._initialPosition;
                    event.object.children.map(child => {
                        if(child.material)
                            child.material.transparent = true;
                            gsap.to(child.material, {opacity: 0, duration: .5});
                    })
                    gsap.to(event.object.position, {x: x, y: y, z: z, duration: 0, delay: 0.5});
                    event.object.children.map(child => {
                        if(child.material)
                            gsap.to(child.material, {opacity: 1, duration: .5, delay: 1});
                    })
                    //Launch un certain son fail
                }

            } else if(this._globalStep === 2 && this._subStep === 2) {
                console.log("2eme drag and drop")
                //Action à faire sur le drag and drop out 
                if(this._isOnTarget) {

                    gsap.to(event.object.position, {x: x, y: y, z: z, duration: 0, delay: 0.5});
                    //Launch un certain son fail
                    
                } else {
                    console.log("fin du drag and drop out: Success");
                    event.object.children.map(child => {
                        if(child.material)
                            child.material.transparent = true;
                            gsap.to(child.material, {opacity: 0, duration: .5});
                    })
                    //Launch un certain son Success
                }

            } else if(this._globalStep === 2 && this._subStep === 5) {

                //Action à faire sur le dernier drag and drop de fin sur le vitrail de fin

            }

            gsap.to(event.object.scale, {x: 1, y: 1, z: 1, duration: .3});
        }

        this._toggleDragAndDropControls();

    }

    _detectCollision(object1, object2) {
        object1.geometry.computeBoundingBox();
        object2.geometry.computeBoundingBox();
        object1.updateMatrixWorld();
        object2.updateMatrixWorld();
      
        var box1 = object1.geometry.boundingBox.clone();
        box1.applyMatrix4(object1.matrixWorld);
        
        var box2 = object2.geometry.boundingBox.clone();
        box2.applyMatrix4(object2.matrixWorld);
        
        return box1.intersectsBox(box2);
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
        // console.log(this.addStepManager.subStep)
    }

    _setAddGlobalStep() {
        // let ateliersNumber = 5

        this.addStepManager.addGlobalStep()
        // console.log(this.addStepManager.globalStep)

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
            // console.log(this._pressureGaugeValue);
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
        }
        //console.log(this._scrollTimeline + " : " + this._scrollY);
    }

    _paperCutOutScrollAnimation() {
        this._feuilleAnimations.map((animations, index) => {
            this.feuilleManager.ScrollAnimation(index, this._scrollTimeline);
            this.feuilleAnimator.mixer.addEventListener(() => {
                console.log("scroll Animation end");
            });
        })
    }   

    _toggleArtisaneOpacity(artisaneName) {
        for(const artisane of this._artisanes) {
            if(artisane.name === artisaneName) {
                artisane.material.opacity = artisane.material.opacity === 0 ? 1 : 0;
            }
        } 
    }

}

export default ThreeScene;