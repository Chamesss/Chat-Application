import { InputGroup, InputLeftElement, Stack, Input, useColorMode, AvatarBadge, Box, Text, Avatar, Center } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import OnlineUsers from './OnlineUsers'
import { useChat } from '../Contexts/ChatContext'

const Chat = () => {
    const { colorMode } = useColorMode()
    const { setSelectedConversation } = useChat()
    const Data = [
        { id: 1, name: 'Dan Abrahmov', src: 'https://bit.ly/dan-abramov', stats: 'green.500' },
        { id: 2, name: 'Kent Dodds', src: 'https://bit.ly/kent-c-dodds', stats: 'grey' },
        { id: 3, name: 'Ryan Florence', src: 'https://bit.ly/ryan-florence', stats: 'grey' },
        { id: 4, name: 'Prosper Otemuyiwa', src: 'https://bit.ly/prosper-baba', stats: 'grey' },
        { id: 5, name: 'Christian Nwamba', src: 'https://bit.ly/code-beast', stats: 'grey' },
        { id: 6, name: 'Segun Adebayo', src: 'https://bit.ly/sage-adebayo', stats: 'grey' }
    ]

    const handleConversationClick = (id) => {
        setSelectedConversation(id)
    }

    return (
        <Stack bgColor={colorMode === 'light' ? 'white' : '#131827'} p={6} borderRadius={15} boxShadow='md'>
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
            <OnlineUsers />
            <Stack maxH='68vh' overflow='auto'>
                {Data.map((user) => (
                    <Box p={1} w='100%' onClick={() => handleConversationClick(user.id)} display='flex' justifyContent='space-between' borderRadius='20px' sx={{
                        '&:hover': { backgroundColor: colorMode === 'light' ? '#F0F0F0' : '#2E3959', cursor: 'pointer' }
                    }}>
                        <Center direction='row' p={2}>
                            <Avatar size='lg' name={user.name} src={user.src}>
                                <AvatarBadge border='2px solid white' boxSize='0.6em' right='8px' bottom='8px' bg={user.stats} />
                            </Avatar>
                            <Stack ml='10px' textAlign='start'>
                                <Text fontWeight='700' fontSize='md'>{user.name}</Text>
                                <Text fontWeight='700' color='#6F7276' fontSize='sm'>This is last message</Text>
                            </Stack>
                        </Center>
                        <Stack display='flex' alignItems='center' p={2}>
                            <Text color='#6F7276' fontSize='xs'>20:08</Text>
                            <Text display='flex' justifyContent='center' alignItems='center' color='white' borderRadius='50px' bgColor='#FA474F' p={0} w='24px' h='24px'>2</Text>
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Stack>
    )
}

export default Chat