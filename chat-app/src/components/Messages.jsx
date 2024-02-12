import { Divider, Stack, Text, Avatar, Skeleton, SkeletonCircle, Center } from '@chakra-ui/react'
import ActionMenu from './MessagesComponents/ActionMenu'
import MessageInput from './MessagesComponents/MessageInput'
import StartConversation from './MessagesComponents/StartConversation'
import { useMutation } from '@tanstack/react-query'
import { getConversation, messageSeen } from '../api/ChatApi'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useChat } from '../Contexts/ChatProvider'
import SenderMessage from './MessagesComponents/senderMessage'
import ReceiverMessage from './MessagesComponents/ReceiverMessage'

const Messages = ({ socket, authId, selectedReceiverData }) => {
  const [typing, setTyping] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [end, setEnd] = useState(false)
  const [currentScrollPosition, setCurrentScrollPosition] = useState(null)
  const messageContainerRef = useRef(null)
  const [bundle, setBundle] = useState(1)
  const { setChatId } = useChat()

  // Fetch conversation
  useEffect(() => {
    setEnd(false)
    setError(false)
    setBundle(1)
    setLoading(true)
    setSuccess(false)
    setData(null)
    fetchConversationFunction()
  }, [selectedReceiverData])

  // Socket events listeners
  useEffect(() => {
    socket.on("typing", handleTypingEvent)
    socket.on("getMessage", handleGetMessageEvent)
    socket.on("MessageSeen", handleSeenMessageEvent)
    socket.on("errorSendMessage", handleErrorSendMessageEvent)
    return () => {
      socket.off("typing", handleTypingEvent)
      socket.off("getMessage", handleGetMessageEvent)
      socket.off("MessageSeen", handleSeenMessageEvent)
      socket.off("errorSendMessage", handleErrorSendMessageEvent)
    };
  }, [data, typing]);

  // Scroll event after data display
  useEffect(() => {
    messageContainerRef.current?.scrollTo?.(0, messageContainerRef.current?.scrollHeight)
  }, [success])

  // Prev scroll event after pushing old data
  useLayoutEffect(() => {
    bundle > 1 && messageContainerRef.current?.scrollTo?.(0, messageContainerRef.current?.scrollHeight - currentScrollPosition)
  }, [data])

  // Fetch data when component mount && Handle seen status
  const fetchConversationFunction = async () => {
    const response = await getConversation(selectedReceiverData._id, authId, 1)
    response.success && (
      (setData(response.data), setSuccess(true), setError(false), setLoading(false), setChatId(response.data._id),
        (setBundle(prev => prev + 1)), (response.data.messages.length < 20 && setEnd(true))),
      response.data.messages[response.data.messages?.length - 1]?.to === authId &&
      !response.data.messages[response.data.messages.length - 1]?.seen.status &&
      (mutation.mutate({ firstId: authId, secondId: selectedReceiverData._id }),
        socket.emit('messageSeen', response.data.messages[response.data.messages.length - 1]._id,
          response.data._id, selectedReceiverData._id))
    )
    response.success === false && (
      setLoading(false), setData(null), setSuccess(false), setError(false), setChatId(null), setEnd(false), setBundle(1)
    )
  }

  // Event listener for "typing" event
  let activityTimer
  const handleTypingEvent = (senderName, conversation_id) => {
    conversation_id === data?._id && (() => {
      setTyping(`${senderName} is typing...`)
      clearTimeout(activityTimer)
      activityTimer = setTimeout(() => {
        setTyping('')
      }, 3000)
    })()
  };

  // Event listener for "seen" event
  const handleSeenMessageEvent = (message_id, conversation_id) => {
    conversation_id === data?._id &&
      setData((prevData) => ({
        ...prevData, messages: prevData.messages.map((message) =>
          message._id === message_id ? { ...message, seen: { status: true, date: new Date() } } : message
        ),
      }))
  }

  // Event listener for "getMessage" event
  const handleGetMessageEvent = (message, conversation_id) => {
    if (conversation_id === data._id) {
      message.from !== authId && (
        mutation.mutate({ firstId: authId, secondId: selectedReceiverData._id }),
        socket.emit('messageSeen', message._id, conversation_id, selectedReceiverData._id)
      )
      updateMessages(message, conversation_id)
    }
  };

  // Function for "errorSendMessage" event
  const handleErrorSendMessageEvent = (message, conversation_id) => {
    conversation_id === data._id && updateMessages(message)
  }

  // Function to update messages
  const updateMessages = (message) => {
    setData((prevData) => ({ ...prevData, messages: [...prevData.messages, message] }))
    setTyping('')
  }

  // Post seen mutation
  const mutation = useMutation({ mutationFn: messageSeen })

  // Function to form date
  const calculDate = (date) => {
    const seenDate = new Date(date)
    return seenDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Pagination handling
  const handleFetching = async () => {
    setCurrentScrollPosition(messageContainerRef.current.scrollHeight)
    const response = await getConversation(selectedReceiverData._id, authId, bundle)
    response.data.messages.length < 20 && setEnd(true)
    setBundle(prev => prev + 1)
    setData((prevData) => ({ ...prevData, messages: [...response.data.messages, ...(prevData.messages)] }))
  }

  // Scroll top event Listener
  const handleScroll = e => {
    e.target.scrollTop === 0 && !end && handleFetching()
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
          {success ? (
            <Stack h='100%' ref={messageContainerRef} overflowY='auto' onScroll={handleScroll}>
              {data.messages?.length > 0 && (
                <Stack id="messageContainer" position='relative' h='100%'>
                  {data.messages.map((message, index) => (
                    <Stack display='flex' w='100%'>
                      {message.from === authId ? (
                        <Stack direction='row' alignSelf='end' alignItems='center'>
                          <Stack direction='column' alignItems='end'>
                            <SenderMessage message={message} />
                            {data.messages.length - 1 === index && message.seen?.status && (
                              <Text fontSize='0.7rem' as='i' textAlign='left'>Seen at {calculDate(message.seen.date)}</Text>
                            )}
                          </Stack>
                        </Stack>
                      ) : (
                        <Stack direction='row' w='fit-content' display='flex' alignItems='center'>
                          {index === 0 || data.messages[index - 1].to !== message.to ? (
                            <Avatar size='sm' src={`./media/avatars/${selectedReceiverData.avatar}.jpg`} />
                          ) : (
                            <div style={{ marginLeft: '2rem' }} />
                          )}
                          <ReceiverMessage message={message} />
                        </Stack>
                      )}
                    </Stack>
                  ))}
                </Stack>
              )}
            </Stack>
          ) :
            <>
              {!loading && (
                <StartConversation data={selectedReceiverData} />
              )}
            </>
          }
        </Stack>
        <Stack>
          <Text as='i' fontSize='sm' textAlign='start' h='15px'>{typing}</Text>
        </Stack>
        <Stack display='flex' justifySelf='flex-end'>
          <MessageInput data={data} fetchConversationFunction={fetchConversationFunction} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Messages