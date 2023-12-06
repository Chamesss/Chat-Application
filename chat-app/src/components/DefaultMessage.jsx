import React from 'react'
import { Box, Center, Stack, Text } from '@chakra-ui/react'

const DefaultMessage = () => {
    return (
        <Stack w='100%' h='100%' position='relative'>
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
        </Stack>
    )
}

export default DefaultMessage