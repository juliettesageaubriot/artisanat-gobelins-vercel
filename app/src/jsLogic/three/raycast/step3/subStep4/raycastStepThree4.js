export const _glassCutOutPressureGauge = (intersect) => {
    if (intersect) {
        let _object = intersect.object;
        // console.log(this._object);
    }
    else {

    }
}

export const _glassCutOutPressureGaugeMouseDown = () => {
    console.log("glass mouse down");
}
export const _glassCutOutPressureGaugeMouseUp = (_pressureGaugeValue, _piece_decoupeAnimationsSuccessCutAnimator, pressureGauge, actionStepManager) => {
    console.log("glass mouse up")
    if (_pressureGaugeValue > 80 && _pressureGaugeValue < 100) {
        console.log("vous avez gagné !");
        // actionStepManager.actionsManager(25);
        _piece_decoupeAnimationsSuccessCutAnimator.playClipByIndex(0);
    } else {
        console.log("vous avez perdu !");
        _pressureGaugeValue = 0;
        // _UIManager.UI.pressureGauge.style.transform = `scale(1)`;
        pressureGauge.style.transform = `scale(1)`;
    }
}