class UIManager {
    constructor() {
        this.UI = {}

        this._setUI();
    }

    _setUI() {
        this.UI.pressureGauge = document.querySelector("#pressureGauge");

        this.UI.clickGruger = document.querySelector("#clickGruger")
        this.UI.dragAndDrop = document.querySelector("#dragAndDrop")
        this.UI.jaugePression = document.querySelector("#jaugePression")
        this.UI.scroll = document.querySelector("#scroll")
        this.UI.traceGlissiere = document.querySelector("#traceGlissiere")
    }

    _setClickGruger() {
        this.UI.clickGruger.style.opacity = 1
        setTimeout(() => {
            this.UI.clickGruger.style.opacity = 0
        }, 8000);
    }

    _setDragAndDropPicto() {
        this.UI.dragAndDrop.style.opacity = 1
        setTimeout(() => {
            this.UI.dragAndDrop.style.opacity = 0
        }, 8000);
    }

    _setJaugePression() {
        this.UI.jaugePression.style.opacity = 1
        setTimeout(() => {
            this.UI.jaugePression.style.opacity = 0
        }, 8000);
    }

    _setScroll() {
        this.UI.scroll.style.opacity = 1
        setTimeout(() => {
            this.UI.scroll.style.opacity = 0
        }, 8000);
    }

    _setTraceGlissiere() {
        this.UI.traceGlissiere.style.opacity = 1
        setTimeout(() => {
            this.UI.traceGlissiere.style.opacity = 0
        }, 8000);
    }
}
export default UIManager;