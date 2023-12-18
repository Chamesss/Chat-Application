import React, { useState, useEffect, useRef } from 'react'
import { Stack, HStack, useColorMode, Switch, Text, useDisclosure, Avatar, Center } from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import useAuth from '../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logOut } from '../api/UserApi'
import { HamburgerIcon } from '@chakra-ui/icons'

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [lightMode, setLightMode] = useState(colorMode === 'light' ? true : false)
    const { auth, setAuth } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        colorMode === 'dark' ? setLightMode(false) : setLightMode(true)
    }, [colorMode])

    const handleChange = (e) => {
        e.preventDefault()
        setLightMode(!lightMode)
        setTimeout(() => {
            toggleColorMode();
        }, 110)
    };

    const handleLogout = () => {
        const response = logOut()
        onClose()
        if (response.success === true) {
            setAuth({ user: null, accessToken: null })
            navigate('/login', { state: { from: location }, replace: true })
        }
    }

    return (
        <HStack minW='100%' p='4' display="flex" justifyContent="space-between" alignItems='center' spacing={4}>
            <Stack>
                <HamburgerIcon fontSize='2xl' cursor='pointer' ref={btnRef} onClick={onOpen} />
                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader></DrawerHeader>
                        {auth.user ? (
                            <DrawerBody>
                                <Center flexDirection='column'>
                                    <Avatar src={`./media/avatars/${auth.user.avatar}.jpg`} size='xl' />
                                    <Text fontWeight='600' mt={5}>{auth.user.firstName} {auth.user.lastName}</Text>
                                    <Link style={{marginTop:'10px', color:'red'}} onClick={handleLogout}>Logout</Link>
                                </Center>
                            </DrawerBody>
                        ) : (
                            <DrawerBody>
                                <Center flexDirection='column'>
                                    <Link onClick={onClose} style={{marginTop:'10px', fontSize:'20px'}} to='login'>Login</Link>
                                    <Link onClick={onClose} style={{marginTop:'10px', fontSize:'20px'}} to='register'>Register</Link>
                                </Center>
                            </DrawerBody>
                        )}

                    </DrawerContent>
                </Drawer>
            </Stack>
            <HStack justifyContent="center" alignItems='center'>
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
        </HStack>
    )
}

export default Header