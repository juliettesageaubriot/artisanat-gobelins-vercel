//utils
import bindAll from './bindAll.js';

class ActionsStepManager {
    constructor(state, stepManager, UIManager, breadCrumb, setCameraAnimation) {
        bindAll(
            this,
        );
        this._state = state;
        this._stepManager = stepManager;
        this._UIManager = UIManager;
        this._breadCrumb = breadCrumb;
        this._setCameraAnimation = setCameraAnimation;

        //Les débloquage d'interactions
        this._allowedScroll = false;
        this._allowedDragAndDrop = false;
        this._allowedDrawTheLine = false;
        this._allowedPressureGauge = false;
        this._allowedCassageDeVerre = false;
    }

    actionsManager(action) {
        const actions = {
          0: () => this._stepOne(),
          1: () => this._stepTwo(),
          2: () => this._stepThree(),
          3: () => this._stepFour(),
          4: () => this._stepFive(),
          5: () => this._stepFive(),
          6: () => this._stepSix(),
          7: () => this._stepSeven(),
          8: () => this._stepHeight(),
          9: () => this._stepNine(),
          10: () => this._stepTen(),
          11: () => this._stepEleven(),
          12: () => this._stepTwelve(),
          13: () => this._stepThirteen(),
          14: () => this._stepFourteen(),
          15: () => this._stepFifteen(),
          16: () => this._stepSixteen(),
          17: () => this._stepSeventeen(),
          18: () => this._stepHeighteen(),
          19: () => this._stepNineteen(),
          20: () => this._stepTwenty(),
          21: () => this._stepTwentyOne(),
          22: () => this._stepTwentyTwo(),
          23: () => this._stepTwentyThree(),
          24: () => this._stepTwentyFour(),
          25: () => this._stepTwentyFive(),
          26: () => this._stepTwentySix(),
          27: () => this._stepTwentySeven(),
          28: () => this._stepTwentyHeight(),
          29: () => this._stepTwentyNine(),
          30: () => this._stepThirty(),
          31: () => this._stepThirtyOne(),
          32: () => this._stepThirtyTwo(),
          33: () => this._stepThirtyThree(),
        };
        
        return actions[action]();
      }

    _setCurrentSubtitle(index) {
        this._state.setNextSubtitle(index);
    }

    _stepOne() {
        this._setCurrentSubtitle(1);
    }
    _stepTwo() {
        this.setCameraAnimation(0);
    }
    _stepThree() {
        this._setCurrentSubtitle(2);
    }
    _stepFour() {
        this._setCurrentSubtitle(3);
    }
    _stepFive() {
        this._setCurrentSubtitle(4);
    }
    _stepSix() {
       this._UIManager.setScrollPicto();
       this._allowedScroll = true;
       this._state.setNewToolsArray(1);
    }
    _stepSeven() {
       this._state.setCurrentValidationStep(0);
       this._allowedScroll = false;
    }
    _stepHeight() {
        this._setCurrentSubtitle(5);
        this.setCameraAnimation(1);
        this._stepManager.addGlobalStep();
        this._breadCrumb.changeNameAtelier("Choix des couleurs");
    }
    _stepNine() {
        this.setCameraAnimation(2);
    }
    _stepTen() {
       this._setCurrentSubtitle(6);
    }
    _stepEleven() {
       this._setCurrentSubtitle(7);
    }
    _stepTwelve() {
       this._setCurrentSubtitle(8);
    }
    _stepThirteen() {
       this._UIManager.setDragAndDropPicto();
       this._allowedDragAndDrop = true;
       this._state.setNewToolsArray(2);
    }
    _stepFourteen() {
        this._state.setCurrentValidationStep(0);
        this._allowedScroll = false;
    }
    _stepFifteen() {
        this._setCurrentSubtitle(9);
        this.setCameraAnimation(3);
        this._breadCrumb.changeNameAtelier("La découpe du verre");
    }
    _stepSixteen() {
        this.setCameraAnimation(4);
    }
    _stepSeventeen() {
        this._setCurrentSubtitle(10);
    }
    _stepHeighteen() {
        this._setCurrentSubtitle(11);
    }
    _stepNineteen() {
        this._UIManager.setDragAndDropPicto();
        this._allowedDragAndDrop = true;
        this._state.setNewToolsArray(3);
    }
    _stepTwenty() {
        this._setCurrentSubtitle(12);
        this._allowedDragAndDrop = false;
    }
    _stepTwentyOne() {
        this._setCurrentSubtitle(13);
    }
    _stepTwentyTwo() {
        this._UIManager.setDrawTheLinePicto();
        this._allowedDrawTheLine = true;
        this._stepManager.addSubStep();
    }
    _stepTwentyThree() {
        this._UIManager.setDragAndDropPicto();
        this._allowedDrawTheLine = false;
        this._allowedDragAndDrop = true;
        this._stepManager.addSubStep();
    }
    _stepTwentyFour() {
        this._setCurrentSubtitle(14);
        this._allowedDragAndDrop = false;
    }
    _stepTwentyFive() {
        this._UIManager.setPressureGaugePicto();
        this._allowedPressureGauge = true;
        this._stepManager.addSubStep();
    }
    _stepTwentySix() {
        this._setCurrentSubtitle(15);
        this._allowedPressureGauge = false;
    }
    _stepTwentySeven() {
        this._UIManager.setCassageDeVerrePicto();
        this._allowedCassageDeVerre = true;
        this._stepManager.addSubStep();
    }
    _stepTwentyHeight() {
        //Apparition du vitrail
        this._allowedCassageDeVerre = false;
    }
    _stepTwentyNine() {
        this._setCurrentSubtitle(16);
    }
    _stepThirty() {
        this._UIManager.setDragAndDropPicto();
        this._allowedDragAndDrop = true;
        this._stepManager.addSubStep();
    }
    _stepThirtyOne() {
        this.setCurrentValidationStep(2);
    }
    _stepThirtyTwo() {
        this._setCurrentSubtitle(17);
        //On voit le vitrail fini
    }
    _stepThirtyThree() {
        this._setCurrentSubtitle(18);
        //Mise en situation dans le bar
        //this.setCameraAnimation(4);
    }
}

export default ActionsStepManager;