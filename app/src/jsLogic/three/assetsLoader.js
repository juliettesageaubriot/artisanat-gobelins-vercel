//vendors
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

//datas
import models from "@assets/data/models.json"

//utils
import bindAll from '../utils/bindAll.js';

class AssetsLoader {
    constructor(enableRaycastMenu) {
        bindAll(
            this,
            'loadAssets',
            'removeLoader',
            'setRaycast'
        );
        this.enableRaycastMenu = enableRaycastMenu;
        this._loader = new GLTFLoader();
        this._dracoLoader = new DRACOLoader();
        this._models = {};

        this._setup();
    }

    _setup() {
        this._promises = [];
        this._dracoLoader.setDecoderPath('/assets/models/gltf/draco/');
        this._loader.setDRACOLoader(this._dracoLoader);
        this.models = {};
        this._modelsLoaded = 0;
        // this.loadAssets();
    }

    loadAssets() {

        models.map((elm) => {
            let promise = new Promise((resolve) => {
                this._loader.load(elm.url, resolve);
                this.models[`${elm.name}`] = {};
            })
                .then(result => {
                    this.models[`${elm.name}`] = result;
                    this._modelsLoaded += 1;
                });
            this._promises.push(promise);
        });


        Promise.all(this._promises).then(() => {
            this.removeLoader()
            this.setRaycast()
        });

        return Promise.all(this._promises);
    }

    getModels() {
        return this.models;
    }

    removeLoader() {
        const loader = document.getElementById('assetLoader')
        // const toolsAnim = document.getElementById('toolsModal')

        // toolsAnim.classList.add('loaded')
        loader.classList.remove('actived')
    }

    setRaycast() {
        this.enableRaycastMenu = true
        return this.enableRaycastMenu
    }

}

export default AssetsLoader;