### How to use

### :bullettrain_side: Architecture

Inform the nextjs page that the component is a Threejs component. For that, simply add the **r3f** property to the parent component.

```jsx
const Page = () => {
  return (
    <>
      <h1>Hello !</h1>
      {/* Simply add the r3f prop to the parent component -> */}
      <MeshComponent r3f />
    </>
  )
}

export default Page
```

### :control_knobs: Available Scripts

- `yarn dev` - Next dev
- `yarn analyze` - Generate bundle-analyzer
- `yarn lint` - Audit code quality
- `yarn build` - Next build
- `yarn start` - Next start
- `yarn export` - Export to static HTML

### ⬛ Stack

- [`threejs`](https://github.com/mrdoob/three.js/) &ndash; A lightweight, 3D library with a default WebGL renderer.
- [`react-three-fiber`](https://github.com/pmndrs/react-three-fiber) &ndash; A React renderer for Threejs on the web and react-native.
- [`@react-three/drei`](https://github.com/react-spring/drei) &ndash; useful helpers for react-three-fiber
- [`r3f-perf`](https://github.com/RenaudRohlinger/r3f-perf) &ndash; Tool to easily monitor react threejs performances.
- [`@three-material-editor`](https://github.com/RenaudRohlinger/three-material-editor) &ndash; Tool to easily edit the shaders of your threejs materials.

### next-transpile-modules

We override the module by transpiling only the three/examples/jsm to build faster and also to prevent JavaScript heap out of memory errors.
If you have any issue related to transpilation you might need to tweak or remove the "match" condition in next.config.js
