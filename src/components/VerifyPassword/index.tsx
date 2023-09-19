import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface VerifyPasswordProps {
  verify: any;
}

export const VerifyPassword = ({ verify }: VerifyPasswordProps) => {
  return (
    <>
      <Box py="10px">
        <Text fontSize="14px" color="gray.300">
          Password must contain
        </Text>
        <Text
          color={
            verify !== undefined
              ? verify?.length > 7
                ? '#27AE60'
                : '#F03D3E'
              : 'gray.300'
          }
          fontSize="14px"
        >
          8 or more characters
        </Text>
        <Text
          color={
            verify !== undefined
              ? /(?=.*[A-Z])/.test(verify)
                ? '#27AE60'
                : '#F03D3E'
              : 'gray.300'
          }
          fontSize="14px"
        >
          Capital letter
        </Text>
        <Text
          color={
            verify !== undefined
              ? /(?=.*[a-z])/.test(verify)
                ? '#27AE60'
                : '#F03D3E'
              : 'gray.300'
          }
          fontSize="14px"
        >
          Lower case
        </Text>
      </Box>
    </>
  );
};
