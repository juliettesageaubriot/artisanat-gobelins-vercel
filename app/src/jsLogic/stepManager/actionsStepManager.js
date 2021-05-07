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
          32: () => this._stepThirtyThree()
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
        //A Appeler à la fin de l'animation de la caméra dans le animation manager
        this._setCurrentSubtitle(2);
    }
    _stepFour() {
        this._setCurrentSubtitle(3);
    }
    _stepFive() {
        this._setCurrentSubtitle(4);
    }
    _stepSix() {
        this._UIManager.setScrollPicto(50, 50);
        this._allowedScroll = true;
        this._state.setNewToolsArray(1);
        this._toggleArtisane(1);
        this._toggleArtisane(0);
    }
    _stepSeven() {
        //A appeler sur la fin de l'interaction du scroll
       this._state.setCurrentValidationStep(0);
       this._allowedScroll = false;
    }
    _stepHeight() {
        //A appeler au click sur le currentValidationStep n°1
        this._setCurrentSubtitle(5);
        this.setCameraAnimation(1);
        this._stepManager.addGlobalStep();
        this._breadCrumb.changeNameAtelier("Choix des couleurs");
    }
    _stepNine() {
        //Sur la fin du sous titre 5
        this.setCameraAnimation(2);
    }
    _stepTen() {
        //Sur la fin de l'animation de la caméra 3 dans le animation manager
       this._setCurrentSubtitle(6);
    }
    _stepEleven() {
       this._setCurrentSubtitle(7);
    }
    _stepTwelve() {
       this._setCurrentSubtitle(8);
    }
    _stepThirteen() {
       this._UIManager.setDragAndDropPicto(50, 50);
       this._allowedDragAndDrop = true;
       this._toggleDragAndDrop();
       this._state.setNewToolsArray(2);
    }
    _stepFourteen() {
        //A Appeler sur la fin du drag and drop
        this._state.setCurrentValidationStep(1);
        this._allowedDragAndDrop = false;
        this._toggleDragAndDrop();
    }
    _stepFifteen() {
        //A appeler sur le clique de la validation 1
        this._setCurrentSubtitle(9);
        this.setCameraAnimation(3);
        this._breadCrumb.changeNameAtelier("La découpe du verre");
    }
    _stepSixteen() {
        //Sur la fin du sous titre 9
        this.setCameraAnimation(4);
    }
    _stepSeventeen() {
        // A appeler à la fin de l'animation 5 animation manager
        this._setCurrentSubtitle(10);
    }
    _stepHeighteen() {
        this._setCurrentSubtitle(11);
    }
    _stepNineteen() {
        this._UIManager.setDragAndDropPicto(50, 50);
        this._allowedDragAndDrop = true;
        this._toggleDragAndDrop();
        this._state.setNewToolsArray(3);
    }
    _stepTwenty() {
        //A appeler sur le succes du drag and drop
        this._setCurrentSubtitle(12);
        this._allowedDragAndDrop = false;
        this._toggleDragAndDrop();
    }
    _stepTwentyOne() {
        this._setCurrentSubtitle(13);
    }
    _stepTwentyTwo() {
        this._UIManager.setTracePicto(50, 50);
        this._allowedDrawTheLine = true;
        this._stepManager.addSubStep();
    }
    _stepTwentyThree() {
        // A appeler sur le success du tracé de ligne
        this._UIManager.setDragAndDropPicto(50, 50);
        this._allowedDrawTheLine = false;
        this._allowedDragAndDrop = true;
        this._toggleDragAndDrop();
        this._stepManager.addSubStep();
    }
    _stepTwentyFour() {
        //A appeler sur le success du drag and drop
        this._setCurrentSubtitle(14);
        this._allowedDragAndDrop = false;
        this._toggleDragAndDrop();
    }
    _stepTwentyFive() {
        this._UIManager.setPressionPicto(50, 50);
        this._allowedPressureGauge = true;
        this._stepManager.addSubStep();
    }
    _stepTwentySix() {
        //A appeler sur le success de la jauge de pression
        this._setCurrentSubtitle(15);
        this._allowedPressureGauge = false;
    }
    _stepTwentySeven() {
        this._UIManager.setClickPointsPicto(50, 50);
        this._allowedCassageDeVerre = true;
        this._stepManager.addSubStep();
    }
    _stepTwentyHeight() {
        //Apparition du vitrail
        //Sur le succes du cassage de verre
        this._allowedCassageDeVerre = false;
    }
    _stepTwentyNine() {
        //Apres l'apparition du vitrail
        this._setCurrentSubtitle(16);
    }
    _stepThirty() {
        this._UIManager.setDragAndDropPicto(50, 50);
        this._allowedDragAndDrop = true;
        this._toggleDragAndDrop();
        this._stepManager.addSubStep();
    }
    _stepThirtyOne() {
        //sur le success du drag and drop
        this.setCurrentValidationStep(2);
        this._toggleDragAndDrop();
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