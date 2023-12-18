import DefaultMessage from './DefaultMessage'
import { Divider, Stack, Text, useColorMode, Avatar, Skeleton, SkeletonCircle, Center } from '@chakra-ui/react'
import { useChat } from '../Contexts/ChatProvider'
import ActionMenu from './ActionMenu'
import MessageInput from './MessageInput'
import StartConversation from './StartConversation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getConversation, addConversation } from '../api/ChatApi'
import useAuth from '../hooks/useAuth'
import ElapsedTime from '../utils/ElapsedTime'
import useSocket from '../hooks/useSocket'
import { useEffect, useState } from 'react'


const Messages = () => {
  const { colorMode } = useColorMode()
  const { selectedReceiverData } = useChat();
  const { auth } = useAuth();
  const { socket } = useSocket();
  const [typing, setTyping] = useState('')
  const [emitted, setEmitted] = useState(false)
  const [messages, setMessages] = useState([])
  const queryClient = useQueryClient();
  const senderId = auth && auth.user ? auth.user._id : null;
  const receiverId = selectedReceiverData ? selectedReceiverData._id : null

  const conversationData = useQuery({
    queryKey: ['conversations', { sender_Id: senderId, receiver_Id: receiverId }],
    queryFn: getConversation,
    enabled: !!senderId && !!receiverId,
    select: (data) => {
      if (!data) {
        addConversation({ senderId: auth.user._id, receiver_id: receiverId })
        refetch()
      }
      return data
    }
  });

  useEffect(() => {
    if (conversationData.data && conversationData.isSuccess && !emitted) {
      socket.emit("addSocket", conversationData.data._id, senderId);
      socket.emit("addConversation", conversationData.data._id);
      setEmitted(true);
    }
  }, [conversationData, emitted, senderId])

  useEffect(() => {
    if (!auth || !socket || !selectedReceiverData) return

    if (conversationData.isSuccess) {
      conversationData.data?.messages?.length > 0 && setMessages(conversationData.data.messages)
    }

    //Typing event
    let activityTimer
    socket.on("typing", (senderName) => {
      setTyping(`${senderName} is typing...`)
      clearTimeout(activityTimer)
      activityTimer = setTimeout(() => {
        setTyping('');
      }, 3000)
    })

    //NewMessage event
    socket.on("getMessage", (data) => {
      queryClient.setQueryData(['conversations', { sender_Id: auth.user._id, receiver_Id: selectedReceiverData._id }], (prevData) => {
        setMessages((prevData) => [...prevData, data])
      });
      queryClient.invalidateQueries(['conversations', { sender_Id: auth.user._id, receiver_Id: selectedReceiverData._id }]);
      setTyping('')
    });

  }, [auth, socket, selectedReceiverData, conversationData])

  return (
    <Stack bgColor={colorMode === 'light' ? 'white' : '#131827'} p={6} borderRadius={15} w='100%' h='95vh' boxShadow='md'>
      {!selectedReceiverData ? (
        <DefaultMessage />
      ) : (
        <Stack maxH='100%' justifyContent='space-between'>
          {selectedReceiverData && auth && (
            <Stack h='100%'>
              <ActionMenu data={selectedReceiverData} />
              <Divider />
              <Stack h='70vh' overflow='auto'>
                {conversationData.isPending && (
                  <>
                    {Array.from({ length: 2 }, (_, i) => (
                      <Stack key={i} direction='column'>
                        <Stack w='100%' h='auto' direction='row' alignItems='center'>
                          <SkeletonCircle size='50px' />
                          <Skeleton w='50%' h='25px' />
                        </Stack>
                        <Stack w='100%' alignItems='end'>
                          <Skeleton w='50%' h='25px' />
                        </Stack>
                      </Stack>
                    ))}
                  </>
                )}
                {conversationData.isError && (
                  <Center>
                    <Text>Something went wrong.</Text>
                  </Center>
                )}
                {conversationData.isSuccess && (
                  <Stack h='100%' >
                    {messages.length > 0 ? (
                      <Stack position='relative' h='100%' >
                        {messages.map((message, index) => (
                          <Stack key={index} display='flex' w='100%'>
                            {message.from === auth.user._id ? (
                              <Stack direction='row' alignSelf='end' alignItems='center'>
                                <Text fontSize='xs'>
                                  <ElapsedTime time={message.created_at} />
                                </Text>
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
                                {index === 0 || messages[index - 1].to !== message.to ? (
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
                                <Text fontSize='xs'>
                                  <ElapsedTime time={message.created_at} />
                                </Text>
                              </Stack>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                    ) : (
                      <StartConversation data={selectedReceiverData} />
                    )}
                  </Stack>
                )}
              </Stack>
              <Stack>
                <Text as='i' fontSize='sm' textAlign='start' h='15px'>{typing}</Text>
              </Stack>
              <Stack display='flex' justifySelf='flex-end'>
                <MessageInput data={conversationData.data} />
              </Stack>
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  )
}

export default Messages