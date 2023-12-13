import DefaultMessage from './DefaultMessage'
import { Divider, Stack, Text, useColorMode, Avatar } from '@chakra-ui/react'
import { useChat } from '../Contexts/ChatProvider'
import { useEffect, useState } from 'react'
import ActionMenu from './ActionMenu'
import MessageInput from './MessageInput'
import StartConversation from './StartConversation'
import { useQuery } from '@tanstack/react-query'
import { getConversation } from '../api/ChatApi'
import useAuth from '../hooks/useAuth'
import ElapsedTime from '../utils/ElapsedTime'


const Messages = () => {
  const { colorMode } = useColorMode()
  const { selectedConversationId, selectedReceiverData } = useChat();
  //const [receiver, setReceiver] = useState(null)
  //const [conversationData, setConversationData] = useState(null);
  const { auth } = useAuth();

  console.log('jsdnfkjdsnfjkdnsjkfndkj', selectedReceiverData)
  let conversationData = null

  if (selectedReceiverData) {
    conversationData = useQuery({
      queryKey: ['conversations', { sender_Id: auth.user._id, receiver_Id: selectedReceiverData._id }],
      queryFn: getConversation,
    });
    console.log(conversationData)
  }



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('./dummy/dummy.json');
  //       const data = await response.json();
  //       const selectedConversation = data.find((conversation) =>
  //         conversation.participant.every((participant) => participant.user === selectedConversationId || participant.user === myId)
  //       );
  //       setConversationData(selectedConversation);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   const fetchReceiver = async () => {
  //     try {
  //       const response = await fetch('./dummy/users.json')
  //       const data = await response.json()
  //       const receiver = data.find((user) => user.id === selectedConversationId)
  //       setReceiver(receiver)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData();
  //   fetchReceiver();
  // }, [selectedConversationId]);

  return (
    <Stack bgColor={colorMode === 'light' ? 'white' : '#131827'} p={6} borderRadius={15} w='100%' h='100%' boxShadow='md'>
      {!selectedConversationId ? (
        <DefaultMessage />
      ) : (
        <Stack h='100%' justifyContent='space-between'>
          {selectedReceiverData ? (
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
                  <StartConversation />
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