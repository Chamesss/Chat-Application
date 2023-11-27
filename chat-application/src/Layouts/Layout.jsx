import { Paper } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import { useThemeContext } from '../contexts/themeContext';
import { useTheme } from '@mui/material';
import { Stack } from '@mui/material';


const Layout = () => {



    return (
        <Paper sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 0,
        }}>
            <Sidebar />
            <Outlet />
        </Paper>
    )
}

export default Layout