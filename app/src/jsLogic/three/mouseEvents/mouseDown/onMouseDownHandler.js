import { _paperCutOutMouseDown } from '@jsLogic/three/raycast/step1/raycastStepOne';
import { _colorPickerMouseDown } from '@jsLogic/three/raycast/step2/raycastStepTwo';
import { _glassCutOutMouseDown } from '@jsLogic/three/raycast/step3/subStep2/raycastStepThree2';
import { _glassCutOutPressureGaugeMouseDown } from '@jsLogic/three/raycast/step3/subStep4/raycastStepThree4';
import { _glassCutOutPinceAGrugerMouseDown } from '@jsLogic/three/raycast/step3/subStep5/raycastStepThree5';


export const _mousePointerDownHandler = (_isMouseDown, _stepManager, _currentIntersect, _colorPicked, _isRunningDecoupeTrace) => {
    _isMouseDown = true;
    let _globalStep = _stepManager._globalStep;
    let _subStep = _stepManager._subStep;

    if (_globalStep === 0) {

        _paperCutOutMouseDown();

    } else if (_globalStep === 1) {

        _colorPickerMouseDown(_currentIntersect, _colorPicked);

    } else if (_globalStep === 2) {

        switch (_subStep) {

            case 0:
                // console.log("sous-étape 1: drag and drop patron sur bout de verre");
                break;
            case 1:
                // console.log("sous-étape 2: découpe du verre");
                _glassCutOutMouseDown(_currentIntersect, _isRunningDecoupeTrace);
                break;
            case 2:
                // console.log("sous-étape 3: drag and drop pour enlever le bout de papier");
                break;
            case 3:
                // console.log("sous-étape 4: Jauge de pression pour casser le bout de verre");
                _glassCutOutPressureGaugeMouseDown();
                break;
            case 4:
                // console.log("sous-étape 5: cassage des derniers petits bout de verre");
                _glassCutOutPinceAGrugerMouseDown();
                break;
            case 5:
                // console.log("sous-étape 5: drag and drop au milieu du vitrail fini");
                break;
        }

    }

}