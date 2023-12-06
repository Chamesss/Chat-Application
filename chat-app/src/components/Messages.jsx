import DefaultMessage from './DefaultMessage'
import { Stack, Text, useColorMode } from '@chakra-ui/react'
import { useChat } from '../Contexts/ChatContext'
import { useEffect, useState } from 'react'

const Messages = () => {
  const { colorMode } = useColorMode()
  const { selectedConversationId } = useChat();
  const [conversationData, setConversationData] = useState(null);
  const myId = 5000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./dummy/dummy.json');
        const data = await response.json();
        const selectedConversation = data.find((conversation) =>
          conversation.participant.every((participant) => participant.user === selectedConversationId || participant.user === myId)
        );
        setConversationData(selectedConversation);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedConversationId]);

  return (
    <Stack bgColor={colorMode === 'light' ? 'white' : '#131827'} p={6} borderRadius={15} w='100%' h='100%' boxShadow='md'>
      {!selectedConversationId ? (
        <DefaultMessage />
      ) : (
        <>
          {conversationData ? (
            <>
              {conversationData.messages.map((message) => (
                <Stack display='flex' w='100%'>
                  {message.to === myId ? (
                    <Text
                      borderRadius={20}
                      px={4}
                      py={2}
                      w='fit-content'
                      color='white'
                      alignSelf='end'
                      bgColor={colorMode === 'light' ? '#2A8BF2' : '#0E6DD8'}
                    >
                      {message.text}
                    </Text>
                  ) : (
                    <Text
                      borderRadius={20}
                      px={4}
                      py={2}
                      w='fit-content'
                      alignSelf='start'
                      bgColor={colorMode === 'light' ? '#EAE8ED' : '#252E48'}
                    >
                      {message.text}
                    </Text>
                  )}
                </Stack>
              ))}
            </>
          ) : (
            <>
            </>
          )}
        </>
      )}
    </Stack>
  )
}

export default Messages