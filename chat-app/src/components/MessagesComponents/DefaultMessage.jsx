import React from 'react'
import { Box, Center, Stack, Text, useColorMode } from '@chakra-ui/react'

const DefaultMessage = () => {
    const { colorMode } = useColorMode()
    return (
        <Center flexDir='column' h='100%'>
            <Box w='20%' p={1}>
                <img src="./media/logo.svg" alt="logo" />
            </Box>
            <Text
                fontWeight='700'
                fontSize='2rem'
            >
                "Chat App Title"
            </Text>
            <Text
                fontWeight='300'
            >
                Embark on a journey of words and ideas – start a conversation and let the dialogue unfold.
            </Text>
        </Center>
    )
}

export default DefaultMessage