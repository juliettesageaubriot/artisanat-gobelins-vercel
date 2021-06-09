//vendors
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControlsCustom } from "@jsLogic/three/dragAndDrop/dragAndDrop.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
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
            '_animationToDragPosition',
            '_glassCutOutObjectAppear',
            '_removeAllScene',
            '_setBarScene'
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
        this._renderTarget.texture.encoding = THREE.sRGBEncoding

        this._effectComposer = new EffectComposer(this._renderer, this._renderTarget);
        this._effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._effectComposer.setSize(window.innerwidth, window.innerHeight);

        this._renderPass = new RenderPass(this._scene, this._camera);
        this._effectComposer.addPass(this._renderPass);

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

        this._UIManager = new UIManager(this._get3DobjectScreenPosition, this._glassCutOutObjectDisappear, this._state, this._glassCutOutObjectAppear, this._changeStateDecoupeDuVerre);

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
            this._animationToDragPosition,
            this._setFinalColors
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
            couleurCarre01: "#F6B4BE",
            couleurEtoile09: "#00FF00",
            couleurRectangle10: "#A9DCD6",
            couleurCercle05: "#ABEEAA"
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

        this._barScene;

        this._setupEventListeners();
        this._resizeHandler();
        this._setEnvironmentMap();
    }

    _setCameraAnimationPlay(index, actionIndex) {
        this._camera = this._cameras[index];
        this._renderPass.camera = this._cameras[index];
        this._resizeHandler();
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
        this._feuilleLeveAnimations.map((animations, index) => {
            this.feuilleLeveAnimator.playClipByIndex(index);
        })
        this.feuilleLeveAnimator.mixer.addEventListener("finished", () => {
            if (actionIndex === "none" || actionIndexDone === true) return;
            actionIndexDone = true;
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

                } else if("exterieur" === child.name) {

                    this._addToScene(child);

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
                } else if ("piece_verre" === child.name) {
                    this._piece_decoupe = child;
                    child.traverse(async child => {

                        if ("debut" === child.name
                            || "milieu1" === child.name
                            || "milieu2" === child.name
                            || "milieu3" === child.name
                            || "milieu4" === child.name
                            || "milieu5" === child.name
                            || "fin" === child.name) {

                            this._piece_decoupeeObjects.push(child.name);
                            this._glassCutOutRaycastObject.push(child);

                            child.material.transparent = true;
                            child.material.opacity = 0;

                        }
                    });
                } else if ("papier_decoupe" === child.name) {

                    this._dragItems.push(child);

                } else if ("piece_principale" === child.name) {

                    this._outlinePass.renderCamera = this._camera;
                    this._glassCutOutRaycastObject.push(child);

                    // child.material.transparent = true;
                    // child.material.opacity = 0;
                }   else if ("surface_drop" === child.name) {
                    this._pieceDecoupeDropZone = child;

                    child.material.opacity = 0;

                } else if ("piecePrincipaleAbove_parent" === child.name) {

                    this._pieceDecoupe = child;
                    // child.material.opacity = 0;
                    // child.material.transparent = true;

                } else if("piece1" === child.name) {

                    this._glassCutOutRaycastObject.push(child);
                    child.material.opacity = 0;
                    child.material.transparent = true;

                } else if("extrusion1" === child.name
                    || "extrusion2" === child.name
                    || "extrusion3" === child.name
                    || "extrusion4" === child.name
                    || "extrusion5" === child.name
                    || "extrusion6" === child.name
                    || "extrusion7" === child.name
                    || "extrusion8" === child.name) {

                        child.material.transparent = true;
                        child.material.opacity = 0;

                } else if("pinceGruger1" === child.name
                    || "pinceGruger2" === child.name
                    || "pinceGruger3" === child.name
                    || "jaugePression1" === child.name
                    || "piece_principale_visible" === child.name) {
                    child.material.transparent = true;
                    child.material.opacity = 0.75;

                } else if("zoneDragAndDrop" === child.name) {

                    child.material.transparent = true;
                    child.material.opacity = 0;
                    this._vitrailDropZone =  child;

                } else if("drag" === child.name) {

                    this._dragStartVitrail = child;
                    child.material.transparent = true;
                    child.material.opacity = 0;

                } else if("couleurEtoile" === child.name) {

                    const texture = this._textureLoader.load('/assets/textures/colorPicker/crayonnes/crayonnés_carré_central.jpg');
                    child.material.alphaMap = texture;
                    child.material.alphaTest = 0.5;
                    child.material.transparent = true;

                } else if("vitreColoration_01" === child.name
                    || "vitreColoration_02" === child.name
                    || "porteVitre" === child.name
                    || "vitreFour" === child.name) {
                        child.material.transparent = true;
                        child.material.opacity = 0.7;

                } else if("vitrail1_Verre" === child.name) {
                    // child.material.color = new THREE.Color(0xff00ff)
                    child.material.transparent = true;
                    child.material.opacity = 0.6
                } else if("verreBake" === child.name) {
                    // child.material.color = new THREE.Color(0xff00ff)
                    child.material.transparent = true;
                    child.material.opacity = 0.5;
                    // child.material.depthWrite = false;
                    // child.material.colorWrite = false;
                } else if ("bar" === child.name) {
                    this._barScene = child;
                    this._cameraAnimationBar = [...this._models[name].animations];

                    this.cameraAnimatorBar = new AnimationManager(child, this._cameraAnimationBar);
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

    _removeAllScene() {
        this._scene.remove.apply(this._scene, this._scene.children);
    }

    _setBarScene() {
        this._removeAllScene();
        this._addToScene(this._barScene);

        this._newCamera = this._barScene.getObjectByName("CameraBar_Orientation");
        console.log(this._barScene)

        //SetNewCameraOfBar
        this._camera = this._newCamera;
        this._renderPass.camera = this._newCamera;
        this._outlinePass.renderCamera = this._newCamera;

        this.cameraAnimatorBar.playClipByIndex(0);

        this._resizeHandler();
        this._state.setFonduAppear(false);
        this._setColorsOnVitrailBar();

        setTimeout(() => {
            this._state.setNextSubtitle(17);
            setTimeout(() => {
                this._state.setFonduAppear(true);
                setTimeout(() => {
                    this._state.lastPage();
<<<<<<< HEAD
                }, 4500);
=======
                }, 6000);
>>>>>>> 8831d79fe260bab1512d453f8989d368d0a6dfec
            }, 13500);
        }, 3000);

        this._ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this._addToScene(this._ambientLight);
    }

    _setColorsOnVitrailBar() {
        this._barScene.traverse(object => {
            if(object.name === "vitrailRectangles") {
                object.material.color = this._finalColorPicked.couleurRectangle10;
            } else if(object.name === "vitrailCarres") {
                object.material.color = this._finalColorPicked.couleurCarre01;
            } else if(object.name === "vitrailDemiCercles") {
                object.material.color = this._finalColorPicked.couleurCercle05;
            } else if(object.name === "vitrailLosanges") {
                object.material.color = this._finalColorPicked.couleurEtoile09;
            } else if(object.name.includes("rayons")) {
                object.material.color = this._finalColorPicked.couleurRectangle10;
                object.material.transparent = true;
                object.material.opacity = .2;
            }
        });
    }

    _animationToDragPosition() {
        this._pieceToMove = this._scene.getObjectByName("piece_principale")
        const { x, y, z } = this._scene.getObjectByName("drag").position;

        gsap.to(this._pieceToMove.position, { x: x, y: y, z: z, duration: 2.0 });
        gsap.to(this._pieceToMove.rotation, { x: 0, y: 0, z: 0, duration: 2.0 });
    }

    _start() {
        this._createModels(this._models);
        this._resizeHandler();

        this._actionStepManager.actionsManager(0);

        this._setColorsOnFinalVitrail();
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

    _get3DobjectScreenPosition(objectName) {

        const object = this._scene.getObjectByName(objectName);

        var vector = new THREE.Vector3();

        // var widthHalf = 0.5 * this._renderer.getContext().canvas.width;
        // var heightHalf = 0.5 * this._renderer.getContext().canvas.height;
        var widthHalf = 0.5 * window.innerWidth;
        var heightHalf = 0.5 * window.innerHeight;

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
        console.log(this._width)
        console.log(this._height)
        console.log(this._renderer.getContext().canvas.width)
        console.log(this._renderer.getContext().canvas.height)

        this._resize(this._width, this._height);
    }

    _colorPickerHandler(intersect) {
        if (intersect) {
            this._object = intersect.object;
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
                setTimeout(() => {
                    this._state.setSoundInteractionToPlay(soundsOnInteraction.crayonnes_url, false, false);
                }, 1000);
            }
            this._colorPicked.current = null;
            this._UIManager.UI.carreCursor.style.opacity = 0;
        } else {
            this._colorPicked.current = null;
            this._UIManager.UI.carreCursor.style.opacity = 0;
        }
    }

    _setFinalColors() {
        this._crayonnes.map(elm => {
            if(elm.name === "couleurCarre01" || elm.name === "couleurRectangle10" || elm.name === "couleurEtoile09" || elm.name === "couleurCercle05") {
                this._finalColorPicked[elm.name] = elm.material.color;
            }
        });

        // this._vitrail = ["debut", "milieu1", "milieu2", "milieu3", "milieu4", "milieu5", "fin", "piece1", "extrusion1", "extrusion2", "extrusion3", "extrusion4", "extrusion5", "extrusion6", "extrusion7", "extrusion8"];
        this._vitrail = ["pinceGruger1", "pinceGruger2", "pinceGruger3", "jaugePression1", "piece_principale_visible"];

        const colorTexture = this._textureLoader.load('/assets/textures/glass/glass.jpg');
        colorTexture.wrapS = THREE.RepeatWrapping;
        colorTexture.wrapT = THREE.RepeatWrapping;
        colorTexture.minFilter = THREE.NearestFilter;
        colorTexture.magFilter = THREE.NearestFilter;

        this._vitrail.map(verre => {
            this._scene.getObjectByName(verre).material = new THREE.MeshPhysicalMaterial({
                color: this._finalColorPicked.couleurEtoile09,
                map: colorTexture,
                depthWrite: true,
                colorWrite: true,
                side: THREE.FrontSide,
                opacity: .5,
                transparent: true
            });
        });

        this._scene.getObjectByName("couleurEtoile").material.color = this._finalColorPicked.couleurEtoile09;

        this._setColorsOnFinalVitrail();

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

    _glassCutOutPressureGauge(intersect) {
        if (intersect) {
            this._object = intersect.object;
            this._currentIntersect = this._object;
        }
        else {
            this._currentIntersect = null
        }
    }

    _glassCutOutPinceAGruger(intersect) {
        if (intersect) {
            this._object = intersect.object;
            this._currentIntersect = this._object;
        }
        else {
            this._currentIntersect = null
        }
    }

    _glassCutOutObjectDisappear(objectNames) {
        objectNames.map(objectName => {
            let object = this._scene.getObjectByName(objectName);
            object.material = new THREE.MeshStandardMaterial({
                color: this._finalColorPicked.couleurEtoile09
            })
            gsap.to(object.material, {transparent: true, opacity: 0, duration: 0.5})
            object.children.map(child => {
                gsap.to(child.material, {transparent: true, opacity: 0, duration: 0.5})
            })
        })
    }
    _glassCutOutObjectAppear(objectNames) {
        objectNames.map(objectName => {
            let object = this._scene.getObjectByName(objectName);
            gsap.to(object.material, {transparent: false, opacity: 1, duration: 0.5})
        })
    }

    _glassCutOut(intersect) {
        if (intersect) {
            this._object = intersect.object;
            if (this._currentIntersect) {
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
                    setTimeout(() => {
                        this._state.setSoundInteractionToPlay(soundsOnInteraction.coupeVerre3_url, false, false);
                    }, 1000);
                    break
                default:
                    this._isRunningDecoupeTrace = false;
                    console.log("Decoupe du verre: fail")
                    this._state.setSoundInteractionToPlay(soundsOnInteraction.coupeVerre2_url, false, false);
                    setTimeout(() => {
                        this._state.setSoundInteractionToPlay(soundsOnInteraction.coupeVerre2_url, false, false);
                    }, 1000);
            }
        }
    }

    _glassCutOutPressureGaugeMouseUp() {
        if (this._pressureGaugeValue > 40 && this._pressureGaugeValue < 80 && this._currentIntersect.name === "piece1") {
            console.log("PressureGauge: success");
            this._actionStepManager.actionsManager(27);
            // this._pieceToGetRidOf = this._scene.getObjectByName("piece1");
            this._pieceToGetRidOf = this._scene.getObjectByName("jaugePression1");
            this._pieceToGetRidOf.material = new THREE.MeshStandardMaterial({
                color: this._pieceToGetRidOf.material.color,
                transparent: true
            });
            gsap.to(this._pieceToGetRidOf.material, { opacity: 0, duration: 1 });
            this._state.setSoundInteractionToPlay(soundsOnInteraction.reussiteCassureVerre2_url, true, false);
            this._glassCutOutObjectDisappear(["piece1"]);
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

        } else if (this._globalStep === 1) {

            this._colorPickerMouseDown();
            this._UIManager.setCursorDragging();

        } else if (this._globalStep === 2) {

            switch (this._subStep) {

                case 0:
                    // console.log("sous-étape 1: drag and drop patron sur bout de verre");
                    this._UIManager.setCursorDragging();
                    break;
                case 1:
                    // console.log("sous-étape 2: découpe du verre");
                    this._glassCutOutMouseDown();
                    break;
                case 2:
                    // console.log("sous-étape 3: drag and drop pour enlever le bout de papier");
                    this._UIManager.setCursorDragging();
                    break;
                case 3:
                    // console.log("sous-étape 4: Jauge de pression pour casser le bout de verre");
                    break;
                case 4:
                    // console.log("sous-étape 5: cassage des derniers petits bout de verre");
                    break;
                case 5:
                    // console.log("sous-étape 5: drag and drop au milieu du vitrail fini");
                    this._UIManager.setCursorDragging();
                    break;
            }
        }
    }

    _mousePointerUpHandler(e) {
        this._isMouseDown = false;
        this._globalStep = this._stepManager._globalStep;
        this._subStep = this._stepManager._subStep;

        if (this._globalStep === 0) {

        } else if (this._globalStep === 1) {

            this._colorPickerMouseUp();
            this._UIManager.setCursorDraggingDefault();

        } else if (this._globalStep === 2) {

            switch (this._subStep) {

                case 0:
                    // console.log("sous-étape 1: drag and drop patron sur bout de verre");
                    this._UIManager.setCursorDraggingDefault();
                    break;
                case 1:
                    // console.log("sous-étape 2: découpe du verre");
                    this._glassCutOutMouseUp();
                    break;
                case 2:
                    // console.log("sous-étape 3: drag and drop pour enlever le bout de papier");
                    this._UIManager.setCursorDraggingDefault();
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
                    this._UIManager.setCursorDraggingDefault();
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
        if (this.cameraAnimatorBar) {
            this.cameraAnimatorBar.update(deltaTime)
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
            'assets/textures/environmentMaps/fondBlanc.png',
            'assets/textures/environmentMaps/fondBlanc.png',
            'assets/textures/environmentMaps/fondBlanc.png',
            'assets/textures/environmentMaps/fondBlanc.png',
            'assets/textures/environmentMaps/fondBlanc.png',
            'assets/textures/environmentMaps/fondBlanc.png'
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

            this._UIManager.removeDragAndDropPicto();

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

            // if (event.object.position.z < this._initialPosition.z) {
            //     event.object.position.z = this._initialPosition.z;
            // }
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
                    gsap.to(this._outlinePass, { edgeThickness: 0, duration: 0 });
                    gsap.to(event.object.position, { x: x, y: y, z: z, duration: 0, delay: 0.5 });
                    event.object.children.map(child => {
                        if (child.material)
                            gsap.to(child.material, { opacity: 1, transparent: false, duration: .5, delay: 1 });
                        // gsap.to(child.material, {opacity: 1, transparent: false, duration: .5, delay: 1});
                        // child.material.transparent = false;
                    })
                    gsap.to(this._outlinePass, { edgeThickness: 3, duration: .5, delay: 1 });
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
                    gsap.to(this._outlinePass, { edgeThickness: 0, duration: 0 });
                    gsap.to(event.object.position, { x: x, y: y, z: z, duration: 0, delay: 0.5 });
                    gsap.to(this._outlinePass, { edgeThickness: 3, duration: .5, delay: 1 });
                    //Launch un certain son fail

                } else {
                    console.log("fin du drag and drop out: Success");
                    this._actionStepManager.actionsManager(25);
                    event.object.children.map(child => {
                        if (child.material)
                            child.material.transparent = true;
                        gsap.to(child.material, { opacity: 0, duration: 1 });
                    })
                    this._scene.getObjectByName("piece_principale_visible").material.depthTest = false;
                    this._outlinePass.enabled = false;
                    //Launch un certain son Success
                    this._dragItems.pop();
                    this._dragItems.push(this._scene.getObjectByName("piece_principale"));
                    this._dragAndDropControls.transformGroup = false;
                    this._isOnTarget = false;
                }

            } else if (this._globalStep === 2 && this._subStep === 5) {
                this._pourcentageIntersect = this._dragItems[0].children.filter(intersectObject => this._detectCollision(this._vitrailDropZone, intersectObject)).length;
                // this._pourcentageIntersect = this._detectCollision(this._vitrailDropZone, this._dragItems[0]);

                if (this._pourcentageIntersect = true) {
                    this._isOnTarget = true;
                } else {
                    this._isOnTarget = false;
                }
                if (this._isOnTarget) {
                    console.log("fin du drag and drop de fin: Success");
                    //Launch un certain son success
                    const { x, y, z } = this._scene.getObjectByName("drop").position;
                    const { xR, yR, zR } = this._scene.getObjectByName("drop").rotation;
                    // gsap.to(event.object.rotation, { x: 0, duration: 1 });
                    gsap.to(event.object.position, { x: x, y: y, z: z, duration: 1, delay: 0.25});
                    gsap.to(event.object.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 1, delay: 0.5});

                    this._actionStepManager.actionsManager(33);

                    setTimeout(() => {
                        this._setBarScene();
                    }, 5000);
                    this._outlinePass.enabled = false;

                } else {
                    const { x, y, z } = this._initialPosition;
                    // gsap.to(event.object.position, { x: x, y: y, z: z, duration: 1});
                    event.object.children.map(child => {
                        if (child.material)
                            // child.material.transparent = true;
                            gsap.to(child.material, { opacity: 0, transparent: true, duration: .5 });
                    })
                    gsap.to(this._outlinePass, { edgeThickness: 0, duration: 0 });
                    // gsap.to(event.object.material, { opacity: 0, transparent: true, duration: .5 });
                    // gsap.to(event.object.position, { x: x, y: y, z: z, duration: 0, delay: 0.5 });
                    // gsap.to(event.object.material, { opacity: 1, transparent: false, duration: .5, delay: 1 });

                    gsap.to(event.object.position, { x: x, y: y, z: z, duration: 0, delay: 0.5 });
                    event.object.children.map(child => {
                        if (child.material)
                            gsap.to(child.material, { opacity: 1, transparent: false, duration: .5, delay: 1 });
                        // gsap.to(child.material, {opacity: 1, transparent: false, duration: .5, delay: 1});
                        // child.material.transparent = false;
                    })
                    gsap.to(this._outlinePass, { edgeThickness: 3, duration: .5, delay: 1 });
                    //Launch un certain son fail
                }
            }
            gsap.to(event.object.scale, { x: 1, y: 1, z: 1, duration: .3 });
        }

        this._dragAndDropControls.addEventListener('dragstart', this._dragStart);
        this._dragAndDropControls.addEventListener('drag', this._drag);
        this._dragAndDropControls.addEventListener('dragend', this._dragEnd);
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
        if (this._enableDragAndDrop) {
            this._enableDragAndDrop = false;
            this._dragAndDropControls.enabled = false;
            this._dragAndDropControls.deactivate();
        } else {
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
                if(this._pressureGaugeValue > 40 && this._pressureGaugeValue < 80) {

                    this._UIManager.UI.pressureGaugeScale.style.boxShadow = `
                    inset 0 0 50px #adfde2,
                    inset 20px 0 60px #adfde2,
                    inset -20px 0 60px #adfde2,
                    inset 20px 0 300px #adfde2,
                    inset -20px 0 300px #adfde2,
                    0 0 50px #adfde2,
                    -10px 0 60px #adfde2,
                    10px 0 60px #adfde2`;

                } else {

                    this._UIManager.UI.pressureGaugeScale.style.boxShadow = "";

                }
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