import { Box, Stack, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = () => {
  const { colorMode } = useColorMode();
  return (
      <Stack w='100%' minH='100vh' bg={colorMode === "light" ? "#EEF5FF" : "#252E48"} fontFamily='Rubik Variable'>
        <Header />
        <Outlet />
        <Footer />
      </Stack>
  )
}

export default Layout