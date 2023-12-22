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
import { useEffect, useState, useRef  } from 'react'


const Messages = () => {
  const { colorMode } = useColorMode()
  const { selectedReceiverData } = useChat();
  const { auth } = useAuth();
  const conversationContainerRef = useRef(null);
  const { socket } = useSocket();
  const [typing, setTyping] = useState('')
  const [conversationId, setConversationId] = useState(false)
  const [messages, setMessages] = useState([])
  const queryClient = useQueryClient();

  const conversationData = useQuery({
    queryKey: ['conversation', { sender_Id: selectedReceiverData._id, receiver_Id: auth.user._id }],
    queryFn: getConversation,
    enabled: false,
    select: (data) => {
      if (!data) {
        addConversation({ senderId: selectedReceiverData._id, receiver_id: auth.user._id })
        refetch()
      }
      return data
    }
  });

  useEffect(() => {
    if (conversationContainerRef.current) {
      conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchConversation = async () => {
      const freshData = await queryClient.fetchQuery({
        queryKey: ['conversation', { sender_Id: selectedReceiverData._id, receiver_Id: auth.user._id }],
        queryFn: getConversation,
      });
      setConversationId(freshData._id)
      setMessages(freshData.messages);
    };
    fetchConversation();
    const intervalId = setInterval(fetchConversation, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!auth || !socket || !selectedReceiverData) return

    //Typing event
    let activityTimer
    socket.on("typing", (senderName, conversation_id) => {
      if (conversation_id === conversationId) {
        setTyping(`${senderName} is typing...`)
        clearTimeout(activityTimer)
        activityTimer = setTimeout(() => {
          setTyping('');
        }, 3000)
      }
    })

    //NewMessage event
    socket.on("getMessage", (message, conversation_id) => {
      if (conversation_id === conversationId) {
        setMessages((prevData) => [...prevData, message])
        setTyping('')
        //queryClient.invalidateQueries(['conversations', { sender_Id: auth.user._id, receiver_Id: selectedReceiverData._id }]);
      }
    });

  }, [auth, socket, selectedReceiverData, conversationId])

  return (
    <Stack maxH='100%' justifyContent='space-between'>
      {selectedReceiverData && (
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
              <Stack h='100%' ref={conversationContainerRef} overflowY='auto'>
                {messages.length > 0 ? (
                  <Stack position='relative' h='100%' >
                    {messages.map((message, index) => (
                      <Stack key={index} display='flex' w='100%'>
                        {message.from === auth.user._id ? (
                          <Stack direction='row' alignSelf='end' alignItems='center'>
                            <Text fontSize='xs'>
                              <ElapsedTime time={message.created_at} dateNow={new Date()} />
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
                              <ElapsedTime time={message.created_at} dateNow={new Date()} />
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
  )
}

export default Messages