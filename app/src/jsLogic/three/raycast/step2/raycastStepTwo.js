export const _colorPickerHandler = (intersect, _currentIntersect, _isMouseDown, _colorPicked, _vitrailObjects) => {
    //On pourrait également utiliser cette technique
    // this._globalStep = this._stepManager._globalStep;
    // this._subStep = this._stepManager._subStep;

    // if(this._globalStep !== 1) return
    if (intersect) {
        let _object = intersect.object;
        //console.log(this._object);
        if (_currentIntersect) {
            if (_isMouseDown === true) {
                _currentIntersect.material.color = _colorPicked.old;
            }
        }
        _currentIntersect = _object;
        // console.log('mouse enter')
        _colorPicked.old = _currentIntersect.material.color;
        if (_isMouseDown === true && _vitrailObjects.includes(_currentIntersect.name)) {
            _currentIntersect.material.color = _colorPicked.current;
        }
    }
    else {
        if (_currentIntersect) {
            //   console.log('mouse leave')
            if (_isMouseDown === true) {
                _currentIntersect.material.color = _colorPicked.old;
            }
            _colorPicked.old = null;
            // console.log(currentIntersect.name);

        }

        _currentIntersect = null
    }
}

export const _colorPickerMouseDown = (_currentIntersect, _colorPicked) => {
    if (_currentIntersect) {
        switch (_currentIntersect.name) {
            case "green":
                _colorPicked.current = _currentIntersect.material.color;
                //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "green");
                //   cursorColorPickerInner.current.style.transform = "scale(1.5)"
                break
            case "purple":
                _colorPicked.current = _currentIntersect.material.color;
                //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "purple");
                //   cursorColorPickerInner.current.style.transform = "scale(1.5)"
                break
            case "white":
                _colorPicked.current = _currentIntersect.material.color;
                //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "white");
                //   cursorColorPickerInner.current.style.transform = "scale(1.5)"
                break
        }
    }
}


export const _colorPickerMouseUp = (_currentIntersect, _colorPicked, _vitrailObjects) => {
    if (_currentIntersect) {
        if (_vitrailObjects.includes(_currentIntersect.name)) {
            _currentIntersect.material.color = _colorPicked.current;
        }
        _colorPicked.current = null;
        //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "default");
        //   cursorColorPickerInner.current.style.transform = "scale(.8)"
    } else {
        _colorPicked.current = null;
        //   cursorColorPickerInner.current.setAttribute("data-color-cursor", "default");
        //   cursorColorPickerInner.current.style.transform = "scale(.8)"
    }
}