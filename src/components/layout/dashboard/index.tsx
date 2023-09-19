import { Box, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Select } from '~/components/select';
import Sidebar from './Sidebar';
import HeaderDashboard from './header';
import { useEventSource } from '~/hooks/useEventSource';

interface LayoutProps {
  title: string;
  children: ReactNode;
}
// 'http://localhost:3331/public/sse'
export function LayoutDashboard({ children, title }: LayoutProps) {
  const [hideSide, setHideSide] = useState(false);
  // const orders = useEventSource(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}public/sse`
  // );
  // console.log({ orders });

  // const toast = useToast();

  // useEffect(() => {
  //   // Verifica se o navegador suporta notificações
  //   if ('Notification' in window) {
  //     // Solicita permissão para exibir notificações
  //     Notification.requestPermission();
  //   }
  // }, []);

  // useEffect(() => {
  //   const audio = new Audio('/audio/ring.mp3');
  //   audio.play();
  //   toast({
  //     title: `Novo Pedido n° ${orders[orders.length - 1]?.id}`,
  //     description: `Obrigado Deus`,
  //     status: 'success',
  //     duration: 10000,
  //     isClosable: true,
  //   });
  //   if ('Notification' in window && Notification.permission === 'granted') {
  //     // Cria uma nova notificação
  //     const notification = new Notification('Novo Pedido', {
  //       body: `Você recebeu umm novo pedido n° ${
  //         orders[orders.length - 1]?.id
  //       }`,
  //       icon: '/assets/logo-pizzaplay.jpeg',
  //     });
  //   }
  // }, [orders]);
  return (
    <Box w="full" color="#fff" overflowY="hidden">
      <Flex overflowY="hidden" w="full">
        <Box display={{ base: 'none', lg: 'flex' }}>
          <Sidebar hide={hideSide} setHideSide={setHideSide} />
        </Box>
        <Box w="full" overflowY="hidden">
          <HeaderDashboard
            onPress={(click) => setHideSide(click)}
            hide={hideSide}
          />
          <Box
            __css={{
              '&::-webkit-scrollbar': {
                width: '7px',
                borderRadius: '24px',
                background: '#ccc',
              },
              '&::-webkit-scrollbar-track': {
                width: '7px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#FB9400',
                width: '7px',
                borderRadius: '24px',
              },
            }}
            overflowY="scroll"
            p={{ base: '10px', sm: '20px' }}
            h="calc(100vh - 65px)"
            overflowX="hidden"
          >
            <Box maxW="1300px" mx="auto">
              <Text
                as="h3"
                mb="10px"
                textTransform="uppercase"
                fontWeight="600"
              >
                {title}
              </Text>
              <Box
                maxW="2500px"
                mx="auto"
                borderRadius="8px"
                minH="calc(100vh - 130px)"
                as={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition="ease-in-out 2.2s"
              >
                {children}
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
