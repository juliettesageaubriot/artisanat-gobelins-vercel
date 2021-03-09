import Layout from '../components/Structure/Layout/Layout'
import WebFont from '../components/Structure/Fonts/Fonts'

import "../../assets/basic.scss"

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

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <WebFont />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
