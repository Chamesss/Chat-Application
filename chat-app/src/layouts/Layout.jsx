import { Box, Stack, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout = () => {
  const { colorMode } = useColorMode();
  return (
    <Stack>
      <Box w='100' h='100vh' bg={colorMode === "light" ? "#EEF5FF" : "#252E48"}>
        <Header />
        <Outlet />
      </Box>
    </Stack>
  )
}

export default Layout