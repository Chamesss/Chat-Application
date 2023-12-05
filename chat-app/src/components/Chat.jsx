import { InputGroup, InputLeftElement, Stack, Input, useColorMode, AvatarBadge, Box, Text, Avatar, Center } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import OnlineUsers from './OnlineUsers'

const Chat = () => {
    const { colorMode } = useColorMode()
    const Data = [
        { name: 'Dan Abrahmov', src: 'https://bit.ly/dan-abramov', stats: 'green.500' },
        { name: 'Kent Dodds', src: 'https://bit.ly/kent-c-dodds', stats: 'grey' },
        { name: 'Ryan Florence', src: 'https://bit.ly/ryan-florence', stats: 'grey' },
        { name: 'Prosper Otemuyiwa', src: 'https://bit.ly/prosper-baba', stats: 'grey' },
        { name: 'Christian Nwamba', src: 'https://bit.ly/code-beast', stats: 'grey' },
        { name: 'Segun Adebayo', src: 'https://bit.ly/sage-adebayo', stats: 'grey' }
    ]
    return (
        <Stack p={4}>
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
            <Stack maxH='60vh' overflow='auto'>
                {Data.map((user) => (
                    <Box p={1} w='100%' display='flex' justifyContent='space-between' borderRadius='20px' sx={{
                        '&:hover': { backgroundColor: colorMode === 'light' ? '#F0F0F0' : '#2E3959', cursor: 'pointer' }
                    }}>
                        <Center direction='row' p={2}>
                            <Avatar size='lg' name={user.name} src={user.src}>
                                <AvatarBadge border='2px solid white' boxSize='0.6em' right='8px' bottom='8px' bg={user.stats} />
                            </Avatar>
                            <Stack ml='10px' textAlign='start'>
                                <Text fontWeight='700' fontSize='md'>Dan Abrahmov</Text>
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