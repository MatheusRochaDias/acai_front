import {
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { Icon, Icon as IconName } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ElementType, Fragment } from 'react';
import { ActiveLink } from '../ActiveLink';
import { useColorModeDefault } from '~/styles/colorMode';

interface IPropsSubMenu<T = string> {
  title: T;
  route: T;
}

interface NavLinkProps extends ChakraLinkProps {
  // icon: ElementType;
  icon: string;
  children: string;
  href: string;
  activeDrawer?: boolean;
  subMenu?: Array<IPropsSubMenu>;
  indiceSubMenu?: number;
  onClose?: () => void;
}

export function NavLink({
  icon,
  children,
  href,
  activeDrawer,
  subMenu,
  indiceSubMenu = 0,
  onClose,
  ...rest
}: NavLinkProps) {
  const { asPath } = useRouter();
  const { bg, text_color } = useColorModeDefault();
  const current_path = subMenu?.find((item) => item.route === asPath);
  return activeDrawer ? (
    <Box w="full">
      <Accordion
        allowToggle
        w="full"
        defaultIndex={current_path ? [indiceSubMenu] : []}
      >
        <AccordionItem
          w="full"
          borderY="none"
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition="ease-in-out 1s"
        >
          <AccordionButton
            _hover={{
              bg: '#faa42bd3',
              color: '#fff',
            }}
            bg={current_path ? '#FB9400' : ''}
            borderRadius="5px"
            p="5px 10px"
            w="full"
            color={href === asPath ? '#ffffff' : current_path ? '' : text_color}
          >
            <ChakraLink display="flex" alignItems="center" {...rest} w="full">
              <HStack>
                <Icon icon={icon} fontSize="20" />
                <Text
                  ml="4"
                  fontWeight={current_path ? 'medium' : ''}
                  fontSize="14px"
                >
                  {children}
                </Text>
              </HStack>
            </ChakraLink>

            {!!subMenu?.length && <AccordionIcon w="16px" />}
          </AccordionButton>
          <AccordionPanel pb="0" ml="10px">
            {subMenu?.map((item, idx) => (
              <Box key={idx}>
                <Link href={item.route}>
                  <ChakraLink
                    display="flex"
                    alignItems="center"
                    onClick={() => {
                      onClose && onClose();
                    }}
                    {...rest}
                    w="full"
                  >
                    <Box />
                    <Text
                      flex={1}
                      ml="4"
                      my="5px"
                      fontWeight={current_path ? 'medium' : ''}
                      fontSize="14px"
                      color={item.route === asPath ? '#FB9400' : text_color}
                      _hover={{ color: '#faa42bd3' }}
                    >
                      {item.title}
                    </Text>
                  </ChakraLink>
                </Link>
              </Box>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  ) : (
    <ActiveLink
      href={href}
      passHref
      checkHref={href}
      onClick={() => {
        onClose && onClose();
      }}
    >
      <Flex
        as={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition="ease-in-out 1s"
        cursor={href === '/chat' ? 'not-allowed' : 'pointer'}
        display="flex"
        alignItems="center"
        bg={href === asPath ? '#FB9400' : ''}
        borderRadius="4px"
        // transition="all linear .50s"
        _hover={{
          color: '#fff',
          bg: '#faa42bd3',
        }}
      >
        <Flex
          w="full"
          color={href === asPath ? '#ffffff' : text_color}
          flex={1}
          _hover={{
            color: '#fff',
          }}
        >
          <Icon icon={icon} fontSize="20" />
          <Text
            ml="4"
            fontWeight={current_path ? 'medium' : ''}
            fontSize="14px"
          >
            {children}
          </Text>
        </Flex>
      </Flex>
    </ActiveLink>
  );
}
