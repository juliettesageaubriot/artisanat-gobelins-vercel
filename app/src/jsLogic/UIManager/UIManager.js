import bindAll from '@jsLogic/utils/bindAll';

//datas
import { soundsOnInteraction } from "@jsLogic/utils/sounds.js";

class UIManager {
    constructor(getObjectCoordinatesByName, glassCutOutObjectDisappear, state, glassCutOutObjectAppear) {
        bindAll(
            this,
            'setClickPointsPicto',
            'setDragAndDropPicto',
            'setDragAndDropOutPicto',
            'setPressionPicto',
            'setScrollPicto',
            'setTracePicto'
        );

        this._getObjectCoordinatesByName = getObjectCoordinatesByName;
        this._glassCutOutObjectDisappear = glassCutOutObjectDisappear;
        this._state = state;
        this._glassCutOutObjectAppear = glassCutOutObjectAppear;
        this.UI = {}

        this._setUI();

        this._removeClickPointsPicto
        this._removeDragAndDropPicto
        this._removeDragAndDropOutPicto
        this._removeDragAndDropColorPickerPicto
        this._removePressionPicto
        this._removePressureGaugePicto
        this._removeScrollPicto
        this._removeTracePicto
        this._removeTraceFixePicto
        this._removeDragAndDropPictoEnd
    }

    _setUI() {
        this.UI.pressureGauge = document.querySelector("#pressureGauge");
        this.UI.pressureGaugeScale = document.querySelector("#scale-pressure");

        this.UI.cursor = document.querySelector("#cursor");
        this.UI.cursorImg = document.querySelector("#cursor-img");
        this.UI.carreCursor = document.querySelector("#carre-cursor");
        this.UI.html = document.querySelector("html");

        this.UI.colorPickerCta = document.querySelector("#colorPicker-cta")

        this.UI.clickPoints = document.querySelector("#clickPoints")
        this.UI.clickPointsOne = document.querySelector("#clickPointsOne")
        this.UI.clickPointsTwo = document.querySelector("#clickPointsTwo")
        this.UI.clickPointsThree = document.querySelector("#clickPointsThree")

        this.UI.dragAndDrop = document.querySelector("#dragAndDrop")
        this.UI.dragAndDropOut = document.querySelector("#dragAndDropOut")
        this.UI.dragAndDropEnd = document.querySelector("#dragAndDropEnd")
        this.UI.dragAndDropColorPicker = document.querySelector("#dragAndDropColorPicker")
        this.UI.pression = document.querySelector("#pression")
        this.UI.scroll = document.querySelector("#scroll")
        this.UI.trace = document.querySelector("#trace")
        this.UI.traceFixe = document.querySelector("#trace-fixe")
    }

    //Renseigner simplement le top et le left des éléments

    setClickPointsPicto(objectName, action) {
        this._coordinates = this._getObjectCoordinatesByName(objectName);
        this.UI.clickPoints.style.opacity = 1;
        this.UI.clickPoints.style.top = this._coordinates.y + 70 + "px"
        this.UI.clickPoints.style.left = this._coordinates.x + 30 + "px"

        this._removeClickPointsPicto = setTimeout(() => {
            this.UI.clickPoints.style.opacity = 0;
            this.setClickPointsButtonOne(action);
            console.log('je menleve au bout de 8s')
        }, 2000);

    }

    removeClickPointsPicto() {
        clearTimeout(this._removeClickPointsPicto)
        this.UI.clickPoints.style.opacity = 0;
        setTimeout(() => {
            this.setClickPointsButtonOne(action);
        }, 1000);
    }

    setClickPointsButtonOne(action) {
        this._coordinates = this._getObjectCoordinatesByName("debut");
        this.UI.clickPointsOne.style.top = this._coordinates.y - 12.5 + "px"
        this.UI.clickPointsOne.style.left = this._coordinates.x - 12.5 + "px"
        this.UI.clickPointsOne.style.opacity = 0.6;

        this.UI.clickPointsOne.addEventListener('click', () => {
            this._glassCutOutObjectDisappear(["debut", "milieu1", "extrusion1", "extrusion2"]);
            this._glassCutOutObjectDisappear(["pinceGruger1"]);
            this._state.setSoundInteractionToPlay(soundsOnInteraction.pinceGruger1_url, true, false);
            this.UI.clickPointsOne.style.opacity = 0;
            this.setClickPointsButtonTwo(action);
        })

    }
    setClickPointsButtonTwo(action) {
        this._coordinates = this._getObjectCoordinatesByName("milieu3");
        this.UI.clickPointsTwo.style.top = this._coordinates.y + 2.5 + "px"
        this.UI.clickPointsTwo.style.left = this._coordinates.x + 2.5 + "px"
        this.UI.clickPointsTwo.style.opacity = 0.6;

        this.UI.clickPointsTwo.addEventListener('click', () => {
            this._glassCutOutObjectDisappear(["milieu2", "milieu3", "milieu4", "extrusion3", "extrusion4", "extrusion5", "extrusion6"]);
            this._glassCutOutObjectDisappear(["pinceGruger2"]);
            this._state.setSoundInteractionToPlay(soundsOnInteraction.pinceGruger2_url, true, false);
            this.UI.clickPointsTwo.style.opacity = 0;
            this.setClickPointsButtonThree(action);
        })

    }
    setClickPointsButtonThree(action) {
        this._coordinates = this._getObjectCoordinatesByName("fin");
        this.UI.clickPointsThree.style.top = this._coordinates.y - 12.5 + "px"
        this.UI.clickPointsThree.style.left = this._coordinates.x - 12.5 + "px"
        this.UI.clickPointsThree.style.opacity = 0.6;

        this.UI.clickPointsThree.addEventListener('click', () => {
            this._glassCutOutObjectDisappear(["fin", "milieu5", "extrusion7", "extrusion8"]);
            this._glassCutOutObjectDisappear(["pinceGruger3"]);
            setTimeout(() => {
                // this._glassCutOutObjectDisappear(["piece_principale"]);
                // this._glassCutOutObjectAppear(["drag"]);
            }, 2000);
            this._state.setSoundInteractionToPlay(soundsOnInteraction.pinceGruger3_url, true, false);
            this.UI.clickPointsThree.style.opacity = 0;
            action();
        })
    }


    setDragAndDropPicto(objectName) {
        this._coordinates = this._getObjectCoordinatesByName(objectName);
        this.UI.dragAndDrop.style.opacity = 1
        this.UI.dragAndDrop.style.top = this._coordinates.y + 80 + "px"
        this.UI.dragAndDrop.style.left = this._coordinates.x + 200 + "px"

        this._removeDragAndDropPicto = setTimeout(() => {
            this.UI.dragAndDrop.style.opacity = 0
        }, 8000);
    }

    removeDragAndDropPicto() {
        clearTimeout(this._removeDragAndDropPicto)
        this.UI.dragAndDrop.style.opacity = 0
    }

    setDragAndDropPictoEnd(objectName) {
        this._coordinates = this._getObjectCoordinatesByName(objectName);
        this.UI.dragAndDropEnd.style.opacity = 1
        this.UI.dragAndDropEnd.style.top = this._coordinates.y + 100 + "px"
        this.UI.dragAndDropEnd.style.left = this._coordinates.x + 180 + "px"

        this._removeDragAndDropPictoEnd = setTimeout(() => {
            this.UI.dragAndDropEnd.style.opacity = 0
        }, 8000);
    }

    removeDragAndDropPictoEnd() {
        clearTimeout(this._removeDragAndDropPictoEnd)
        this.UI.dragAndDropEnd.style.opacity = 0
    }

    setDragAndDropOutPicto(objectName) {
        this._coordinates = this._getObjectCoordinatesByName(objectName);
        this.UI.dragAndDropOut.style.opacity = 1
        this.UI.dragAndDropOut.style.top = this._coordinates.y + 100 + "px"
        this.UI.dragAndDropOut.style.left = this._coordinates.x - 100 + "px"

        this._removeDragAndDropPicto = setTimeout(() => {
            this.UI.dragAndDrop.style.opacity = 0
        }, 8000);
    }

    removeDragAndDropOutPicto() {
        clearTimeout(this._removeDragAndDropOutPicto)
        this.UI.dragAndDropOut.style.opacity = 0
    }

    setDragAndDropColorPickerPicto(objectName) {
        this._coordinates = this._getObjectCoordinatesByName(objectName);
        this.UI.dragAndDropColorPicker.style.opacity = 1
        this.UI.dragAndDropColorPicker.style.top = this._coordinates.y + 30 + "px"
        this.UI.dragAndDropColorPicker.style.left = 50 + "%"
        this._removeDragAndDropColorPickerPicto = setTimeout(() => {
            this.UI.dragAndDropColorPicker.style.opacity = 0
        }, 8000);
    }

    removeDragAndDropColorPickerPicto() {
        clearTimeout(this._removeDragAndDropColorPickerPicto)
        this.UI.dragAndDropColorPicker.style.opacity = 0
    }


    setPressionPicto(objectName) {
        this._coordinates = this._getObjectCoordinatesByName(objectName);
        this.UI.pression.style.opacity = 1
        this.UI.pression.style.top = this._coordinates.y + 60 + "px"
        this.UI.pression.style.left = this._coordinates.x + 60 + "px"

        this._removePressionPicto = setTimeout(() => {
            this.UI.pression.style.opacity = 0
            this._removePressureGaugePicto = setTimeout(() => {
                this.setPressureGauge();
            }, 1000);
        }, 4000);
    }

    removePressionPicto() {
        clearTimeout(this._removePressionPicto)
        clearTimeout(this._removePressureGaugePicto)
        this.UI.pression.style.opacity = 0;
        setTimeout(() => {
            this.setPressureGauge();
        }, 1000);
    }


    setScrollPicto(objectName) {
        this._coordinates = this._getObjectCoordinatesByName(objectName);
        this.UI.scroll.style.opacity = 1
        this.UI.scroll.style.top = 50 + "%"
        this.UI.scroll.style.left = 50 + "%"

        this._removeScrollPicto = setTimeout(() => {
            this.UI.scroll.style.opacity = 0
        }, 8000);
    }

    removeScrollPicto() {
        clearTimeout(this._removeScrollPicto)
        this.UI.scroll.style.opacity = 0
    }


    setTracePicto(objectName) {
        this._coordinates = this._getObjectCoordinatesByName(objectName);
        this.UI.trace.style.opacity = 1
        this.UI.trace.style.top = this._coordinates.y + 60 + "px"
        this.UI.trace.style.left = this._coordinates.x + 60 + "px"
        this._removeTracePicto = setTimeout(() => {
            this.UI.trace.style.opacity = 0
        }, 8000);
    }

    removeTracePicto() {
        clearTimeout(this._removeTracePicto)
        this.UI.trace.style.opacity = 0
    }

    setTracePictoFixe(objectName) {
        this._coordinates = this._getObjectCoordinatesByName(objectName);
        this.UI.traceFixe.style.opacity = 1
        this.UI.traceFixe.style.top = this._coordinates.y + "px"
        this.UI.traceFixe.style.left = this._coordinates.x + "px"
    }

    removeTraceFixePicto() {
        clearTimeout(this._removeTraceFixePicto)
        this.UI.traceFixe.style.opacity = 0
    }



    setPressureGauge() {
        this._coordinates = this._getObjectCoordinatesByName("piece1");
        this.UI.pressureGauge.style.opacity = 1
        this.UI.pressureGauge.style.top = this._coordinates.y - 40 + "px"
        this.UI.pressureGauge.style.left = this._coordinates.x - 40 + "px"
    }

    removePressureGauge() {
        this.UI.pressureGauge.style.opacity = 0;
        this.UI.pressureGaugeScale.style.opacity = 0;
    }

    setCursorDraggingDefault() {
        this.UI.cursorImg.setAttribute("src", "/assets/images/ui/pictos-ux/curseur_01.png");
        this.UI.cursorImg.style.top = "0px";
        this.UI.cursorImg.style.left = "0px";
    }
    setCursorDragging() {
        this.UI.cursorImg.setAttribute("src", "/assets/images/ui/pictos-ux/curseur_02.png");
    }

    setCursorCiseaux() {
        this.UI.cursorImg.setAttribute("src", "/assets/images/ui/cursor/outils/ciseaux.png");
    }

    setCursorCoupeVerre() {
        this.UI.cursorImg.setAttribute("src", "/assets/images/ui/cursor/outils/coupe_verre_1.png");
        this.UI.cursorImg.style.top = "8px";
        this.UI.cursorImg.style.left = "10px";
    }

    setCursorPinceDecrocher() {
        this.UI.cursorImg.setAttribute("src", "/assets/images/ui/cursor/outils/pince_decrocher_1.png");
    }

    setCursorPinceGruger() {
        this.UI.cursorImg.setAttribute("src", "/assets/images/ui/cursor/outils/pince_gruger_1.png");
    }

    removeCursor() {
        this.UI.cursorImg.setAttribute("src", "");
    }

}
export default UIManager;