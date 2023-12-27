import React from 'react'
import { VStack, Avatar, Text } from '@chakra-ui/react'

const StartConversation = (data) => {
  return (
    <VStack>
      <Avatar size='xl' src={`./media/avatars/${data.data.avatar}.jpg`} />
      <Text fontWeight='600'>{data.data.firstName}  {data.data.lastName}</Text>
      <Text fontWeight='400' fontSize={12}>You can start chatting.</Text>
    </VStack>
  )
}

export default StartConversation