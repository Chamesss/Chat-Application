import React from 'react'
import { useThemeContext } from '../contexts/themeContext';
import { Box, Button, Stack, FormControlLabel, Typography } from '@mui/material'
import Switch from '@mui/material/Switch';


const Sidebar = () => {

    const { mode, setMode } = useThemeContext();
    const toggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
    };

    return (
        <Box position="relative" sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "5%",
            height: "100vh",
            backgroundColor: "primary.sidebar",
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)'
        }}>
            <Stack sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-end",
            }}>
                <Typography sx={{textAlign:'center'}}>{mode} mode</Typography>
                <Switch sx={{ m: 1 }} value="active" checked={mode === 'dark'} onClick={() => toggleMode()} />
            </Stack>

        </Box>
    )
}

export default Sidebar