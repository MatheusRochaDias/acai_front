import React from 'react';
import { Box } from '@chakra-ui/react';
import { useColorModeDefault } from '~/styles/colorMode';

export default function Home() {
  const { text_color, bg_container, bg } = useColorModeDefault();

  return (
    <Box w="full" color={text_color}>
      Salve!!!
    </Box>
  );
}
