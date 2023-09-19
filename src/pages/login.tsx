import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Image,
  Text,
  Tooltip,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from '~/components';
import { useColorModeDefault } from '~/styles/colorMode';
import { useAuthContext } from '~/context/AuthContext';

const signInFormSchema = yup.object().shape({
  username: yup.string().required('Usuário Obrigatório'),
  password: yup.string().required('Senha Obrigatória'),
});

interface SignInRequestData {
  email: string;
  password: string;
}

export default function Login() {
  const [isLarge1300] = useMediaQuery(['(max-width: 1400px)']);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { signIn } = useAuthContext();
  const { logo } = useColorModeDefault();

  const { register, handleSubmit, formState } = useForm<SignInRequestData>();
  async function handleSignIn(data: SignInRequestData) {
    setLoading(true);
    await signIn(data)
      .catch((err: any) => {
        toast({
          title: err.message,
          status: 'error',
          variant: 'solid',
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Flex
      dir="row"
      width="100%"
      minH="100vh"
      overflow="hidden"
      backgroundImage="/assets/login.png"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
    >
      <Flex mx="auto" my="auto">
        <Box w="450px" h="500px" py="40px" px="80px" bg="#202024">
          <Center>
            <Image
              src="/assets/white_logo.png"
              alt="Logo"
              width="200px"
              objectFit="contain"
              mb="50px"
            />{' '}
          </Center>
          <Box as="form" onSubmit={handleSubmit(handleSignIn)}>
            <Input
              bg="#2E3346"
              color="white"
              label="Email"
              labelColor="#c7d6d1"
              mb="25px"
              {...register('email')}
              error={formState?.errors?.email?.message}
            />
            <Input
              bg="#2E3346"
              color="white"
              label="Senha"
              labelColor="#c7d6d1"
              type="password"
              {...register('password')}
              error={formState?.errors?.password?.message}
            />
            <Button
              mt="35px"
              bg="#331638"
              _hover={{
                bg: '#9966CC',
              }}
              _active={{
                bg: '#4B0082',
              }}
              color="white"
              type="submit"
              isLoading={loading}
              w="100%"
            >
              Sign in
            </Button>
            <Tooltip hasArrow label="Use your Email as your password">
              <Text pt="20px" textAlign="center" color="#FFF" fontSize="14px">
                First Access
              </Text>
            </Tooltip>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
