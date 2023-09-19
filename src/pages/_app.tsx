/* eslint-disable react/button-has-type */
import '../styles/globals.css';
import '../styles/assets/devices.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'moment/locale/pt-br';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import type { AppProps } from 'next/app';
import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react';
import NextNprogress from 'nextjs-progressbar'; // theme css file
import { QueryClientProvider } from 'react-query';
import { Layout } from '~/components/layout';
import { queryClient } from '~/services/queryClient';
import { authPageProps } from '~/utils/authPageProps';
import { theme } from '~/styles/theme';
import { AuthProvider } from '~/context/AuthContext';
import { FallbackRender } from '~/components/errorBoundary/fallbackRender';

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xs" w="50px" h="50px" />
      </Flex>
    );
  }

  if (typeof window === 'undefined') {
    return <></>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NextNprogress
        color="#331638"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
      />

      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = authPageProps;

export default MyApp;
