import React from 'react'
import { Stack, Text, useColorMode } from '@chakra-ui/react'
import ElapsedTime from '../../utils/ElapsedTime'

const SenderMessage = ({ message }) => {
    const { colorMode } = useColorMode()
    return (
        <Stack display='flex' flexDirection='row' justifyContent='flex-end' alignItems='center'>
            <Text fontSize='xs'>
                {message.status ? (
                    <ElapsedTime time={message.created_at} dateNow={new Date()} />
                ) : (
                    <>Message not sent</>
                )}
            </Text>
            <Text
                borderRadius={20}
                px={4}
                py={2}
                w='fit-content'
                color={message.status ? 'white' : 'red'}
                bgColor={message.status ? (colorMode === 'light' ? '#2A8BF2' : '#0E6DD8') : (colorMode === 'light' ? '#BABABA' : '#888888')}
            >
                {message.text}
            </Text>
        </Stack>
    )
}

export default SenderMessage