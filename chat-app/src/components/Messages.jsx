import { Divider, Stack, Text, useColorMode, Avatar, Skeleton, SkeletonCircle, Center } from '@chakra-ui/react'
import ActionMenu from './ActionMenu'
import MessageInput from './MessageInput'
import StartConversation from './StartConversation'
import { useMutation } from '@tanstack/react-query'
import { getConversation, messageSeen } from '../api/ChatApi'
import ElapsedTime from '../utils/ElapsedTime'
import { useEffect, useState, useRef } from 'react'
import { useChat } from '../Contexts/ChatProvider'

const Messages = ({ socket, authId, selectedReceiverData }) => {
  const { colorMode } = useColorMode()
  const conversationContainerRef = useRef(null);
  const { setOpened } = useChat()
  const [typing, setTyping] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {

    fetchConversationFunction()
  }, [])

  useEffect(() => {
    conversationContainerRef.current?.scrollTo?.(0, conversationContainerRef.current?.scrollHeight);
  }, [data]);

  useEffect(() => {
    socket.on("typing", handleTypingEvent);
    socket.on("getMessage", handleGetMessageEvent);
    socket.on("errorSendMessage", handleErrorSendMessageEvent);
    return () => {
      socket.off("typing", handleTypingEvent);
      socket.off("getMessage", handleGetMessageEvent);
      socket.off("errorSendMessage", handleErrorSendMessageEvent);
    };
  }, [data, typing]);

  const fetchConversationFunction = async () => {
    const response = await getConversation(selectedReceiverData._id, authId)
    response.success
      && (setData(response.data), setSuccess(true), setError(false), setLoading(false))
    response.data.messages[response.data.messages?.length - 1]?.to === authId &&
      !response.data.messages[response.data.messages.length - 1]?.seen.status &&
      (setOpened(true), mutation.mutate({ firstId: authId, secondId: selectedReceiverData._id }))
  }

  // Event listener for "typing" event
  const handleTypingEvent = (senderName, conversation_id) => {
    if (conversation_id === data._id) {
      setTyping(`${senderName} is typing...`);
      setTimeout(() => {
        setTyping('');
      }, 3000);
    }
  };

  // Event listener for "getMessage" event
  const handleGetMessageEvent = (message, conversation_id) => {
    if (conversation_id === data._id) {
      if (message.from !== authId) {
        mutation.mutate({ firstId: authId, secondId: selectedReceiverData._id });
      }
      updateMessages(message, conversation_id);
    }
  };

  // Event listener for "errorSendMessage" event
  const handleErrorSendMessageEvent = (message, conversation_id) => {
    if (conversation_id === data._id) {
      updateMessages(message);
    }
  };

  // Function to update messages
  const updateMessages = (message, conversation_id) => {
    setData((prevData) => ({
      ...prevData,
      messages: [...prevData.messages, message],
    }));
    setTyping('');
  };

  const mutation = useMutation({
    mutationFn: messageSeen
  })

  const calculDate = (date) => {
    const seenDate = new Date(date);
    return seenDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <Stack maxH='100%' justifyContent='space-between'>
      <Stack h='100%'>
        <ActionMenu data={selectedReceiverData} />
        <Divider />
        <Stack h='70vh' overflow='auto'>
          {loading && (
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
          {error && (
            <Center>
              <Text>Something went wrong.</Text>
            </Center>
          )}
          {success && (
            <Stack h='100%' ref={conversationContainerRef} overflowY='auto'>
              {data.messages.length > 0 ? (
                <Stack position='relative' h='100%' >
                  {data.messages.map((message, index) => (
                    <Stack key={index} display='flex' w='100%' onTouchStart={() => handleStackClick(message)}>
                      {message.from === authId ? (
                        <Stack direction='row' alignSelf='end' alignItems='center'>
                          {message.status === true ? (
                            <Stack direction='column' alignItems='end'>
                              <Stack display='flex' flexDirection='row' justifyContent='flex-end' alignItems='center'>
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
                              {data.messages.length - 1 === index && message.seen?.status && (
                                <Text fontSize='0.7rem' as='i' textAlign='left'>Seen at {calculDate(message.seen.date)}</Text>
                              )}
                            </Stack>
                          ) : (
                            <Stack direction='row' alignSelf='end' alignItems='center'>
                              <Text fontSize='xs'>Msg not sent</Text>
                              <Text
                                borderRadius={20}
                                px={4}
                                py={2}
                                w='fit-content'
                                color='red'
                                bgColor={colorMode === 'light' ? '#BABABA' : '#888888'}
                              >
                                {message.text}
                              </Text>
                            </Stack>
                          )}
                        </Stack>
                      ) : (
                        <Stack direction='row' w='fit-content' display='flex' alignItems='center'>
                          {index === 0 || data.messages[index - 1].to !== message.to ? (
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
          {data.messages?.length > 0 && <MessageInput data={data} />}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Messages