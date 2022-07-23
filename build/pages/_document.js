import { Html, Head, Main, NextScript } from 'next/document'
import theme from "./theme"
import { ColorModeScript } from '@chakra-ui/react'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preload" href="/fonts/circular-std-medium-500.ttf" as="font" type="font/ttf" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"/>
            </Head>
            <body>
            <ColorModeScript storageKey="theme" initialColorMode={theme.config.initialColorMode} />

                <Main />
                <NextScript />
            </body>
        </Html>
    )
}