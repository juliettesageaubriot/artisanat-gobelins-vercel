//utils
import toolsData from '@assets/data/tools.json';

//datas
import { soundsOnInteraction } from "@jsLogic/utils/sounds.js";

class ActionsStepManager {
    constructor(state, stepManager, UIManager, breadCrumb, setCameraAnimation, toggleArtisane, toggleDragAndDropControls, setfeuilleLeveAnimationPlay, setDragAndDropControls, outlinePass, toolsManager, setOutlineObjects, addPieceDecoupeToScene, animationToDragPosition, setFinalColors) {
        this._state = state;
        this._stepManager = stepManager;
        this._UIManager = UIManager;
        this._breadCrumb = breadCrumb;
        this._setCameraAnimation = setCameraAnimation;
        this._toggleArtisane = toggleArtisane;
        this._toggleDragAndDrop = toggleDragAndDropControls;
        this._setfeuilleLeveAnimationPlay = setfeuilleLeveAnimationPlay;
        this._setDragAndDropControls = setDragAndDropControls;
        this._outlinePass = outlinePass;
        this._toolsManager = toolsManager;
        this._setOutlineObjects = setOutlineObjects;
        this._addPieceDecoupeToScene = addPieceDecoupeToScene;
        this._animationToDragPosition = animationToDragPosition;
        this._setFinalColors = setFinalColors;


        //Les débloquage d'interactions
        this._allowedScroll = false;
    }

    actionsManager(action) {
        if (typeof action === "string") return;

        const actions = {
            0: () => this._stepOne(),
            1: () => this._stepTwo(),
            2: () => this._stepThree(),
            3: () => this._stepFour(),
            4: () => this._stepFive(),
            5: () => this._stepSix(),
            6: () => this._stepSeven(),
            7: () => this._stepHeight(),
            8: () => this._stepNine(),
            9: () => this._stepTen(),
            10: () => this._stepEleven(),
            11: () => this._stepTwelve(),
            12: () => this._stepThirteen(),
            13: () => this._stepFourteen(),
            14: () => this._stepFifteen(),
            15: () => this._stepSixteen(),
            16: () => this._stepSeventeen(),
            17: () => this._stepHeighteen(),
            18: () => this._stepNineteen(),
            19: () => this._stepTwenty(),
            20: () => this._stepTwentyOne(),
            21: () => this._stepTwentyTwo(),
            22: () => this._stepTwentyThree(),
            23: () => this._stepTwentyFour(),
            24: () => this._stepTwentyFive(),
            25: () => this._stepTwentySix(),
            26: () => this._stepTwentySeven(),
            27: () => this._stepTwentyHeight(),
            28: () => this._stepTwentyNine(),
            29: () => this._stepThirty(),
            30: () => this._stepThirtyOne(),
            31: () => this._stepThirtyTwo(),
            32: () => this._stepThirtyThree(),
            33: () => this._stepThirtyFour(),
            34: () => this._stepThirtyFive(),
        };

        return actions[action]();
    }

    _setCurrentSubtitle(index) {
        this._state.setNextSubtitle(index);
    }

    _stepOne() {
        this._setCurrentSubtitle(0);
        this._breadCrumb.breadcrumbStep(1)
    }
    _stepTwo() {
        this._setCurrentSubtitle(1);
    }
    _stepThree() {
        this._setCameraAnimation(0, 3);
    }
    _stepFour() {
        this._setfeuilleLeveAnimationPlay(4);
        this._state.setToolsArray(toolsData.toolsArray0)
        this._toolsManager.setTools(true)
        this._toolsManager.currentTools(0, 1)

    }
    _stepFive() {
        this._setCurrentSubtitle(2);
    }
    _stepSix() {
        this._setCurrentSubtitle(3);
    }
    _stepSeven() {
        this._setCurrentSubtitle(4);
    }
    _stepHeight() {
        this._UIManager.setCursorCiseaux();
        this._UIManager.UI.html.style.cursor = "none";
        this._UIManager.setScrollPicto("chute04a");
        this._allowedScroll = true;
        this._toggleArtisane("artisane01");
        this._toggleArtisane("artisane02");
    }
    _stepNine() {
        this._UIManager.removeCursor();
        this._UIManager.UI.html.style.cursor = "initial";
        this._UIManager.removeScrollPicto();
        this._state.setStepValidation(0);
        this._allowedScroll = false;
        this._toolsManager.setTools(false)
    }
    _stepTen() {
        this._setCurrentSubtitle(5);
        this._setCameraAnimation(1, "none");
        this._breadCrumb.changeNameAtelier("Choix des couleurs");
        this._breadCrumb.breadcrumbStep(2)
    }
    _stepEleven() {
        this._setCameraAnimation(2, 11);
    }
    _stepTwelve() {
        this._setCurrentSubtitle(6);
        this._UIManager.setCursorDraggingDefault();
        this._UIManager.UI.html.style.cursor = "none"
        this._stepManager.addGlobalStep();
        this._outlinePass.enabled = true;
        this._UIManager.setDragAndDropColorPickerPicto("verreBleu02A");
        this._setFinalColors();
        // this._addPieceDecoupeToScene();
    }
    _stepThirteen() {
        this._setCurrentSubtitle(7);
    }
    _stepFourteen() {
        this._setCurrentSubtitle(8);
    }
    _stepFifteen() {
        this._UIManager.UI.colorPickerCta.style.opacity = 1;
        this._UIManager.UI.colorPickerCta.style.pointerEvents = "all"
    }
    _stepSixteen() {
    }
    _stepSeventeen() {
        this._setCurrentSubtitle(9);
        this._setCameraAnimation(3, "none");

        this._breadCrumb.changeNameAtelier("La découpe du verre");
        this._breadCrumb.breadcrumbStep(3)
        this._stepManager.addGlobalStep();

        this._UIManager.removeDragAndDropPicto();
        this._UIManager.removeCursor();
        this._UIManager.UI.html.style.cursor = "initial";
        this._UIManager.UI.colorPickerCta.style.opacity = 0;
        this._UIManager.UI.colorPickerCta.style.pointerEvents = "none";

        this._state.setSoundInteractionToPlay(soundsOnInteraction.crayonnes_url, false, false);

        this._toggleArtisane("artisane02");
        this._toggleArtisane("artisane03");
    }
    _stepHeighteen() {
        this._setCameraAnimation(4, 18);
    }
    _stepNineteen() {
        this._setCurrentSubtitle(10);
    }
    _stepTwenty() {
        this._setCurrentSubtitle(11);
    }
    _stepTwentyOne() {
        //Drag and drop in papier
        this._UIManager.setDragAndDropPicto("papier_decoupe");
        this._setOutlineObjects("papier_decoupe");

        this._outlinePass.enabled = true;
        this._setDragAndDropControls();

        this._UIManager.setCursorDraggingDefault();
        this._UIManager.UI.html.style.cursor = "none";
    }
    _stepTwentyTwo() {
        //Fin drag and drop in papier
        this._UIManager.removeDragAndDropPicto();
        this._setCurrentSubtitle(12);
        this._toggleDragAndDrop();

        this._UIManager.removeCursor();
        this._UIManager.UI.html.style.cursor = "initial";
    }
    _stepTwentyThree() {
        this._setCurrentSubtitle(13);
    }
    _stepTwentyFour() {
        //Découpe du verre
        this._stepManager.addSubStep();
        this._state.setToolsArray(toolsData.toolsArray1)
        this._toolsManager.currentTools(1, 1)
        this._toolsManager.setTools(true);

        this._UIManager.setTracePicto("piece1");
        this._UIManager.setTracePictoFixe("milieu3");
        this._UIManager.setCursorCoupeVerre();
        this._UIManager.UI.html.style.cursor = "none"

    }
    _stepTwentyFive() {
        //Fin découpe du verre
        //Drag and drop out papier
        this._UIManager.removeTracePicto();
        this._UIManager.removeTraceFixePicto();
        this._UIManager.setDragAndDropOutPicto("papier_decoupe");
        this._state.setSoundInteractionToPlay(soundsOnInteraction.coupeVerre3_url, false, false);
        this._state.setSoundInteractionToPlay(soundsOnInteraction.coupeVerre2_url, false, false);

        this._UIManager.setCursorDraggingDefault();
        this._toggleDragAndDrop();
        this._stepManager.addSubStep();
    }
    _stepTwentySix() {
        //Fin drag and drop out papier
        this._UIManager.removeDragAndDropOutPicto();
        this._toolsManager.currentTools(1, 2)
        this._setCurrentSubtitle(14);
        this._toggleDragAndDrop();
    }
    _stepTwentySeven() {
        //Jauge de pression
        this._UIManager.setCursorPinceDecrocher();
        this._UIManager.UI.html.style.cursor = "none";
        setTimeout(() => {
            this._UIManager.setPressionPicto("piece1");
        }, 1000);
        this._stepManager.addSubStep();
    }
    _stepTwentyHeight() {
        //Fin jauge de pression
        this._toolsManager.currentTools(1, 3)
        this._UIManager.removePressureGauge();
        this._setCurrentSubtitle(15);
        this._stepManager.addSubStep();
        this._UIManager.UI.pressureGaugeScale.style.transform = `translate(-50%, -50%) scale(0)`;
    }
    _stepTwentyNine() {
        //Pince à gruger
        this._UIManager.setClickPointsPicto("piece1", () => this.actionsManager(29));
        this._UIManager.setCursorPinceGruger();
    }
    _stepThirty() {
        //Fin pince à gruger
        this._state.setSoundInteractionToPlay(soundsOnInteraction.pinceGruger3_url, false, false);
        this._toolsManager.setTools(false);
        this._UIManager.removeCursor();
        this._UIManager.UI.html.style.cursor = "initial";
        this._stepManager.addSubStep();
        this._setCameraAnimation(5, 30);
        this._animationToDragPosition();
    }
    _stepThirtyOne() {
        //Vitrail de Fin  
        this._setCurrentSubtitle(16);
    }
    _stepThirtyTwo() {
        //Drag and drop in vitrail fin
        this._setOutlineObjects("piece_principale");
        this._outlinePass.enabled = true;
        this._UIManager.setDragAndDropPictoEnd("piece_principale");
        this._UIManager.setCursorDraggingDefault();
        this._UIManager.UI.html.style.cursor = "none";
        this._setDragAndDropControls();
        this._toolsManager.setTools(false)
    }
    _stepThirtyThree() {
        //Fin drag and drop in vitrail fin
        this._UIManager.removeDragAndDropPictoEnd();
        // this.setStepValidation(2);
        this._toggleDragAndDrop();
        this._stepManager.addSubStep();
        this._UIManager.UI.html.style.cursor = "initial";
        this._UIManager.removeCursor();
    }
    _stepThirtyFour() {
        this._UIManager.removeDragAndDropPictoEnd();
        this._toggleDragAndDrop();
        this._stepManager.addSubStep();
        this._UIManager.UI.html.style.cursor = "initial";
        this._UIManager.removeCursor();
        this._breadCrumb.breadcrumbToggle();
        setTimeout(() => {
            this._state.setFonduAppear(true);
            this._state.fadeBackgroundAudios();
        }, 3000);
        //On voit le vitrail fini
    }
    _stepThirtyFive() {
        this._setCurrentSubtitle(18);
        //Mise en situation dans le bar
        //this._setCameraAnimation(4);
    }
}

export default ActionsStepManager;