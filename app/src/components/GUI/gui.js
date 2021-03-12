import { useEffect } from "react";

const GUI = (props) => {

    useEffect(() => {
        const dat = require('dat.gui');
        const gui = new dat.GUI();

        function tick() {
            console.log(props.parameters);

            if (props.parameters != null || undefined) {
                props.parameters.map((elm) => {
                    console.log(elm)
                    elm.addColor ?
                        gui.addColor(elm.element, 'color').onChange(elm.target.material.color.set(elm.color)) :
                        gui.add(elm.element, elm.property).max(elm.max).min(elm.min).step(elm.step);
                })
            }
        }
        setTimeout(tick, 1000);
        // return () => clearInterval(id);

    }, []);

    return (
        <>
        </>
    );
}

export default GUI;