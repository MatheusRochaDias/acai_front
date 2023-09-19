import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Image,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  Tooltip,
  useMediaQuery,
  useSteps,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router, { useRouter } from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, VerifyPassword } from '~/components';
import { SignInRequestData, updateUser } from '~/services/hooks/useUser';
import { getLocalStorage } from '~/utils/localStorageFormat';
import { api } from '~/services/api';

const signInFormSchema = yup.object().shape({
  name: yup.string().required('Required field'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  birth_date: yup.string().required('Required field'),
  phone_number: yup.string().required('Required field'),
  password: yup
    .string()
    .required('Required field')
    .min(8, 'The password must be at least 8 characters long.')
    .matches(
      /[a-z]/,
      'The password must contain at least one lowercase letter.'
    )
    .matches(
      /[A-Z]/,
      'The password should contain at least one uppercase character.'
    ),
});

export default function Register() {
  const [isLarge1300] = useMediaQuery(['(max-width: 1400px)']);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  let me = JSON.parse(getLocalStorage('me') || '');

  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState, setValue, watch } =
    useForm<SignInRequestData>({
      resolver: yupResolver(signInFormSchema),
    });
  const router = useRouter();

  async function handleSignIn(data: SignInRequestData) {
    setLoading(true);
    if (me.user.id) {
      try {
        await api.put(`/users/${me.user.id}`, {
          name: data.name,
          email: data.email,
          birth_date: data.birth_date,
          password: data.password,
          phone_number: data.phone_number,
          location: me.user.location,
          first_access: false,
          type: me.user.type,
        });
        toast({
          title: 'Success, log in with your new password',
          status: 'success',
          variant: 'solid',
          isClosable: true,
        });
        Router.push('/login');
      } catch (err: any) {
        toast({
          title: 'Unable to send data',
          status: 'warning',
          variant: 'solid',
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
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
      <Flex mx="auto" my="auto" as="form" onSubmit={handleSubmit(handleSignIn)}>
        <Box w="450px" py="40px" px="80px" bg="#202024">
          <Center w="100%">
            <Box w="100%">
              <Text
                color="#fff"
                textAlign="center"
                fontSize="22px"
                fontWeight="700"
                pb="15px"
              >
                Personal Info
              </Text>
              <Input
                bg="#2E3346"
                color="white"
                label="Name"
                labelColor="#c7d6d1"
                mb="10px"
                {...register('name')}
                error={formState?.errors?.name?.message}
              />
              <Input
                bg="#2E3346"
                color="white"
                label="Email"
                labelColor="#c7d6d1"
                mb="10px"
                {...register('email')}
                error={formState?.errors?.email?.message}
              />

              <Input
                bg="#2E3346"
                color="white"
                label="Birth Date"
                type="date"
                labelColor="#c7d6d1"
                mb="10px"
                {...register('birth_date')}
                error={formState?.errors?.birth_date?.message}
              />

              <Input
                bg="#2E3346"
                color="white"
                label="Phone Number"
                labelColor="#c7d6d1"
                mb="10px"
                {...register('phone_number')}
                error={formState?.errors?.phone_number?.message}
              />
              <Input
                bg="#2E3346"
                color="white"
                label="Password"
                labelColor="#c7d6d1"
                type="password"
                {...register('password')}
              />
              <VerifyPassword verify={watch('password')} />

              <Flex gap={5}>
                <Button
                  mt="15px"
                  variant="outline"
                  _hover={{
                    bg: '#fff',
                    color: '#331638',
                  }}
                  _active={{
                    color: '#fff',
                    bg: '#4B0082',
                  }}
                  color="white"
                  onClick={() => Router.push('/login')}
                  w="100%"
                >
                  Back
                </Button>
                <Button
                  mt="15px"
                  bg="#331638"
                  _hover={{
                    bg: '#9966CC',
                  }}
                  _active={{
                    bg: '#4B0082',
                  }}
                  color="white"
                  onClick={async () => {
                    setValue('first_access', false);
                  }}
                  type="submit"
                  isLoading={loading}
                  w="100%"
                >
                  Send
                </Button>
              </Flex>
            </Box>
          </Center>
        </Box>
      </Flex>
    </Flex>
  );
}
