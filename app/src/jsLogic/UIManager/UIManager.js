class UIManager {
    constructor() {
        this.UI = {}

        this._setUI();
    }

    _setUI() {
        this.UI.pressureGauge = document.querySelector("#pressureGauge");
    }
}
export default UIManager;