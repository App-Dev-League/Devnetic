import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preload" href="/fonts/circular-std-medium-500.ttf" as="font" type="font/ttf" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}