import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ApolloProv from '../graphql/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProv><Component {...pageProps} /></ApolloProv> 
}

export default MyApp
