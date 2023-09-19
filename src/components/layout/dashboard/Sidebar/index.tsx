import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Flex, Stack, Image, Text } from '@chakra-ui/react';
import { Icon, Icon as IconName } from '@iconify/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';
import { useColorModeDefault } from '~/styles/colorMode';
import { subsMenu } from '~/types/routes';

interface IPropsSide {
  hide: boolean;
  onCloseDrawer?: () => void;
  setHideSide: (value: boolean) => void;
}

export default function Sidebar({
  hide: hideState,
  onCloseDrawer,
  setHideSide,
}: IPropsSide) {
  const [hide, setHide] = useState(false);

  const handleMouseEnter = () => {
    setHide(false);
    setHideSide(false);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHide(true);
      setHideSide(true);
    }, 2000);
  };
  const { bg, logo, logo_favicon } = useColorModeDefault();

  const { asPath } = useRouter();
  const current_path = subsMenu.company.find((item) => item.route === asPath);

  useEffect(() => {
    setHide(hideState);
  }, [hideState]);

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 1 }}
      animate={{ opacity: 1, y: 0 }}
      transition="ease-in-out 0.5s"
      maxW={{ base: 'full', md: hide ? '70px' : '210px' }}
      bg={bg}
      cursor={{ base: '', lg: 'pointer' }}
      onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      p="10px"
      boxShadow={{ base: '', lg: 'base' }}
      borderRight="1px solid #00f0f"
      zIndex={10}
    >
      <Flex
        transition="all 0.55s"
        w={hide ? '30px' : '100%'}
        mb={hide ? '35px' : '25px'}
        h={hide ? '30px' : '60px'}
        mt={hide ? '7px' : '0'}
        justify="center"
      >
        <Image
          src={hide ? logo_favicon : logo}
          h="40px"
          mb="10px"
          as={motion.img}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition="ease-in-out 1s"
        />
      </Flex>
      <Stack
        as={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition="ease-in-out 0.5s"
        spacing="5"
        align="center"
        pr={hide ? '0' : '5'}
        w="full"
        minW={hide ? '0' : '210px'}
      >
        {hide ? (
          subsMenu.company.map((item, idx) => (
            <Link
              href={item.route}
              passHref
              key={idx}
              onClick={() => {
                onCloseDrawer && onCloseDrawer();
                setHide(false);
              }}
            >
              <Flex
                w="full"
                justify="center"
                align="center"
                my="7px"
                transition="all 0.5s"
              >
                <Icon
                  icon={item.icon}
                  fontSize="23"
                  color={item.route === asPath ? '#FB9400' : '#656d86'}
                  style={{ cursor: 'pointer' }}
                />
              </Flex>
            </Link>
          ))
        ) : (
          <NavSection title="MENU">
            {/* {subsMenu.company.map((item, idx) => (
              <NavLink
                activeDrawer={!!item.subMenu}
                subMenu={item.subMenu}
                icon={item.icon}
                href={item.route}
                key={idx}
                onClose={onCloseDrawer}
              >
                {item.title}
              </NavLink>
            ))} */}
          </NavSection>
        )}
      </Stack>
    </Box>
  );
}
