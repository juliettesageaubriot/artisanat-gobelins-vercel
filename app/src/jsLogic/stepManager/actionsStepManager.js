//utils
import bindAll from '@jsLogic/utils/bindAll';

class ActionsStepManager {
    constructor(state, stepManager, UIManager, breadCrumb, setCameraAnimation, toggleArtisane, toggleDragAndDropControls) {
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
          33: () => this._stepThirtyFour()
        };
        
        return actions[action]();
      }

    _setCurrentSubtitle(index) {
        this._state.setNextSubtitle(index);
    }

    _stepOne() {
        this._setCurrentSubtitle(0);
    }
    _stepTwo() {
        this._setCurrentSubtitle(1);
    }
    _stepThree() {
        this._setCameraAnimation(0, 3);
    }
    _stepFour() {
        //A Appeler à la fin de l'animation de la caméra dans le animation manager
        this._setCurrentSubtitle(2);
    }
    _stepFive() {
        this._setCurrentSubtitle(3);
    }
    _stepSix() {
        this._setCurrentSubtitle(4);
    }
    _stepSeven() {
        this._UIManager.setScrollPicto(50, 50);
        this._allowedScroll = true;
        this._state.setNewToolsArray(1);
        this._toggleArtisane(1);
        this._toggleArtisane(0);
    }
    _stepHeight() {
        //A appeler sur la fin de l'interaction du scroll
       this._state.setCurrentValidationStep(0);
       this._allowedScroll = false;
    }
    _stepNine() {
        //A appeler au click sur le currentValidationStep n°1
        this._setCurrentSubtitle(5);
        this._setCameraAnimation(1, "none");
        this._stepManager.addGlobalStep();
        this._breadCrumb.changeNameAtelier("Choix des couleurs");
    }
    _stepTen() {
        //Sur la fin du sous titre 5
        this._setCameraAnimation(1, 10);
    }
    _stepEleven() {
        //Sur la fin de l'animation de la caméra 3 dans le animation manager
       this._setCurrentSubtitle(6);
    }
    _stepTwelve() {
       this._setCurrentSubtitle(7);
    }
    _stepThirteen() {
        this._setCurrentSubtitle(8);
    }
    _stepFourteen() {
        this._UIManager.setDragAndDropPicto(50, 50);
       this._allowedDragAndDrop = true;
       this._toggleDragAndDrop();
       this._state.setNewToolsArray(2);
    }
    _stepFifteen() {
        //A Appeler sur la fin du drag and drop
        this._state.setCurrentValidationStep(1);
        this._allowedDragAndDrop = false;
        this._toggleDragAndDrop();
    }
    _stepSixteen() {
        //A appeler sur le clique de la validation 1
        this._setCurrentSubtitle(9);
        this._setCameraAnimation(3, "none");
        this._breadCrumb.changeNameAtelier("La découpe du verre");
    }
    _stepSeventeen() {
        //Sur la fin du sous titre 9
        this._setCameraAnimation(4, 17);
    }
    _stepHeighteen() {
        this._setCurrentSubtitle(10);
    }
    _stepNineteen() {
        this._setCurrentSubtitle(11);
    }
    _stepTwenty() {
        this._UIManager.setDragAndDropPicto(50, 50);
        this._allowedDragAndDrop = true;
        this._toggleDragAndDrop();
        this._state.setNewToolsArray(3);
    }
    _stepTwentyOne() {
         //A appeler sur le succes du drag and drop
         this._setCurrentSubtitle(12);
         this._allowedDragAndDrop = false;
         this._toggleDragAndDrop();
    }
    _stepTwentyTwo() {
        this._setCurrentSubtitle(13);
    }
    _stepTwentyThree() {
        this._UIManager.setTracePicto(50, 50);
        this._allowedDrawTheLine = true;
        this._stepManager.addSubStep();
    }
    _stepTwentyFour() {
        // A appeler sur le success du tracé de ligne
        this._UIManager.setDragAndDropPicto(50, 50);
        this._allowedDrawTheLine = false;
        this._allowedDragAndDrop = true;
        this._toggleDragAndDrop();
        this._stepManager.addSubStep();
    }
    _stepTwentyFive() {
        //A appeler sur le success du drag and drop
        this._setCurrentSubtitle(14);
        this._allowedDragAndDrop = false;
        this._toggleDragAndDrop();
    }
    _stepTwentySix() {
        this._UIManager.setPressionPicto(50, 50);
        this._allowedPressureGauge = true;
        this._stepManager.addSubStep();
    }
    _stepTwentySeven() {
         //A appeler sur le success de la jauge de pression
         this._setCurrentSubtitle(15);
         this._allowedPressureGauge = false;
    }
    _stepTwentyHeight() {
        this._UIManager.setClickPointsPicto(50, 50);
        this._allowedCassageDeVerre = true;
        this._stepManager.addSubStep();
    }
    _stepTwentyNine() {
         //Apparition du vitrail
        //Sur le succes du cassage de verre
        this._allowedCassageDeVerre = false;
    }
    _stepThirty() {
        //Apres l'apparition du vitrail
        this._setCurrentSubtitle(16);
    }
    _stepThirtyOne() {
        this._UIManager.setDragAndDropPicto(50, 50);
        this._allowedDragAndDrop = true;
        this._toggleDragAndDrop();
        this._stepManager.addSubStep();
    }
    _stepThirtyTwo() {
        //sur le success du drag and drop
        this.setCurrentValidationStep(2);
        this._toggleDragAndDrop();
    }
    _stepThirtyThree() {
        this._setCurrentSubtitle(17);
        //On voit le vitrail fini
    }
    _stepThirtyFour() {
        this._setCurrentSubtitle(18);
        //Mise en situation dans le bar
        //this._setCameraAnimation(4);
    }
}

export default ActionsStepManager;