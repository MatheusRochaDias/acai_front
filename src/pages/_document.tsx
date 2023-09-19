import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from '~/styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {/* <link rel="stylesheet" href="devices.min.css" type="text/css" /> */}
          <link rel="shortcut icon" href="/assets/logo/logo-favicon.svg" />
          <title>Acai Republic Intranet</title>
          <meta
            name="google-site-verification"
            content="fRI-UdR0xUune55VjbwHaMNxR-VCQw5LrsUpdagUjDA"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />

          {/* <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY}`}
          /> */}
        </body>
      </Html>
    );
  }
}
