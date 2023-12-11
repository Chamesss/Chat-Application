import { Stack, useColorMode } from '@chakra-ui/react'
import Chat from '../components/Chat'
import Messages from '../components/Messages'
import { ChatProvider } from '../Contexts/ChatProvider'

const Application = () => {
  const { colorMode } = useColorMode();
  return (
    <ChatProvider>
      <Stack w='100%' m='auto' flexDirection='row' textAlign='center' centerContent px={6}>
        <Stack w='30%'>
          <Chat />
        </Stack>
        <Stack w='70%'>
          <Messages />
        </Stack>
      </Stack>
    </ChatProvider>
  )
}

export default Application