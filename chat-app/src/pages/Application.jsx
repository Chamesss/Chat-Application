import { Stack, useColorMode } from '@chakra-ui/react'
import Chat from '../components/Chat'
import Messages from '../components/Messages'

const Application = () => {
  const { colorMode } = useColorMode();
  return (
    <Stack m='auto' flexDirection='row' bgColor={colorMode === 'light' ? 'white' : '#00001E'} maxW='97%' textAlign='center' centerContent p={8} mt={8} mb={5} borderRadius={6} boxShadow='lg'>
      <Stack w='30%'>
        <Chat />
      </Stack>
      <Stack w='70%' border='1px solid green'>
        <Messages />
      </Stack>
    </Stack>
  )
}

export default Application