import { InputGroup, InputLeftElement, Stack, Input, useColorMode, AvatarBadge, Box, Text, Avatar, Center } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import OnlineUsers from './ChatComponents/OnlineUsers'
import { useChat } from '../Contexts/ChatProvider'
import { getConversations } from '../api/ChatApi'
import { useState, useEffect, useLayoutEffect } from 'react'
import ElapsedTime from '../utils/ElapsedTime'
import SyncLoader from "react-spinners/SyncLoader";

const Chat = ({ socket, authId }) => {
    const { colorMode } = useColorMode()
    const { setSelectedReceiverData, selectedReceiverData, chatId } = useChat()
    const [conversations, setConversations] = useState([])
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    // the refetching of the conversations isn't updating the conversations instantly
    // with the current state, to be fixed up...
    useEffect(() => {
        const interval = setInterval(() => {
            fetchDataAndSetConversations()
        }, 2500);
        return () => clearInterval(interval);
    }, [chatId]);

    // Socket event listeners
    useEffect(() => {
        socket.on("getMessage", handleNewMessage);
        return () => {
            socket.off("getMessage", handleNewMessage);
        };
    }, [conversations])

    // Function to fetch conversations
    const fetchDataAndSetConversations = async () => {
        const response = await getConversations(authId)
        response.success
            ? (setConversations(response.data), setLoading(false), setSuccess(true), setError(false))
            : (setLoading(false), setSuccess(false), setError(true));
    };

    // Function to handle new message
    const handleNewMessage = async (message, conversation_id) => {
        const conversationIndex = conversations?.findIndex((conv) => conv._id === conversation_id);
        if (!conversationIndex || conversationIndex < 0) {
            await fetchDataAndSetConversations()
        }
        conversation_id === chatId && message.from !== authId && (message.seen.status = true)
        setConversations((prevConversations) =>
            prevConversations.map((conv, index) =>
                index === conversationIndex ? { ...conv, messages: [...conv.messages, message] } : conv
            )
        );
    };

    // Function to count unseen messages
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

    //handle Chat click
    const handleBoxClick = (user, index) => {
        setSelectedReceiverData(user);
        setConversations(prevCnv => {
            const updatedConversations = [...prevCnv];
            updatedConversations[index].messages.map(c => c.seen.status = true)
            //updatedConversations[index].messages[updatedConversations[index].messages.length - 1].seen.status = true;
            return updatedConversations;
        });
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
                    {conversations.map((data, index) => (
                        <>
                            {data.messages.length > 0 && (
                                <Box p={1} w='100%' onClick={() => handleBoxClick(data.user, index)} display='flex' justifyContent='space-between' borderRadius='20px'
                                    bgColor={selectedReceiverData?._id === data.user._id ? colorMode === 'light' ? '#F0F0F0' : '#2E3959' : ''}
                                    sx={{
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
                        </>
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