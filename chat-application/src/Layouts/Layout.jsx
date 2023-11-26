import { Container, Paper } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useThemeContext } from '../contexts/themeContext';
import { AppBar } from '@mui/material'
import { useTheme } from '@mui/material';


const Layout = () => {
    console.log('this is layout :)')
    const { mode, setMode } = useThemeContext();

    const toggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
    };

    const theme = useTheme()

    return (
        <Paper sx={{
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: theme.palette.background.paper ,
            width:'100%',
            minHeight:'100vh'
        }}>
            <AppBar position="fixed" sx={{
                display: 'flex',
                alignSelf: 'center',
                justifySelf: 'center',
                margin:0,
            }}>
                <Button onClick={toggleMode}>Toggle Mode</Button>
            </AppBar>
            <Outlet />
        </Paper>
    )
}

export default Layout