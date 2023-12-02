import React from 'react'
import { Container, Stack, Text, Checkbox, Button, useColorMode, SimpleGrid } from '@chakra-ui/react'
import CustomInput from '../components/Input'
import { Link } from 'react-router-dom'

const Register = () => {
  const { colorMode } = useColorMode();
  return (
    <Container maxW='container.sm' p='15' centerContent>
      <Stack spacing='24px' display='flex' alignItems='center'>
        <Container centerContent>
          <img src='./media/logo.svg' alt='logo' style={{ maxWidth: '150px' }} />
        </Container>
        <Text fontSize='5xl' fontWeight='600'>Sign up</Text>
        <Text fontSize='md' mb='12px'>Sign up and start chatting right away!</Text>
        <Stack maxW={['100%', '80%', '80%', '80%']} spacing='20px' display='flex' alignItems='center'>
          <SimpleGrid columns={2} spacing={4}>
            <CustomInput
              placeholder='Firstname*'
              size='md'
              variant='outline'
              width='auto'
            />
            <CustomInput
              placeholder='Lastname*'
              size='md'
              variant='outline'
              width='auto'
            />
          </SimpleGrid>
          <CustomInput
            placeholder='Email*'
            size='md'
            variant='outline'
          />
          <CustomInput
            placeholder='Password*'
            size='md'
            type='password'
            variant='outline'
          />
          <Stack display='flex' w='100%' justifyContent='space-between' flexDirection='row'>
            <Checkbox maxW={300}
              sx={{
                'input:not(:checked) + span': {
                  backgroundColor: colorMode === 'light' ? 'gray.200' : 'gray.800',
                  borderColor: colorMode === 'light' ? 'gray.300' : 'gray.600',
                },
              }}
            >I want to receive inspiration, marketing promotions and updates via email.
            </Checkbox>
          </Stack>
          <Button w='100%' color='white' bg={colorMode === 'light' ? 'blue.400' : 'blue.600'}>Sign up</Button>
          <Link className='link-component' to='/login' style={{
            color: colorMode === 'light' ? '#004865' : '#90CAF9'
          }}>Already a member? Sign in instead</Link>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Register