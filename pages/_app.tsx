import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ApolloProv from '../graphql/apollo'
import { IconContext } from "react-icons";

function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProv> <IconContext.Provider value={{color: "red", size: "2rem"}}><Component {...pageProps} /></IconContext.Provider></ApolloProv> 
}

export default MyApp
