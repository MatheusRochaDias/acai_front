import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { FallbackProps } from 'react-error-boundary';
import { Icon } from '@iconify/react';

export function FallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  console.log({ error });

  return (
    <ChakraProvider>
      <Container maxW="1300px" color="#000" py="50px">
        <Heading>Ops! Algo deu errado.</Heading>
        <Text mt="20px">
          Lamentamos pelo inconveniente. Por favor, tente novamente mais tarde
          ou entre em contato com o suporte técnico caso o problema persista.
        </Text>
        <Text>Agradecemos pela sua compreensão.</Text>

        <Accordion allowMultiple my="20px">
          <AccordionItem>
            <AccordionButton>
              <AccordionIcon />
              <Box as="span" flex="1" textAlign="left" ml="3px" color="red">
                Exibir mensagem de erro
              </Box>
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text>Message:</Text>
              <Text color="red">{error.message}</Text>
              <Text mt="10px">Stack:</Text>
              <Text color="red">{error.stack}</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Button
          onClick={resetErrorBoundary}
          leftIcon={<Icon icon="pajamas:retry" />}
        >
          Tentar novamente
        </Button>
      </Container>
    </ChakraProvider>
  );
}
