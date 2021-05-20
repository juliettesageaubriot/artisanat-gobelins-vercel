//utils
import bindAll from '@jsLogic/utils/bindAll';

class ActionsStepManager {
    constructor(state, stepManager, UIManager, breadCrumb, setCameraAnimation, toggleArtisane, toggleDragAndDropControls, setfeuilleLeveAnimationPlay, setDragAndDropControls, outlinePass, setOutlineObjects, addPieceDecoupeToScene) {
        // bindAll(
        //     this,
        // );
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
        this._setOutlineObjects = setOutlineObjects;
        this._addPieceDecoupeToScene = addPieceDecoupeToScene

        //Les débloquage d'interactions
        this._allowedScroll = false;
        this._allowedDragAndDrop = false;
        this._allowedDrawTheLine = false;
        this._allowedPressureGauge = false;
        this._allowedCassageDeVerre = false;

        //curretnSubtitle
        this._currentSubtitle = 1;
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

    // _setCurrentToolsArray(index) {
    //     this._state.setToolsArray1();
    // }

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
        //feuilleAnimator
        console.log("Animation des feuilles")
        this._setfeuilleLeveAnimationPlay(4);
    }
    _stepFive() {
        //A Appeler à la fin de l'animation de la caméra dans le animation manager
        this._setCurrentSubtitle(2);
    }
    _stepSix() {
        this._setCurrentSubtitle(3);
    }
    _stepSeven() {
        this._setCurrentSubtitle(4);
    }
    _stepHeight() {
        this._UIManager.setScrollPicto("feuille");
        this._allowedScroll = true;
        this._state.setToolsArray1();
        this._toggleArtisane("artisane01");
        this._toggleArtisane("artisane02");
    }
    _stepNine() {
        //A appeler sur la fin de l'interaction du scroll
       this._UIManager.removeScrollPicto();
       this._state.setStepValidation(0);
       this._allowedScroll = false;
    }
    _stepTen() {
        //A appeler au click sur le currentValidationStep n°1
        this._setCurrentSubtitle(5);
        console.log("seconde animation de caméra")
        this._setCameraAnimation(1, "none");
        this._breadCrumb.changeNameAtelier("Choix des couleurs");
        this._breadCrumb.breadcrumbStep(2)
    }
    _stepEleven() {
        //Sur la fin du sous titre 5
        console.log("troisieme animation de camera")
        this._setCameraAnimation(2, 11);
    }
    _stepTwelve() {
        //Sur la fin de l'animation de la caméra 3 dans le animation manager
       this._setCurrentSubtitle(6);
       //Changer les actions du 14eme vers ici
       this._stepManager.addGlobalStep();
        this._outlinePass.enabled = true;
        setTimeout(() => {
            this._UIManager.setDragAndDropColorPickerPicto("verreBleu02A");
        }, 1000);
       this._allowedDragAndDrop = true;
    //    this._state.setToolsArray2();
    //    this._UIManager.UI.cursor.classList.toggle("cursor-pointer-color-picker");
    }
    _stepThirteen() {
       this._setCurrentSubtitle(7);
    }
    _stepFourteen() {
        this._setCurrentSubtitle(8);
    }
    _stepFifteen() {
       //Laisser ici
       this._UIManager.UI.colorPickerCta.style.opacity = 1;
       this._addPieceDecoupeToScene();
    }
    _stepSixteen() {
        //A Appeler sur la fin du drag and drop
        this._UIManager.removeDragAndDropPicto();
        this._state.setStepValidation(1);
        this._allowedDragAndDrop = false;
        // this.UI.html.style.cursor = "initial";
        // this._UIManager.UI.cursor.classList.toggle("cursor-pointer-color-picker");
        this._toggleArtisane("artisane02");
        this._toggleArtisane("artisane03");
    }
    _stepSeventeen() {
        //A appeler sur le clique de la validation 1
        this._UIManager.UI.colorPickerCta.style.opacity = 0;
        this._setCurrentSubtitle(9);
        this._setCameraAnimation(3, "none");
        this._breadCrumb.changeNameAtelier("La découpe du verre");
        this._stepManager.addGlobalStep();
    }
    _stepHeighteen() {
        //Sur la fin du sous titre 9
        this._setCameraAnimation(4, 18);
    }
    _stepNineteen() {
        this._setCurrentSubtitle(10);
    }
    _stepTwenty() {
        this._setCurrentSubtitle(11);
    }
    _stepTwentyOne() {
        this._UIManager.setDragAndDropPicto("papier_decoupe");
        this._setOutlineObjects("papier_decoupe");
        this._outlinePass.enabled = true;
        this._allowedDragAndDrop = true;
        this._setDragAndDropControls();
        this._state.setToolsArray3();
    }
    _stepTwentyTwo() {
         //A appeler sur le succes du drag and drop
         this._UIManager.removeDragAndDropPicto();
         this._setCurrentSubtitle(12);
         this._allowedDragAndDrop = false;
         this._toggleDragAndDrop();    
    }
    _stepTwentyThree() {
        this._setCurrentSubtitle(13);
    }
    _stepTwentyFour() {
        this._stepManager.addSubStep();
        setTimeout(() => {
            this._UIManager.setTracePicto("piece1");
            this._UIManager.setTracePictoFixe("milieu3");
        }, 1000);
        
        this._allowedDrawTheLine = true;
    }
    _stepTwentyFive() {
        // A appeler sur le success du tracé de ligne
        this._UIManager.removeTracePicto();
        this._UIManager.removeTraceFixePicto();
        this._UIManager.setDragAndDropPicto("papier_decoupe");
        this._allowedDrawTheLine = false;
        this._allowedDragAndDrop = true;
        this._toggleDragAndDrop();
        this._stepManager.addSubStep();
    }
    _stepTwentySix() {
        //A appeler sur le success du drag and drop
        this._UIManager.removeDragAndDropPicto();
        this._setCurrentSubtitle(14);
        this._allowedDragAndDrop = false;
        this._toggleDragAndDrop();
    }
    _stepTwentySeven() {
        setTimeout(() => {
            this._UIManager.setPressionPicto("piece1");
        }, 1000);
        this._stepManager.addSubStep();
        this._allowedPressureGauge = true;
    }
    _stepTwentyHeight() {
         //A appeler sur le success de la jauge de pression
        //  this._UIManager.removePressionPicto();
        this._UIManager.removePressureGauge();
         this._setCurrentSubtitle(15);
         this._allowedPressureGauge = false;
         this._stepManager.addSubStep();
    }
    _stepTwentyNine() {
        this._UIManager.setClickPointsPicto("piece1", () => this.actionsManager(29));
        this._allowedCassageDeVerre = true;
    }
    _stepThirty() {
         //Apparition du vitrail
        //Sur le succes du cassage de verre
        this._allowedCassageDeVerre = false;
        this._stepManager.addSubStep();
        this._setCameraAnimation(5, 30);
    }
    _stepThirtyOne() {
        //Apres l'apparition du vitrail
        this._setCurrentSubtitle(16);
    }
    _stepThirtyTwo() {
        this._UIManager.setDragAndDropPicto("papier_decoupe");
        this._allowedDragAndDrop = true;
        this._toggleDragAndDrop();
    }
    _stepThirtyThree() {
        //sur le success du drag and drop
        this._UIManager.removeDragAndDropPicto();
        this.setStepValidation(2);
        this._toggleDragAndDrop();
        this._stepManager.addSubStep();
    }
    _stepThirtyFour() {
        this._setCurrentSubtitle(17);
        //On voit le vitrail fini
    }
    _stepThirtyFive() {
        this._setCurrentSubtitle(18);
        //Mise en situation dans le bar
        //this._setCameraAnimation(4);
    }
}

export default ActionsStepManager;