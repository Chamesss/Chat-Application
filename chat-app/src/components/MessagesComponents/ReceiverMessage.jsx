import React from 'react'
import { Stack, Text, useColorMode } from '@chakra-ui/react'
import ElapsedTime from '../../utils/ElapsedTime'

const ReceiverMessage = ({ message }) => {
  const { colorMode } = useColorMode()
  return (
    <>
      <Stack
        borderRadius={20}
        py={2}
        px={4}
        bgColor={colorMode === 'light' ? '#EAE8ED' : '#252E48'}
        display='flex'
        justifyContent='center'
      >
        <Text>
          {message.text}
        </Text>
      </Stack>
      <Text fontSize='xs'>
        <ElapsedTime time={message.created_at} dateNow={new Date()} />
      </Text>
    </>
  )
}

export default ReceiverMessage