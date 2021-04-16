//vendors
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

//datas
import models from "@assets/data/models.json"

//utils
import bindAll from './bindAll';

class AssetsLoader {
    constructor() {
        bindAll(
            this,
            'loadAssets'
        );

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
        models.map( (elm) => {
            let promise = new Promise(resolve => {
                this._loader.load(elm.url, resolve);
                this.models[`${elm.name}`] = {};
            })
            .then(result => {
                this.models[`${elm.name}`] = result;
                this._modelsLoaded += 1;
            });
            this._promises.push(promise);
        });

        Promise.all(this._promises).then(() => console.log("Loaded"));

        return Promise.all(this._promises);
    }

    getModels() {
        return this.models;
    }

}

export default AssetsLoader;