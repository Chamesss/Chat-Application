import DefaultMessage from './DefaultMessage'
import { Divider, Stack, Text, useColorMode, Avatar } from '@chakra-ui/react'
import { useChat } from '../Contexts/ChatProvider'
import ActionMenu from './ActionMenu'
import MessageInput from './MessageInput'
import StartConversation from './StartConversation'
import { useQuery } from '@tanstack/react-query'
import { getConversation } from '../api/ChatApi'
import useAuth from '../hooks/useAuth'
import ElapsedTime from '../utils/ElapsedTime'


const Messages = () => {
  const { colorMode } = useColorMode()
  const { selectedReceiverData } = useChat();
  const { auth } = useAuth();
  const senderId = auth && auth.user ? auth.user._id : null;
  const receiverId = selectedReceiverData ? selectedReceiverData._id : null

  const conversationData = useQuery({
    queryKey: ['conversations', { sender_Id: senderId, receiver_Id: receiverId }],
    queryFn: getConversation,
    enabled: !!senderId && !!receiverId,
  });

  return (
    <Stack bgColor={colorMode === 'light' ? 'white' : '#131827'} p={6} borderRadius={15} w='100%' h='100%' boxShadow='md'>
      {!selectedReceiverData ? (
        <DefaultMessage />
      ) : (
        <Stack h='100%' justifyContent='space-between'>
          {selectedReceiverData && auth ? (
            <Stack>
              <ActionMenu data={selectedReceiverData} />
              <Divider />
              <Stack>
                {conversationData.data ? (
                  <>
                    {conversationData.data.messages.map((message, index) => (
                      <Stack key={index} display='flex' w='100%'>
                        {message.from === auth.user._id ? (
                          <Stack direction='row' alignSelf='end' alignItems='center'>
                            <ElapsedTime time={message.created_at} />
                            <Text
                              borderRadius={20}
                              px={4}
                              py={2}
                              w='fit-content'
                              color='white'
                              bgColor={colorMode === 'light' ? '#2A8BF2' : '#0E6DD8'}
                            >
                              {message.text}
                            </Text>
                          </Stack>
                        ) : (
                          <Stack direction='row' w='fit-content' display='flex' alignItems='center'>
                            {index === 0 || conversationData.data.messages[index - 1].to !== message.to ? (
                              <Avatar size='sm' src={`./media/avatars/${selectedReceiverData.avatar}.jpg`} />
                            ) : <div style={{ marginLeft: '2rem' }} />}
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
                            <ElapsedTime time={message.created_at} />
                          </Stack>
                        )}
                      </Stack>
                    ))}
                  </>
                ) : (
                  <StartConversation data={selectedReceiverData} />
                )}
              </Stack>
            </Stack>
          ) : (
            <div>loading</div>
          )}

          <Stack display='flex' justifySelf='flex-end'>
            <MessageInput />
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

export default Messages