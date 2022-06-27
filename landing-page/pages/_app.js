import { ChakraProvider, extendTheme} from '@chakra-ui/react'
import "../styles/globals.css"
import "../styles/fonts.css"

const theme = extendTheme({
  fonts: {
    heading: `Circular Std`,
    body: `Circular Std`,
  },
})






function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
