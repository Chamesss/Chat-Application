import React from 'react'
import { Stack, HStack, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, useColorMode } from '@chakra-ui/react'
import { BsThreeDots } from "react-icons/bs";

const ActionMenu = () => {
    const {colorMode} = useColorMode();
    return (
        <Stack display='flex' direction='row' justifyContent='space-between' alignItems='center'>
            <HStack>
                <Avatar src='https://bit.ly/dan-abramov' />
                <Text textAlign='start' fontWeight='600'>Dan Abrahmov</Text>
            </HStack>
            <Menu>
                <MenuButton p={4} borderRadius={25} sx={{ '&:hover, &:focus': { bgColor: colorMode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' } }}><BsThreeDots /></MenuButton>
                <MenuList>
                    <MenuItem>
                        New Tab
                    </MenuItem>
                    <MenuItem>
                        New Window
                    </MenuItem>
                </MenuList>
            </Menu>
        </Stack>
    )
}

export default ActionMenu