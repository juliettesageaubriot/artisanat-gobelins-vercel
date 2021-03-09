export async function createInstance() {
  const module = await import('three/examples/jsm/libs/dat.gui.module.js')

  const { GUI } = module;

  return new GUI();
}
let instancePromise = null;

export default function getInstance() {
  if (!instancePromise) {
    instancePromise = createInstance()
    // .catch(e => {
    //    console.log(e); return ???;
    //    instancePromise = null; throw e;
    // });
  }
  return instancePromise;
}