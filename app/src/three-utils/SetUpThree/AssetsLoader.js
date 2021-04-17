//vendors
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

//datas
import models from "@assets/data/models.json"

//utils
import bindAll from './bindAll.js';

class AssetsLoader {
    constructor() {
        bindAll(
            this,
            'loadAssets',
            'removeLoader',
            'addLoaderBar'
        );

        this._loader = new GLTFLoader();
        this._dracoLoader = new DRACOLoader();
        this._models = {};

        this._setup();
    }

    _setup() {
        this.addLoaderBar()
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
        });

        return Promise.all(this._promises);
    }

    getModels() {
        return this.models;
    }

    addLoaderBar() {
        let HandElm = document.querySelector('.hand')
        let ProgressBar = require('progressbar.js')

        const params = {
            colorCyan: '#94FEDF',
            colorBlack: '#080808',
        }

        let bar = new ProgressBar.Line('.percent-loader', {
            strokeWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            color: params.colorBlack,
            trailColor: params.colorCyan,
            trailWidth: 1,
            svgStyle: { width: '100%', height: '100%' },
            text: {
                style: {
                    // Text color.
                    // Default: same as stroke color (options.color)
                    color: params.colorBlack,
                    position: 'absolute',
                    left: '0',
                    top: '-15px',
                    padding: 0,
                    margin: 0,
                    transform: null,
                    fontFamily: "Cirka"
                },
                autoStyleContainer: false
            },
            // from: { color: '#94FEDF' },
            // to: { color: '#94FEDF' },
            step: (state, bar) => {
                bar.setText(Math.round(bar.value() * 100) + ' %');
                HandElm.setAttribute('translateValue', Math.round(bar.value() * 100))
            }
        });
        bar.animate(1.0);  // Number from 0.0 to 1.0
    }

    removeLoader() {
        const loader = document.getElementById('assetLoader')
        loader.classList.remove('actived')
    }

}

export default AssetsLoader;