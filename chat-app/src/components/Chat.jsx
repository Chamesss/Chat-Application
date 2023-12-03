import { InputGroup, InputLeftElement, Stack, Input, useColorMode, Divider, Box, Text, Avatar, Center } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import OnlineUsers from './OnlineUsers'

const Chat = () => {
    const { colorMode } = useColorMode()
    return (
        <Stack p={4}>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <Search2Icon />
                </InputLeftElement>
                <Input
                    variant='flushed'
                    placeholder='Search...'
                    sx={{
                        borderColor: colorMode === 'light' ? 'gray.300' : 'gray.600',
                    }}
                />
            </InputGroup>
            <OnlineUsers />
            <Divider opacity={1} />


            <Box p={1} w='100%' display='flex' justifyContent='space-between' borderRadius='20px' sx={{
                ':hover': { backgroundColor: '#F0F0F0', cursor: 'pointer' }
            }}>
                <Center direction='row' p={2}>
                    <Avatar size='lg' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
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

            <Box p={1} w='100%' display='flex' justifyContent='space-between' borderRadius='20px' sx={{
                ':hover': { backgroundColor: '#F0F0F0', cursor: 'pointer' }
            }}>
                <Center direction='row' p={2}>
                    <Avatar size='lg' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                    <Stack ml='10px' textAlign='start'>
                        <Text fontWeight='700' fontSize='md'>Kent Dodds</Text>
                        <Text fontWeight='700' color='#6F7276' fontSize='sm'>This is another last message</Text>
                    </Stack>
                </Center>
                <Stack display='flex' alignItems='center' p={2}>
                    <Text color='#6F7276' fontSize='xs'>19:58</Text>
                    <Text display='flex' justifyContent='center' alignItems='center' color='white' borderRadius='50px' bgColor='#FA474F' p={0} w='24px' h='24px'>1</Text>
                </Stack>
            </Box>

            <Box p={1} w='100%' display='flex' justifyContent='space-between' borderRadius='20px' sx={{
                ':hover': { backgroundColor: '#F0F0F0', cursor: 'pointer' }
            }}>
                <Center direction='row' p={2}>
                    <Avatar size='lg' name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                    <Stack ml='10px' textAlign='start'>
                        <Text fontWeight='500' fontSize='md'>Ryan Florence</Text>
                        <Text fontWeight='500' color='#6F7276' fontSize='sm'>You: This is last message</Text>
                    </Stack>
                </Center>
                <Stack display='flex' alignItems='center' p={2}>
                    <Text color='#6F7276' fontSize='xs'>15:23</Text>
                </Stack>
            </Box>


        </Stack>
    )
}

export default Chat