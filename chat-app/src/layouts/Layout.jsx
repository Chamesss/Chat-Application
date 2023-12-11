import { Stack, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import axios from "../api/axios";
import Spinner from "../components/Spinner";

const Layout = () => {
  const { colorMode } = useColorMode();
  const { auth } = useAuth();
  const refreshAccessToken = useRefreshToken();
  const { setAuth } = useAuth();
  const [terminated, setTerminated] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const checkToken = async () => {
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          const response = await axios.get('/user/verifyjwt', {
            headers: {
              'Authorization': `Bearer ${newAccessToken}`,
              'nonext': true,
            }
          });
          setAuth({ user: response.data, accessToken: newAccessToken })
        }
      } catch (err) {
        setAuth({ user: null, accessToken: null })
      } finally {
        setTerminated(true);
      }
    }
    if (!auth.user || !auth.accessToken) {
      checkToken();
    }
  }, [])

  return (
    <>
    {terminated ? (
      <Stack w='100%' minH='100vh' bg={colorMode === "light" ? "#EEF5FF" : "#252E48"} fontFamily='Rubik Variable'>
      <Header />
      <Outlet />
      <Footer />
    </Stack>
    ) : (
      <Spinner />
    )}
    </>
  )
}

export default Layout