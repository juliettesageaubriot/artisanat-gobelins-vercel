class UIManager {
    constructor() {
        this.UI = {}

        this._setUI();
    }

    _setUI() {
        this.UI.pressureGauge = document.querySelector("#pressureGauge");

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
        setTimeout(() => {
            this.UI.clickPoints.style.opacity = 0
        }, 8000);
    }

    setDragAndDropPicto(top, left) {
        this.UI.dragAndDrop.style.opacity = 1
        this.UI.dragAndDrop.style.top = top + "%"
        this.UI.dragAndDrop.style.left = left + "%"
        setTimeout(() => {
            this.UI.dragAndDrop.style.opacity = 0
        }, 8000);
    }

    setPressionPicto(top, left) {
        this.UI.pression.style.opacity = 1
        this.UI.pression.style.top = top + "%"
        this.UI.pression.style.left = left + "%"
        setTimeout(() => {
            this.UI.pression.style.opacity = 0
        }, 8000);
    }

    setScrollPicto(top, left) {
        this.UI.scroll.style.opacity = 1
        this.UI.scroll.style.top = top + "%"
        this.UI.scroll.style.left = left + "%"
        setTimeout(() => {
            this.UI.scroll.style.opacity = 0
        }, 8000);
    }

    setTracePicto(top, left) {
        this.UI.trace.style.opacity = 1
        this.UI.trace.style.top = top + "%"
        this.UI.trace.style.left = left + "%"
        setTimeout(() => {
            this.UI.trace.style.opacity = 0
        }, 8000);
    }
}
export default UIManager;