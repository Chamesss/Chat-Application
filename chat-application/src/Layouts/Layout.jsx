import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useThemeContext } from '../contexts/themeContext';



const Layout = () => {
    console.log('this is layout :)')
    const { mode, setMode } = useThemeContext();

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

    return (
        <Container>
            <Button onClick={toggleMode}>Toggle Mode</Button>
            <Outlet />
        </Container>
    )
}

export default Layout