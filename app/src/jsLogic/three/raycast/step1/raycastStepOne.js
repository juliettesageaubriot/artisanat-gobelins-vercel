export const _paperCutOutScrollAnimHandler = (intersect) => {
    if (intersect) {
        let _object = intersect.object;
        console.log(_object);
    }
    else {

    }
}

export const _paperCutOutMouseDown = () => {
    console.log("paper cut out mousedown");
}

export const _paperCutOutMouseUp = () => {
    console.log("paper cut out mouseup");
}