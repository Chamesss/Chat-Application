import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from "@chakra-ui/react";
import { chakraCustomTheme as theme } from "./styles/ThemeConfig";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketProvider } from './contexts/SocketProvider.jsx'
import { AuthProvider } from './contexts/AuthProvider';
import '@fontsource-variable/rubik';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </ChakraProvider>
  </QueryClientProvider>
)
