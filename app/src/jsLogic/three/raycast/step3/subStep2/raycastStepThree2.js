export const _glassCutOut = (intersect, _currentIntersect, _piece_decoupeeObjects, _isRunningDecoupeTrace) => {
    if (intersect) {
        let _object = intersect.object;
        if (_currentIntersect) {
            //C'est ce qui se passe quand on vient de rentrer dans l'object
            // console.log('mouse enter';
            if(!_piece_decoupeeObjects.includes(_currentIntersect.name) && _isRunningDecoupeTrace === true) {
                console.log("Vous avez raté ! Mince alors !");
                _isRunningDecoupeTrace = false;
            }
        }

        _currentIntersect = _object;
    }
    else {
        if (_currentIntersect) {
            //Si on était sur un objet que l'on vient de quitter
            // console.log('mouse leave')
        }

        _currentIntersect = null
    }
}

export const _glassCutOutMouseDown = (_currentIntersect, _isRunningDecoupeTrace) => {
    if (_currentIntersect) {
        switch (_currentIntersect.name) {
            case "debut":
                console.log('je suis le début')
                _isRunningDecoupeTrace = true;
                break
        }
    }
}

export const _glassCutOutMouseUp = (_currentIntersect, _isRunningDecoupeTrace) => {
    if (_currentIntersect && _isRunningDecoupeTrace === true) {
        switch (_currentIntersect.name) {
            case "fin":
                console.log("je suis la fin")
                _isRunningDecoupeTrace = false;
                //Etape validé du coup actionstepmanager
                break
            default:
                _isRunningDecoupeTrace = false;
                console.log("perdu!")
        }
    }
}