import bindAll from '@jsLogic/utils/bindAll';

class UIManager {
    constructor() {
        bindAll(
            this,
            'setClickPointsPicto',
            'setDragAndDropPicto',
            'setPressionPicto',
            'setScrollPicto',
            'setTracePicto'
        );
        this.UI = {}

        this._setUI();

        this._removeClickPointsPicto
        this._removeDragAndDropPicto
        this._removePressionPicto
        this._removeScrollPicto
        this._removeTracePicto
    }

    _setUI() {
        this.UI.pressureGauge = document.querySelector("#pressureGauge");

        this.UI.cursor = document.querySelector("#cursor");

        this.UI.clickPoints = document.querySelector("#clickPoints")
        this.UI.dragAndDrop = document.querySelector("#dragAndDrop")
        this.UI.pression = document.querySelector("#pression")
        this.UI.scroll = document.querySelector("#scroll")
        this.UI.trace = document.querySelector("#trace")
    }

    //Renseigner simplement le top et le left des éléments

    setClickPointsPicto(top, left) {
        this.UI.clickPoints.style.opacity = 1
        this.UI.clickPoints.style.top = top + "%"
        this.UI.clickPoints.style.left = left + "%"

        this._removeClickPointsPicto = setTimeout(() => {
            this.UI.clickPoints.style.opacity = 0
            console.log('je menleve au bout de 8s')
        }, 8000);

    }

    removeClickPointsPicto() {
        clearTimeout(this._removeClickPointsPicto)
        this.UI.clickPoints.style.opacity = 0
    }


    setDragAndDropPicto(top, left) {
        this.UI.dragAndDrop.style.opacity = 1
        this.UI.dragAndDrop.style.top = top + "%"
        this.UI.dragAndDrop.style.left = left + "%"

        this._removeDragAndDropPicto = setTimeout(() => {
            this.UI.dragAndDrop.style.opacity = 0
        }, 8000);
    }

    removeDragAndDropPicto() {
        clearTimeout(this._removeDragAndDropPicto)
        this.UI.dragAndDrop.style.opacity = 0
    }


    setPressionPicto(top, left) {
        this.UI.pression.style.opacity = 1
        this.UI.pression.style.top = top + "%"
        this.UI.pression.style.left = left + "%"

        this._removePressionPicto = setTimeout(() => {
            this.UI.pression.style.opacity = 0
        }, 8000);
    }

    removePressionPicto() {
        clearTimeout(this._removePressionPicto)
        this.UI.pression.style.opacity = 0
    }


    setScrollPicto(top, left) {
        this.UI.scroll.style.opacity = 1
        this.UI.scroll.style.top = top + "%"
        this.UI.scroll.style.left = left + "%"

        this._removeScrollPicto = setTimeout(() => {
            this.UI.scroll.style.opacity = 0
        }, 8000);
    }

    removeScrollPicto() {
        clearTimeout(this._removeScrollPicto)
        this.UI.scroll.style.opacity = 0
    }


    setTracePicto(top, left) {
        this.UI.trace.style.opacity = 1
        this.UI.trace.style.top = top + "%"
        this.UI.trace.style.left = left + "%"
        this._removeTracePicto = setTimeout(() => {
            this.UI.trace.style.opacity = 0
        }, 8000);
    }

    removeTracePicto() {
        clearTimeout(this._removeTracePicto)
        this.UI.trace.style.opacity = 0
    }

}
export default UIManager;