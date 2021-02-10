import Layout from '../components/structure/Layout/Layout';
import type { AppProps /*, AppContext */ } from 'next/app'

// import "../assets/basic.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp