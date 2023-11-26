import { Paper } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import { useThemeContext } from '../contexts/themeContext';
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
            flexDirection: 'row',
            backgroundImage: theme.palette.background.paper ,
            width:'100%',
            minHeight:'100vh'
        }}>
            <Sidebar />
            <Outlet />
        </Paper>
    )
}

export default Layout