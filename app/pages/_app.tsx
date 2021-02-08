import Layout from '../components/0_structure/Layout'
import WebFont from "../components/0_structure/Fonts";
import type { AppProps /*, AppContext */ } from 'next/app'

// import "../assets/basic.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <WebFont />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp