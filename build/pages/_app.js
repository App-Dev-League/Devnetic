import { ChakraProvider, extendTheme, createLocalStorageManager} from '@chakra-ui/react'
import "../styles/globals.css"
import "../styles/fonts.css"
import Head from 'next/head'
import theme from "./theme"





function MyApp({ Component, pageProps }) {
  const manager = createLocalStorageManager("theme")

  return (
    <>
      <Head>
        <title>Devnetic</title>
        <meta name="description" content="Devnetic, created by App Dev League, is a computer science learning portal for all ages"></meta>
        <meta property="og:description" content="Devnetic, created by App Dev League, is a computer science learning portal for all ages"></meta>
      </Head>
      <ChakraProvider theme={theme} colorModeManager={manager}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
