import Layout from '@components/Structure/Layout/Layout'
import WebFont from '@components/Structure/Fonts/TheFonts'

import localforage from "localforage";

import "@assets/basic.scss"

// let LCanvas = null
// if (process.env.NODE_ENV === 'production') {
//   LCanvas = dynamic(() => import('@/examples/layout/_canvas'), {
//     ssr: false,
//   })
// } else {
//   LCanvas = require('@/examples/layout/_canvas').default
// }

// function SplitApp({ canvas, dom }) {
//   return (
//     <>
//       <Header />
//       {dom && <Dom dom={dom} />}
//       <LCanvas>{canvas && <group>{canvas}</group>}</LCanvas>
//     </>
//   )
// }

// Setup localStorage

localforage.config({
  name: "regards-d-artisans",
  version: 1.0,
  storeName: "data", // Should be alphanumeric, with underscores.
  description: "Data persisted by the regards d'artisans experience",
});

// Exemple localforage

// localforage.setItem("step", 3);
// const currentStep = await localforage.getItem("step");

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <WebFont />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
