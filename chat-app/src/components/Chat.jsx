import { InputGroup, InputLeftElement, Stack, Input, useColorMode, AvatarBadge, Box, Text, Avatar, Center } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import OnlineUsers from './OnlineUsers'
import { useChat } from '../Contexts/ChatProvider'
import { getConversations } from '../api/ChatApi'
import { useState, useEffect } from 'react'
import ElapsedTime from '../utils/ElapsedTime'
import SyncLoader from "react-spinners/SyncLoader";

const Chat = ({ socket, authId }) => {
    const { colorMode } = useColorMode()
    const { setSelectedReceiverData, opened, selectedReceiverData } = useChat()
    const [conversations, setConversations] = useState([])
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchDataAndSetConversations()
    }, [])

    useEffect(() => {
        console.log('aaaaa')
        setConversations((prevConversations) =>
            prevConversations.map((conv) =>
                conv._id === selectedReceiverData
                    ? {
                        ...conv,
                        messages: conv.messages.map((msg, index) =>
                            index === conv.messages.length - 1
                                ? { ...msg, seen: { status: true } }
                                : msg
                        ),
                    }
                    : conv
            )
        );
    }, [selectedReceiverData]);

    useEffect(() => {
        socket.on("getMessage", handleNewMessage);
        return () => {
            socket.off("getMessage", handleNewMessage);
        };
    }, [conversations])

    const fetchDataAndSetConversations = async () => {
        const response = await getConversations(authId)
        response.success
            ? (setConversations(response.data), setLoading(false), setSuccess(true), setError(false))
            : (setLoading(false), setSuccess(false), setError(true));
    };

    const handleNewMessage = (message, conversation_id) => {
        console.log('new message arrived');
        const conversationIndex = conversations.findIndex((conv) => conv._id === conversation_id);
        setConversations((prevConversations) =>
            prevConversations.map((conv, index) =>
                index === conversationIndex ? { ...conv, messages: [...conv.messages, message] } : conv
            )
        );
    };

    const handleConversationClick = (data) => {
        setSelectedReceiverData(data.user)
    }

    const Count = (data) => {
        let e = 0;
        let i = data.messages.length - 1;
        do {
            e++
            i--
        } while (i > 0 && data.messages[i].from !== authId && !data.messages[i].seen.status)
        if (e > 9) return '+9'
        return e.toString()
    };

    return (
        <Stack bgColor={colorMode === 'light' ? 'white' : '#131827'} p={6} borderRadius={15} boxShadow='md' h='95vh'>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <Search2Icon />
                </InputLeftElement>
                <Input
                    variant='filled'
                    placeholder='Search...'
                    border='none'
                    borderRadius='50px'
                    mb='10px'
                    sx={{
                        borderColor: colorMode === 'light' ? 'gray.300' : 'gray.600',
                    }}
                />
            </InputGroup>
            <Stack>
                <OnlineUsers />
            </Stack>
            {loading && (
                <Center h='100%'>
                    <SyncLoader />
                </Center>
            )}
            {error && (
                <Center h='100%'>
                    <Text>Something went wrong.</Text>
                    <Text>Try reloading the page.</Text>
                </Center>
            )}
            {success && conversations?.length > 0 && (
                <Stack overflow='auto'>
                    {conversations.map((data) => (
                        <Stack key={data._id}>
                            {data.messages.length > 0 && (
                                <Box p={1} w='100%' onClick={() => handleConversationClick(data)} display='flex' justifyContent='space-between' borderRadius='20px' sx={{
                                    '&:hover': { backgroundColor: colorMode === 'light' ? '#F0F0F0' : '#2E3959', cursor: 'pointer' }
                                }}>
                                    <Center direction='row' p={2}>
                                        <Avatar size='lg' name={data.user.firstName} src={`./media/avatars/${data.user.avatar}.jpg`}>
                                            <AvatarBadge border='2px solid white' boxSize='0.6em' right='8px' bottom='8px' bg={data.user.status === 'Online' ? 'green.500' : 'grey'} />
                                        </Avatar>
                                        <Stack ml='10px' textAlign='start'>
                                            <Text fontWeight='700' fontSize='md'>{data.user.firstName + ' ' + data.user.lastName}</Text>
                                            {data.messages[data.messages.length - 1].from === authId
                                                ? <Text fontWeight='500' color='#6F7276' fontSize='sm'>You: {data.messages[data.messages.length - 1].text}</Text>
                                                : <>
                                                    {!data.messages[data.messages.length - 1].seen?.status ? (
                                                        <Text fontWeight='700' color='#6F7276' fontSize='sm'>{data.user.firstName}: {data.messages[data.messages.length - 1].text}</Text>
                                                    ) : (<Text fontWeight='500' color='#6F7276' fontSize='sm'>{data.user.firstName}: {data.messages[data.messages.length - 1].text}</Text>)
                                                    }
                                                </>
                                            }
                                        </Stack>
                                    </Center>
                                    <Stack display='flex' alignItems='center' p={2}>
                                        <Text color='#6F7276' fontSize='xs'><ElapsedTime time={data.messages[data.messages.length - 1].created_at} dateNow={new Date()} /></Text>
                                        {data.messages[data.messages.length - 1].from !== authId && !data.messages[data.messages.length - 1].seen.status &&
                                            <Text display='flex' justifyContent='center' alignItems='center' color='white' borderRadius='50px' bgColor='#FA474F' p={0} w='20px' h='20px'>
                                                {Count(data)}
                                            </Text>}
                                    </Stack>
                                </Box>
                            )}
                        </Stack>
                    ))}
                </Stack>
            )}
            {success && conversations?.length === 0 && (
                <Center h='100%'>
                    <Text>No conversations yet.</Text>
                </Center>
            )}
        </Stack >
    )
}

export default Chat