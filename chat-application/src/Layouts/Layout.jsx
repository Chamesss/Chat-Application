import { Paper } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import { useThemeContext } from '../contexts/themeContext';
import { useTheme } from '@mui/material';
import { Stack } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import { Button } from '@mui/material';


const Layout = () => {

    return (
        <Paper sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 0,
            backgroundColor: 'primary.mainBgSb',
            minHeight: '100vh',
            position:'relative',
            flexDirection:'column'
        }}>
            <Sidebar />
            <Stack style={{ marginTop: '50px'}}>
                <Outlet />
            </Stack>
        </Paper>
    )
}

export default Layout