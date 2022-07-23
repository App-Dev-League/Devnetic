import { ChakraProvider, extendTheme } from '@chakra-ui/react'


const theme = extendTheme({
    fonts: {
      heading: `Circular Std`,
      body: `Circular Std`,
    },
    initialColorMode: 'dark',
    useSystemColorMode: false,
  })
  
export default theme;