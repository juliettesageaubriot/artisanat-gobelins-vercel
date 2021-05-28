//vendors
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { DragControlsCustom } from "@jsLogic/three/dragAndDrop/dragAndDrop.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { LinearFilter } from 'three'
import { gsap } from 'gsap';

//datas
import { soundsOnInteraction } from "@jsLogic/utils/sounds.js";

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
import ToolsManager from '@jsLogic/tools/toolsManager';

import { SetupColorPicker } from '@jsLogic/utils/colorPickersHelper';

//raycasts handlers
import { _paperCutOutScrollAnimHandler, _paperCutOutMouseDown, _paperCutOutMouseUp } from '@jsLogic/three/raycast/step1/raycastStepOne';
import { _colorPickerHandler, _colorPickerMouseDown, _colorPickerMouseUp } from '@jsLogic/three/raycast/step2/raycastStepTwo';
import { _glassCutOut, _glassCutOutMouseDown, _glassCutOutMouseUp } from '@jsLogic/three/raycast/step3/subStep2/raycastStepThree2';
import { _glassCutOutPressureGauge, _glassCutOutPressureGaugeMouseDown, _glassCutOutPressureGaugeMouseUp } from '@jsLogic/three/raycast/step3/subStep4/raycastStepThree4';
import { _glassCutOutPinceAGruger, _glassCutOutPinceAGrugerMouseDown, _glassCutOutPinceAGrugerMouseUp } from '@jsLogic/three/raycast/step3/subStep5/raycastStepThree5';

//mouse events
import { _mousePointerDownHandler } from '@jsLogic/three/mouseEvents/mouseDown/onMouseDownHandler';
import { _mousePointerUpHandler } from '@jsLogic/three/mouseEvents/mouseUp/onMouseUpHandler';
import { Vector3 } from 'three/build/three.module';


const SETTINGS = {
    enableRaycast: true,
    enableOrbitControl: false,
    idCamera: [0, 1, 2, 3, 4],
    idCameraEndAction: [2, "none", 9, "none", 16],
    enableDragAndDrop: true,
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
            '_setCameraAnimationPlay',
            '_setCameraAnimationReverse',
            '_setfeuilleLeveAnimationPlay',
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
            '_setFinalColors',
            '_pressureGaugeHandler',
            '_get3DobjectScreenPosition',
            '_setOutlineObjects',
            '_addPieceDecoupeToScene',
            '_glassCutOutObjectDisappear',
            '_animationToDragPosition'
        );

        this._canvas = canvas;

        this._state = state;

        //Clock delta
        this._clock = new THREE.Clock()
        this._previousTime = 0;

        this._camera;
        this._cameras;

        this._orbitalsControls;

        //Groups
        this._vitrailGroup = new THREE.Group;
        this._atelierGroup = new THREE.Group;
        this._atelierV04Group = new THREE.Group;

        //Raycast Arrays
        this._paperCutOutRaycastObject = [];
        this._colorPickerRaycastObject = [];
        this._glassCutOutRaycastObject = [];

        this._textureLoader = new THREE.TextureLoader();

        //ColorPickerName Array
        this._vitrailObjects = [];

        //PieceDecoupe Array
        this._piece_decoupeeObjects = [];
        this._piece_decoupe;

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
        this._renderer.toneMapping = THREE.NoToneMapping;
        this._renderer.outputEncoding = THREE.sRGBEncoding;
        this._renderer.shadowMap.autoUpdate = false;
        this._renderer.setSize(window.innerwidth, window.innerHeight);
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this._RenderTargetClass = null;

        if (this._renderer.getPixelRatio() === 1 && this._renderer.capabilities.isWebGL2) {
            this._RenderTargetClass = THREE.WebGLMultisampleRenderTarget;
        } else {
            this._RenderTargetClass = THREE.WebGLRenderTarget;
        }

        this._renderTarget = new this._RenderTargetClass(
            800,
            600,
            {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
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

        this._outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this._scene, this._camera);
        this._outlinePass.pulsePeriod = 5;
        this._outlinePass.edgeStrength = 3;
        this._outlinePass.edgeThickness = 3;
        this._outlinePass.edgeGlow = 1;
        this._outlinePass.visibleEdgeColor = new THREE.Color(0xffffff);
        this._outlinePass.hiddenEdgeColor = new THREE.Color(0xffffff);
        this._outlinePass.enabled = false;
        this._effectComposer.addPass(this._outlinePass);

        if (this._renderer.getPixelRatio() === 1 && this._renderer.capabilities.isWebGL2) {
            this._smaaPass = new SMAAPass();
            this._effectComposer.addPass(this._smaaPass);
        }

        this._canvas.appendChild(this._renderer.domElement);

        this._mouse = new THREE.Vector2();
        this._isMouseDown = false;
        this._rayCaster = new THREE.Raycaster();

        this._stepManager = new StepManager(0, 0);
        this._toolsManager = new ToolsManager()

        this._breadcrumbManager = new BreadcrumbManager(true, "La découpe du tracé");

        this._UIManager = new UIManager(this._get3DobjectScreenPosition, this._glassCutOutObjectDisappear, this._state);

        this._actionStepManager = new ActionsStepManager(
            this._state,
            this._stepManager,
            this._UIManager,
            this._breadcrumbManager,
            this._setCameraAnimationPlay,
            this._toggleArtisaneOpacity,
            this._toggleDragAndDropControls,
            this._setfeuilleLeveAnimationPlay,
            this._setDragAndDropControls,
            this._outlinePass,
            this._toolsManager,
            this._setOutlineObjects,
            this._addPieceDecoupeToScene,
            this._animationToDragPosition
        );


        this._artisanes = [];

        this._pressureGaugeValue = 0;

        this._scrollTimeline = 3.5;
        this._scrollY = 0;

        this._colorPicked = {
            current: null,
            old: null
        }

        this._finalColorPicked = {
            couleurCarre01: "#00FF00",
            couleurEtoile09: "#00FF00",
            couleurRectangle10: "#00FF00",
            couleurCercle05: "#00FF00"
        }

        this._crayonnes = [];
        this._samples = [];

        this._isDraggingColor = false;

        this._isRunningDecoupeTrace = false;
        this._indexDecoupeTrace = 0;
        this._pieceDecoupeDropZone;
        this._pieceDecoupe;
        this._vitrailDropZone;
        this._dragStartVitrail;

        this._isPiece1Erased = false;
        this._isPiece2Erased = false;
        this._isPiece3Erased = false;

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
        this._camera = this._cameras[index];
        this._renderPass.camera = this._cameras[index];
        this._outlinePass.renderCamera = this._cameras[index];
        this.cameraManager.StartAnimation(index);

        const onFinished = () => {
            this._actionStepManager.actionsManager(actionIndex);
            this.cameraAnimator.mixer.removeEventListener("finished", onFinished);
        };
        if (actionIndex !== "none") {
            this.cameraAnimator.mixer.addEventListener("finished", onFinished);
        }

    }
    _setCameraAnimationReverse(index) {
        this._camera = this._cameras[index];
        this.cameraManager.ReverseAnimation(index)
    }

    _setfeuilleLeveAnimationPlay(actionIndex) {
        let actionIndexDone = false;
        // console.log(this._feuilleLeveAnimations)
        this._feuilleLeveAnimations.map((animations, index) => {
            this.feuilleLeveAnimator.playClipByIndex(index);
        })
        this.feuilleLeveAnimator.mixer.addEventListener("finished", () => {
            if (actionIndex === "none" || actionIndexDone === true) return;
            actionIndexDone = true;
            this._actionStepManager.actionsManager(actionIndex);
            // console.log("action à faire à la fin de l'animation de la feuille")
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

            console.log(this.object);
            this.object.traverse(child => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    // child.material.envMap = environmentMap
                    // child.material.envMapIntensity = 5
                    child.castShadow = true
                    child.receiveShadow = true
                }

                if ("colorPicker" === child.name) {

                    this._vitrailGroup.add(child);
                    SetupColorPicker(child, this._colorPickerRaycastObject, this._vitrailObjects, this._crayonnes, this._samples);

                } else if ("atelier" === child.name) {

                    this._addToScene(child);

                    this._cameras = [...this._models[name].cameras];
                    this._cameraAnimations = [...this._models[name].animations];

                    this.cameraAnimator = new AnimationManager(child, this._cameraAnimations);
                    this.cameraManager = new CameraManager(this._camera, this._cameras, this.cameraAnimator);

                } else if ('rayon02' === child.name) {

                    child.material.transparent = true;
                    child.material.opacity = 0.2;

                } else if ('rayon03' === child.name) {

                    child.material.transparent = true;
                    child.material.opacity = 0.2;

                } else if ('rayons01' === child.name) {

                    child.material.transparent = true;
                    child.material.opacity = 0.2;

                } else if ("CameraAtelier1_Orientation" === child.name) {

                    // console.log(this._camera)
                    this._camera = child;
                    this._renderPass.camera = child;
                    this._outlinePass.renderCamera = child;
                    // this.cameraManager.StartAnimation(5);

                } else if ("artisane01" === child.name) {

                    this._artisanes.push(child);

                } else if ("artisane02" === child.name) {

                    this._artisanes.push(child);
                    this._toggleArtisaneOpacity("artisane02");

                } else if ("artisane03" === child.name) {

                    this._artisanes.push(child);
                    this._toggleArtisaneOpacity("artisane03");

                } else if ("feuille" === child.name) {

                    this._feuilleAnimations = [...this._models[name].animations];
                    this._feuilleLeveAnimations = this._feuilleAnimations.filter(animation => animation.name.toLowerCase().includes("leve"));
                    this._feuilleChuteAnimations = this._feuilleAnimations.filter(animation => animation.name.toLowerCase().includes("chute"));

                    this._addToScene(child);

                    this.feuilleLeveAnimator = new AnimationManager(child, this._feuilleLeveAnimations);
                    this.feuilleChuteAnimator = new AnimationManager(child, this._feuilleChuteAnimations);
                    this.feuilleChuteManager = new CameraManager(this._camera, this._cameras, this.feuilleChuteAnimator);

                } else if ("Piece_decoupe" === child.name) {

                    // this._addToScene(this._piece_decoupe);
                    // console.log(child)
                    this._piece_decoupe = child;
                    child.position.set(1.5, 1.2, 1.2);
                    child.rotation.set(Math.PI / 3, 0, 0);
                    // child.scale.set(0.8, 0.8, 0.8);

                    this._piece_decoupeAnimations = [...this._models[name].animations];
                    this._piece_decoupeAnimationsClickOne = [];
                    this._piece_decoupeAnimationsClickTwo = [];
                    this._piece_decoupeAnimationsClickThree = [];
                    this._piece_decoupeAnimationsSuccessCut = [];

                    this._models[name].animations.map(animation => {
                        if ("Click1" === animation.name) {

                            this._piece_decoupeAnimationsClickOne.push(animation);

                        } else if ("Click2" === animation.name) {

                            this._piece_decoupeAnimationsClickTwo.push(animation);

                        } else if ("Click3" === animation.name) {

                            this._piece_decoupeAnimationsClickThree.push(animation);

                        } else if ("SuccessCut" === animation.name) {

                            this._piece_decoupeAnimationsSuccessCut.push(animation);

                        }
                    })

                    this._piece_decoupeAnimationsClickOneAnimator = new AnimationManager(child, this._piece_decoupeAnimationsClickOne);
                    this._piece_decoupeAnimationsClickTwoAnimator = new AnimationManager(child, this._piece_decoupeAnimationsClickTwo);
                    this._piece_decoupeAnimationsClickThreeAnimator = new AnimationManager(child, this._piece_decoupeAnimationsClickThree);
                    this._piece_decoupeAnimationsSuccessCutAnimator = new AnimationManager(child, this._piece_decoupeAnimationsSuccessCut);
            
                    child.traverse(async child => {
                        if ("surface_drop" === child.name || "piece_principale_above" === child.name) {

                        } else {
                            this._glassCutOutRaycastObject.push(child);
                        }

                        this._textureLoader.load(
                            '/assets/textures/colorPicker/crayonnes/crayonnés_carré_central.jpg', 
                            (result) => {
                                if("couleurEtoile" == child.name) {
                                    child.material.alphaMap = result;
                                }
                            }
                        );

                        if ("debut" === child.name
                            || "milieu1" === child.name
                            || "milieu2" === child.name
                            || "milieu3" === child.name
                            || "milieu4" === child.name
                            || "milieu5" === child.name
                            || "fin" === child.name) {

                            this._piece_decoupeeObjects.push(child.name);
                            // child.material.transparent = true;
                            // child.material.opacity = 0.5;

                        } else if ("surface_drop" === child.name) {
                            this._pieceDecoupeDropZone = child;
                            child.material.opacity = 0;
                        } else if ("piece_principale_above" === child.name) {
                            this._pieceDecoupe = child;
                            // child.material.opacity = 0;
                            child.material.transparent = true;
                        } else if ("piece_principale" === child.name) {
                            // console.log(child)
                            this._outlinePass.renderCamera = this._camera;
                            // this._outlinePass.selectedObjects = [child];
                            
  
                        } else if("piece1" === child.name) {
                            child.material.opacity = 0.5;
                            child.material.transparent = true;
                        }
                    });

                } else if ("papier_decoupe" == child.name) {

                    // this._get3DobjectScreenPosition(child, this._camera);
                    // this._addToScene(child);
                    this._dragItems.push(child);
                    // child.position.set(0, 1.2, -2.2);
                    // child.scale.set(0.10, 0.10, 0.10);
                    // child.rotation.set(-Math.PI / 2, 0, 0);

                } else if ("vitrailFinal" === child.name) {

                    this._addToScene(child);

                    child.traverse(child => {
                        if("zoneDragAndDrop" === child.name) {
                            child.material.transparent = true;
                            child.material.opacity = 0;
                        } else if("zoneDragAndDrop" === child.name) {
                           this._vitrailDropZone =  child
                           console.log(child)
                        } else if("drag" === child.name) {
                            this._dragStartVitrail = child
                            child.material.transparent = true;
                            child.material.opacity = 0;
                            console.log(child)
                        }
                    })
                }
            })
        }
    }

    _setOutlineObjects(objectName) {
        const selectedObject = this._scene.getObjectByName(objectName);
        this._outlinePass.selectedObjects = [selectedObject];
    }

    _addPieceDecoupeToScene() {
        this._addToScene(this._piece_decoupe);
    }

    _addToScene(object) {
        this._scene.add(object);
    }

    _changeActionStepManager(index) {
        this._actionStepManager.actionsManager(index)
    }

    _animationToDragPosition() {
        this._pieceToMove = this._scene.getObjectByName("piece_principale")
        // const { x, y, z } = this._scene.getObjectByName("drop").position;
        // const { xR, yR, zR } = this._scene.getObjectByName("drop").rotation;
        var position = new THREE.Vector3();
        position.setFromMatrixPosition(this._dragStartVitrail.matrixWorld);
        console.log(position);


        gsap.to(this._pieceToMove.position, { x: position.x + 0.02, y: position.y, z: position.z, duration: 1 });
        // this._pieceToMove.position.set(position.x, position.y, position.z);

        console.log(this._pieceToMove.position);

        
    }

    _start() {
        this._createModels(this._models);
        // this._resizeHandler();
        //Action à faire au démarrage
        // this._setDragAndDropControls();
        // this._toggleDragAndDropControls();

        // this._actionStepManager.actionsManager(0);
        // this._actionStepManager.actionsManager(26);
        // this._addPieceDecoupeToScene();
        this._actionStepManager.actionsManager(0);
        

        // this._actionStepManager.actionsManager(23);

        // this._setfeuilleLeveAnimationPlay(0)

        //couleur de base du vitrail
        // this._setFinalColors();
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

    _getSceneObjectWithName(object, name) {
        let mesh;
        object.traverse((child) => {
            if (child.isMesh && child.name === name) {
                mesh = child;
            }
        });
        return mesh;
    }

    _get3DobjectScreenPosition(objectName) {

        const object = this._scene.getObjectByName(objectName);

        // console.log(object)

        var vector = new THREE.Vector3();

        var widthHalf = 0.5 * this._renderer.getContext().canvas.width;
        var heightHalf = 0.5 * this._renderer.getContext().canvas.height;

        object.updateMatrixWorld();
        vector.setFromMatrixPosition(object.matrixWorld);
        vector.project(this._camera);

        vector.x = ( vector.x * widthHalf ) + widthHalf;
        vector.y = - ( vector.y * heightHalf ) + heightHalf;

        return { 
            x: vector.x,
            y: vector.y
        };
    }

    _resize(width, height) {
        this._width = width;
        this._height = height;

        this._camera.aspect = this._width / this._height;
        this._camera.updateProjectionMatrix();
        this._renderPass.camera.aspect = this._width / this._height;
        this._renderPass.camera.updateProjectionMatrix();
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._renderer.setSize(this._width, this._height);
        this._effectComposer.setSize(this._width, this._height)
        this._effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    _resizeHandler() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        console.log(this._dragItems)

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
                    this._crayonnes.map(object => {
                        if (object.name.slice(-2) === this._currentIntersect.name.slice(-2)) {
                            object.material.color = this._colorPicked.old;
                        }
                    })
                }
            }
            this._currentIntersect = this._object;

            //hightlights the sample hovered
            if (this._currentIntersect && this._samples.includes(this._currentIntersect.name)) {
               this._outlinePass.selectedObjects = [this._currentIntersect];
            }

            // console.log('mouse enter')
            this._crayonnes.map(object => {
                if (object.name.slice(-2) === this._currentIntersect.name.slice(-2)) {
                    this._colorPicked.old = object.material.color;
                }
            })

            if (this._isMouseDown === true && this._vitrailObjects.includes(this._currentIntersect.name) && this._isDraggingColor === true) {
                this._crayonnes.map(object => {
                    if (object.name.slice(-2) === this._currentIntersect.name.slice(-2)) {
                        object.material.color = this._colorPicked.current;
                    }
                })
            }
        }
        else {
            if (this._currentIntersect) {
                this._outlinePass.selectedObjects.pop();
                //   console.log('mouse leave')
                if (this._isMouseDown === true) {
                    this._crayonnes.map(object => {
                        if (object.name.slice(-2) === this._currentIntersect.name.slice(-2)) {
                            object.material.color = this._colorPicked.old;
                        }
                    })
                }
                this._colorPicked.old = null;

            }

            this._currentIntersect = null
        }
    }

    _colorPickerMouseDown() {
        
        // this._UIManager.UI.cursor.classList.toggle("cursor-pointer-color-picker");
        if (this._currentIntersect && this._samples.includes(this._currentIntersect.name)) {
            this._colorPicked.current = this._currentIntersect.material.color;
            this._isDraggingColor = true;
            this._UIManager.UI.carreCursor.style.backgroundColor = `#${this._colorPicked.current.getHexString()}`
            this._UIManager.UI.carreCursor.style.opacity = .5;
        }
    }
    _colorPickerMouseUp() {
        if (this._currentIntersect) {
            if (this._vitrailObjects.includes(this._currentIntersect.name) && this._isDraggingColor === true) {
                this._crayonnes.map(object => {
                    if (object.name.slice(-2) === this._currentIntersect.name.slice(-2)) {
                        object.material.color = this._colorPicked.current;
                    }
                })
                this._setFinalColors();
                this._isDraggingColor = false;
                this._UIManager.UI.carreCursor.style.opacity = 0;
                this._state.setSoundInteractionToPlay(soundsOnInteraction.crayonnes_url, true, false);
                // this._actionStepManager.actionsManager(12);
            }
            this._colorPicked.current = null;
            this._UIManager.UI.carreCursor.style.opacity = 0;
            //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "default");
            //   cursorColorPickerInner.current.style.transform = "scale(.8)"
        } else {
            this._colorPicked.current = null;
            this._UIManager.UI.carreCursor.style.opacity = 0;
            //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "default");
            //   cursorColorPickerInner.current.style.transform = "scale(.8)"
        }
    }

    _setFinalColors() {
        this._crayonnes.map(elm => {
            if(elm.name === "couleurCarre01" || elm.name === "couleurRectangle10" || elm.name === "couleurEtoile09" || elm.name === "couleurCercle05") {
                this._finalColorPicked[elm.name] = elm.material.color;
            }
        });

        this._vitrail = ["debut", "milieu1", "milieu2", "milieu3", "milieu4", "milieu5", "fin", "piece1", "extrusion1", "extrusion2", "extrusion3", "extrusion4", "extrusion5", "extrusion6", "extrusion7", "extrusion8"];

        this._vitrail.map(verre => {
            // this._scene.getObjectByName(verre).material = new THREE.MeshPhysicalMaterial({
            //     color: this._finalColorPicked.couleurEtoile09,
            //     roughness: 0,
            //     metalness: .3,
            //     reflectivity: 1,
            //     opacity: .8,
            //     transparent: true,
            // })
            this._scene.getObjectByName(verre).material = new THREE.MeshPhysicalMaterial({
                color: this._finalColorPicked.couleurEtoile09,
                roughness: 0,
                metalness: .3,
                reflectivity: 1,
                // opacity: .8,
                // transparent: true,
            })

            // gsap.to(this._scene.getObjectByName(verre).material, { color: this._finalColorPicked.couleurEtoile09, opacity: .8, transparent: true, duration: 1 });
        });
        this._scene.getObjectByName("piece_principale").traverse(child => {
            
            if(child.name !== "piece_principale") {
                // gsap.t
                // child.material = new THREE.MeshStandardMaterial({
                //     color: this._finalColorPicked.couleurEtoile09,
                //     // roughness: 0,
                //     // metalness: 0.3,
                //     // reflectivity: 1,
                //     opacity: .8,
                //     transparent: true,
                // }) 
                child.material = new THREE.MeshPhysicalMaterial({
                    color: this._finalColorPicked.couleurEtoile09,
                    roughness: 0,
                    metalness: 0.3,
                    reflectivity: 1,
                    // opacity: .8,
                    // transparent: true,
                }) 
                // gsap.to(child.material, { color: this._finalColorPicked.couleurEtoile09, opacity: .8, transparent: true, duration: 1 });
            }

            console.log(child.name)
        })

        this._scene.getObjectByName("couleurEtoile").material.color = this._finalColorPicked.couleurEtoile09;
        this._setColorsOnFinalVitrail();
        // console.log(this._finalColorPicked);
    }

    _setColorsOnFinalVitrail() {
        this._scene.traverse( object => {
            if(object.name.includes("vitrailFinal") && object.parent.name === "vitrailFinal") {
                if(object.name.toLowerCase().includes("carre")) {
                    object.material = new THREE.MeshStandardMaterial({
                        color: this._finalColorPicked.couleurCarre01,
                        opacity: 0.8,
                        transparent: true
                    })
                } else if(object.name.toLowerCase().includes("rectangle")) {
                    object.material = new THREE.MeshStandardMaterial({
                        color: this._finalColorPicked.couleurRectangle10,
                        opacity: 0.8,
                        transparent: true
                    })
                } else if(object.name.toLowerCase().includes("cercle")) {
                    object.material = new THREE.MeshStandardMaterial({
                        color: this._finalColorPicked.couleurCercle05,
                        opacity: 0.8,
                        transparent: true
                    })
                } else if(object.name.toLowerCase().includes("etoile")) {
                    object.material = new THREE.MeshStandardMaterial({
                        color: this._finalColorPicked.couleurEtoile09,
                        opacity: 0.8,
                        transparent: true
                    })
                }
            }
        })
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
        // console.log("paper cut out mousedown");
    }
    _paperCutOutMouseUp() {
        // console.log("paper cut out mouseup");
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
            this._currentIntersect = this._object;
        }
        else {
            this._currentIntersect = null
        }
    }

    _glassCutOutPinceAGruger(intersect) {
        if (intersect) {
            this._object = intersect.object;
            // console.log(this._object);
            this._currentIntersect = this._object;
        }
        else {
            this._currentIntersect = null
        }
    }

    _glassCutOutPinceAGrugerMouseDown() {
        // console.log("pince à gruger mousedown");
        // if(this._currentIntersect) {
        //     if(this._currentIntersect.name === "debut" || this._currentIntersect.name === "milieu5") {
        //         console.log("bout n°1 gone");
        //         this._isPiece1Erased = true;
        //     } else if(this._currentIntersect.name === "milieu2" || this._currentIntersect.name === "milieu3" || this._currentIntersect.name === "milieu4") {
        //         console.log("bout n°2 gone");
        //         if(this._isPiece1Erased) {
        //             this._isPiece2Erased = true;
        //         } else {
        //             // this._isPiece1Erased = false;
        //             console.log("Vous n'avez pas appuyé sur le premier bout !")
        //         }
        //     } else if(this._currentIntersect.name === "fin" || this._currentIntersect.name === "milieu1") {
        //         console.log("bout n°3 gone");
        //         if(this._isPiece1Erased === true && this._isPiece2Erased === true) {
        //             this._isPiece3Erased = true;
        //             console.log("Gagné");
        //             this._actionStepManager.actionsManager(29);
        //         } else {
        //             // this._isPiece1Erased = false;
        //             // this._isPiece2Erased = false;
        //             console.log("Vous n'avez pas appuyé sur le second bout !");
        //         }
        //     }
        // }
    }

    _glassCutOutObjectDisappear(objectNames) {
        objectNames.map(objectName => {
            let object = this._scene.getObjectByName(objectName);
            object.material = new THREE.MeshStandardMaterial({
                color: this._finalColorPicked.couleurEtoile09
            })
            gsap.to(object.material, {transparent: true, opacity: 0, duration: 0.5})
        })
    }

    _glassCutOutPinceAGrugerMouseUp() {
        // console.log("pince à gruger up");
        // this._actionStepManager.actionsManager(27);
    }

    _glassCutOut(intersect) {
        if (intersect) {
            this._object = intersect.object;
            if (this._currentIntersect) {
                // console.log(this._currentIntersect.name)
                //C'est ce qui se passe quand on vient de rentrer dans l'object
                // console.log('mouse enter';
                if (!this._piece_decoupeeObjects.includes(this._currentIntersect.name) && this._isRunningDecoupeTrace === true) {
                    console.log("Vous avez raté ! Mince alors !");
                    this._isRunningDecoupeTrace = false;
                    this._state.setSoundInteractionToPlay(soundsOnInteraction.coupeVerre3_url, true, false);
                }

                if (parseInt(this._currentIntersect.name.substr(this._currentIntersect.name.length - 1)) < this._indexDecoupeTrace && this._isRunningDecoupeTrace === true) {
                    console.log("Vous avez raté ! Mince alors !");
                    this._isRunningDecoupeTrace = false;
                    this._state.setSoundInteractionToPlay(soundsOnInteraction.coupeVerre3_url, true, false);
                } else {
                    switch (this._currentIntersect.name) {
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
            // console.log(this._currentIntersect.name)
            switch (this._currentIntersect.name) {
                case "debut":
                    console.log('je suis le début')
                    this._isRunningDecoupeTrace = true;
                    this._state.setSoundInteractionToPlay(soundsOnInteraction.coupeVerre2_url, true, true);
                    break
            }
        }
    }

    _glassCutOutMouseUp() {
        if (this._currentIntersect && this._isRunningDecoupeTrace === true) {
            console.log(this._currentIntersect.name)
            console.log(this._dragAndDropControls)
            switch (this._currentIntersect.name) {
                case "fin":
                    console.log("Decoupe du verre: success")
                    this._isRunningDecoupeTrace = false;
                    this._actionStepManager.actionsManager(24);
                    this._outlinePass.enabled = true;
                    this._state.setSoundInteractionToPlay(soundsOnInteraction.coupeVerre3_url, true, false);
                    break
                default:
                    this._isRunningDecoupeTrace = false;
                    console.log("Decoupe du verre: fail")
                    this._state.setSoundInteractionToPlay(soundsOnInteraction.coupeVerre2_url, false, false);
            }
        }
    }

    _glassCutOutPressureGaugeMouseDown() {
        // console.log("glass mouse down");
    }
    _glassCutOutPressureGaugeMouseUp() {
        // console.log("glass mouse up")
        if (this._pressureGaugeValue > 60 && this._pressureGaugeValue < 80 && this._currentIntersect.name === "piece1") {
            console.log("PressureGauge: success");
            // this._piece_decoupeAnimationsSuccessCutAnimator.playClipByIndex(0);
            this._actionStepManager.actionsManager(27);
            this._pieceToGetRidOf = this._scene.getObjectByName("piece1");
            this._pieceToGetRidOf.material.tranparent = true;
            gsap.to(this._pieceToGetRidOf.material, { opacity: 0, duration: 1 });
            this._state.setSoundInteractionToPlay(soundsOnInteraction.reussiteCassureVerre2_url, true, false);
        } else {
            console.log("PressureGauge: fail");
            this._pressureGaugeValue = 0;
            this._UIManager.UI.pressureGaugeScale.style.transform = `translate(-50%, -50%) scale(0)`;
            this._state.setSoundInteractionToPlay(soundsOnInteraction.echecCassureVerre1_url, true, false);
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
            this._UIManager.UI.cursor.classList.add("cursor-dragging");

        } else if (this._globalStep === 2) {

            switch (this._subStep) {

                case 0:
                    // console.log("sous-étape 1: drag and drop patron sur bout de verre");
                    this._UIManager.UI.cursor.classList.add("cursor-dragging");
                    break;
                case 1:
                    // console.log("sous-étape 2: découpe du verre");
                    this._glassCutOutMouseDown();
                    break;
                case 2:
                    // console.log("sous-étape 3: drag and drop pour enlever le bout de papier");
                    this._UIManager.UI.cursor.classList.add("cursor-dragging");
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
                    this._UIManager.UI.cursor.classList.add("cursor-dragging");
                    break;
            }

        }

    }

    _mousePointerUpHandler(e) {
        this._isMouseDown = false;
        this._globalStep = this._stepManager._globalStep;
        this._subStep = this._stepManager._subStep;
        // this._UIManager.UI.cursor.classList.remove("cursor-dragging");

        if (this._globalStep === 0) {
            this._paperCutOutMouseUp();

        } else if (this._globalStep === 1) {

            this._colorPickerMouseUp();
            this._UIManager.UI.cursor.classList.remove("cursor-dragging");

        } else if (this._globalStep === 2) {

            switch (this._subStep) {

                case 0:
                    // console.log("sous-étape 1: drag and drop patron sur bout de verre");
                    this._UIManager.UI.cursor.classList.remove("cursor-dragging");
                    break;
                case 1:
                    // console.log("sous-étape 2: découpe du verre");
                    this._glassCutOutMouseUp();
                    break;
                case 2:
                    // console.log("sous-étape 3: drag and drop pour enlever le bout de papier");
                    this._UIManager.UI.cursor.classList.remove("cursor-dragging");
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
                    this._UIManager.UI.cursor.classList.remove("cursor-dragging");  
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
        if (this.feuilleChuteAnimator) {
            this.feuilleChuteAnimator.update(deltaTime)
        }
        if (this.feuilleLeveAnimator) {
            this.feuilleLeveAnimator.update(deltaTime)
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

        this._orbitControlsHandler();
        if (this._dragAndDropTest)
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

        this._UIManager.UI.carreCursor.style.transform = `translate(${this._coordinates.x - 25}px, ${this._coordinates.y - 25}px)`;


        this._UIManager.UI.cursor.style.transform = `translate(${this._coordinates.x - 20}px, ${this._coordinates.y - 20}px)`;
    }

    _setOrbitalControls() {
        this._orbitalsControls = new OrbitControls(this._camera, this._canvas);
        this._orbitalsControls.target.set(0, 0, 0);
        this._orbitalsControls.enableDamping = true;
    }

    _orbitControlsHandler() {
        if (this._orbitalsControls)
            this._orbitalsControls.update();
    }

    _setDragAndDropControls() {
        if (!SETTINGS.enableDragAndDrop) return;

        this._dragAndDropControls = new DragControlsCustom(this._dragItems, this._camera, this._renderer.domElement);

        this._dragAndDropControls.enabled = true;
        this._dragAndDropControls.transformGroup = true;
        this._enableDragAndDrop = true;

        this._initialPosition = {};
        this._isOnTarget = false;

        this._dragStart = (event) => {
            this._initialPosition.x = event.object.position.x;
            this._initialPosition.y = event.object.position.y + 0.001;
            this._initialPosition.z = event.object.position.z;

            // event.object.material.emissive.set(0xaaaaaa);
            if (this._globalStep === 2 || this._subStep === 0) {

                //Action à faire sur le premier drag and drop de l'atelier 3

            } else if (this._globalStep === 2 || this._subStep === 2) {

                //Action à faire sur le drag and drop out 

            } else if (this._globalStep === 2 || this._subStep === 5) {

                //Action à faire sur le dernier drag and drop de fin sur le vitrail de fin

            }

            gsap.to(event.object.scale, { x: 1.2, y: 1.2, z: 1.2, duration: .3 });
        }
        this._drag = (event) => {
            if (this._globalStep === 2 || this._subStep === 0) {

                //Action à faire sur le premier drag and drop de l'atelier 3

            } else if (this._globalStep === 2 || this._subStep === 2) {

                //Action à faire sur le drag and drop out 

            } else if (this._globalStep === 2 || this._subStep === 5) {

                //Action à faire sur le dernier drag and drop de fin sur le vitrail de fin

            }

            // event.object.position.z = this._initialPosition.z;

            if (event.object.position.z < this._initialPosition.z) {
                event.object.position.z = this._initialPosition.z;
            }
        }
        this._dragEnd = (event) => {
            

            if (this._globalStep === 2 && this._subStep === 0) {

                this._pourcentageIntersect = this._dragItems[0].children.filter(intersectObject => this._detectCollision(this._pieceDecoupeDropZone, intersectObject)).length;

                if (this._pourcentageIntersect > 18) {
                    this._isOnTarget = true;
                } else {
                    this._isOnTarget = false;
                }

                //Action à faire sur le premier drag and drop de l'atelier 3
                if (this._isOnTarget) {
                    console.log("fin du drag and drop: Success");
                    //Launch un certain son success
                    const { x, y, z } = this._pieceDecoupe.position;
                    gsap.to(event.object.position, { x: x, y: y, z: z, duration: 1 });
                    //Action a faire dans le step action manager
                    this._actionStepManager.actionsManager(21);
                    this._outlinePass.enabled = false;

                } else {
                    const { x, y, z } = this._initialPosition;
                    event.object.children.map(child => {
                        if (child.material)
                            // child.material.transparent = true;
                            gsap.to(child.material, { opacity: 0, transparent: true, duration: .5 });
                    })
                    gsap.to(event.object.position, { x: x, y: y, z: z, duration: 0, delay: 0.5 });
                    event.object.children.map(child => {
                        if (child.material)
                            gsap.to(child.material, { opacity: 1, transparent: false, duration: .5, delay: 1 });
                        // gsap.to(child.material, {opacity: 1, transparent: false, duration: .5, delay: 1});
                        // child.material.transparent = false;
                    })
                    //Launch un certain son fail
                }

            } else if (this._globalStep === 2 && this._subStep === 2) {
                this._pourcentageIntersect = this._dragItems[0].children.filter(intersectObject => this._detectCollision(this._pieceDecoupeDropZone, intersectObject)).length;

                if (this._pourcentageIntersect > 18) {
                    this._isOnTarget = true;
                } else {
                    this._isOnTarget = false;
                }

                const { x, y, z } = this._initialPosition;
                console.log("2eme drag and drop")
                //Action à faire sur le drag and drop out 
                if (this._isOnTarget) {

                    gsap.to(event.object.position, { x: x, y: y, z: z, duration: 0, delay: 0.5 });
                    //Launch un certain son fail

                } else {
                    console.log("fin du drag and drop out: Success");
                    this._actionStepManager.actionsManager(25);
                    event.object.children.map(child => {
                        if (child.material)
                            child.material.transparent = true;
                        gsap.to(child.material, { opacity: 0, duration: 1 });
                    })
                    this._outlinePass.enabled = false;
                    //Launch un certain son Success
                    this._dragItems.pop();
                    this._dragItems.push(this._scene.getObjectByName("piece_principale"));
                    this._isOnTarget = false;
                }

            } else if (this._globalStep === 2 && this._subStep === 5) {
                this._pourcentageIntersect = this._dragItems[0].children.filter(intersectObject => this._detectCollision(this._vitrailDropZone, intersectObject)).length;

                if (this._pourcentageIntersect > 18) {
                    this._isOnTarget = true;
                } else {
                    this._isOnTarget = false;
                }
                if (this._isOnTarget) {
                    console.log("fin du drag and drop de fin: Success");
                    //Launch un certain son success
                    const { x, y, z } = this._scene.getObjectByName("drop").position;
                    gsap.to(event.object.position, { x: x, y: y, z: z, duration: 1 });
                    // this._actionStepManager.actionsManager(21);
                    this._outlinePass.enabled = false;

                } else {
                    const { x, y, z } = this._initialPosition;
                    // gsap.to(event.object.position, { x: x, y: y, z: z, duration: 1});
                    event.object.children.map(child => {
                        if (child.material)
                            // child.material.transparent = true;
                            gsap.to(child.material, { opacity: 0, transparent: true, duration: .5 });
                    })
                    gsap.to(event.object.position, { x: x, y: y, z: z, duration: 0, delay: 0.5 });
                    event.object.children.map(child => {
                        if (child.material)
                            gsap.to(child.material, { opacity: 1, transparent: false, duration: .5, delay: 1 });
                        // gsap.to(child.material, {opacity: 1, transparent: false, duration: .5, delay: 1});
                        // child.material.transparent = false;
                    })
                    //Launch un certain son fail
                }
                //Action à faire sur le dernier drag and drop de fin sur le vitrail de fin

            }
            gsap.to(event.object.scale, { x: 1, y: 1, z: 1, duration: .3 });
        }

        this._dragAndDropControls.addEventListener('dragstart', this._dragStart);
        this._dragAndDropControls.addEventListener('drag', this._drag);
        this._dragAndDropControls.addEventListener('dragend', this._dragEnd);
        // this._toggleDragAndDropControls();
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
            // this._dragAndDropControls.removeEventListener('dragstart', this._dragStart);
            // this._dragAndDropControls.removeEventListener('drag', this._drag)
            // this._dragAndDropControls.removeEventListener('dragend', this._dragEnd);
            this._enableDragAndDrop = false;
            this._dragAndDropControls.enabled = false;
            this._dragAndDropControls.deactivate();
        } else {
            // this._dragAndDropControls.addEventListener('dragstart', this._dragStart);
            // this._dragAndDropControls.addEventListener('drag', this._drag);
            // this._dragAndDropControls.addEventListener('dragend', this._dragEnd);
            this._enableDragAndDrop = true;
            this._dragAndDropControls.enabled = true;
            this._dragAndDropControls.activate();
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

    _pressureGaugeHandler(deltaTime) {
        this._globalStep = this._stepManager._globalStep;
        this._subStep = this._stepManager._subStep;

        if (this._globalStep !== 2 || this._subStep !== 3) return;

        if (this._isMouseDown && this._currentIntersect) {
            if (this._currentIntersect.name === "piece1") {
                this._pressureGaugeValue += Math.ceil(deltaTime);
                console.log(this._pressureGaugeValue);
                this._UIManager.UI.pressureGaugeScale.style.transform = `translate(-50%, -50%) scale(${1 + this._pressureGaugeValue / 100})`;
                this._UIManager.UI.pressureGaugeScale.style.transition = `.3s all ease-in-out;`;
            }
        }
    }

    _paperCutOutScrollHandler(e) {
        this._animationDuration = 5.6;
        this._numberOfWheelEvent = 150;
        this._UIManager.removeScrollPicto();

        if (e.deltaY > 0 && this._scrollY < 59 && this._actionStepManager._allowedScroll === true) {
            this._scrollTimeline += this._animationDuration / this._numberOfWheelEvent;
            this._scrollY += 1;
            this._state.setSoundInteractionToPlay(soundsOnInteraction.ciseaux_url, true, true);
            this._paperCutOutScrollAnimation();
        }

        // console.log(this._scrollTimeline + " : " + this._scrollY);

        if (this._scrollY === 58) {
            console.log("fin de l'animation");
            this._actionStepManager.actionsManager(8);
            this._state.setSoundInteractionToPlay(soundsOnInteraction.ciseaux_url, false, false);
        }
    }

    _paperCutOutScrollAnimation() {
        this._feuilleChuteAnimations.map((animations, index) => {
            this.feuilleChuteManager.ScrollAnimation(index, this._scrollTimeline);
        })
    }

    _toggleArtisaneOpacity(artisaneName) {
        for (const artisane of this._artisanes) {
            if (artisane.name === artisaneName) {
                artisane.material.opacity = artisane.material.opacity === 0 ? 1 : 0;
            }
        }
    }

}

export default ThreeScene;