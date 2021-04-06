import { useEffect } from "react";

const TheGui = (props) => {

    useEffect(() => {
        const dat = require('dat.gui');
        const gui = new dat.GUI();

        function tick() {
            console.log("props", props.parameters);

            if (props.parameters != null || undefined) {

                if(false || undefined || null !== props.parameters[0].orbitControls) {
                    gui.add(props.parameters, `${props.parameters[0].orbitControls}`)
                }

                props.parameters.map((elm) => {
                    console.log('elm', elm)
                        // gui.add(elm.element, elm.property).max(elm.max).min(elm.min).step(elm.step).name(elm.name);
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

export default TheGui;