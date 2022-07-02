import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import "../styles/globals.css"
import "../styles/fonts.css"
import Head from 'next/head'

const theme = extendTheme({
  fonts: {
    heading: `Circular Std`,
    body: `Circular Std`,
  },
})






function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Devnetic</title>
        <meta name="description" content="Devnetic, created by App Dev League, is a computer science learning portal for all ages"></meta>
        <meta property="og:description" content="Devnetic, created by App Dev League, is a computer science learning portal for all ages"></meta>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
