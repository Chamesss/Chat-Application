import React, { useState, useEffect } from 'react'
import { HStack, useColorMode, Switch, Text } from '@chakra-ui/react'

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [lightMode, setLightMode] = useState(colorMode === 'light' ? true : false)
    useEffect(() => {
        colorMode === 'dark' ? setLightMode(false) : setLightMode(true)
    }, [colorMode])
    useEffect(() => {
        console.log('lightmode === ', lightMode)
    }, [lightMode])
    const handleChange = (e) => {
        e.preventDefault()
        setLightMode(!lightMode)
        setTimeout(() => {
            toggleColorMode();
        }, 110)
    };
    return (
        <HStack minW='100%' p='4' display="flex" justifyContent="end" alignItems='center' spacing={4}>
            <Text><span style={{ fontWeight: '700' }}>{colorMode === 'dark' ? 'Dark' : <span style={{ opacity: '0.5' }}> Dark </span>}</span></Text>
            <Switch size='lg' isChecked={lightMode} sx={{
                'span.chakra-switch__track:not([data-checked])': {
                    backgroundColor: '#131827',
                },
                'span.chakra-switch__track': { p: '5px', backgroundColor: '#6C9EFF' }
            }}
                onChange={(e) => handleChange(e)}
            />
            <Text><span style={{ fontWeight: '700' }}>{colorMode === 'light' ? 'Light' : <span style={{ opacity: '0.5' }}> Light </span>}</span></Text>
        </HStack>
    )
}

export default Header