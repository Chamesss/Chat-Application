import React from 'react'
import { Container, Stack, Text, Checkbox, Link, Button, useColorMode, Input } from '@chakra-ui/react'
import CustomInput from '../components/Input'


const Login = () => {
  const { colorMode } = useColorMode();
  return (
    <Container maxW='container.sm' p='15' centerContent>
      <Stack spacing='24px' display='flex' alignItems='center'>
        <Container centerContent>
          <img src='./media/logo.svg' alt='logo' style={{ width: "50%" }} />
        </Container>
        <Text fontSize='5xl' fontWeight='600'>Sign in</Text>
        <Text fontSize='md' mb='12px'>Sign in and start chatting right away!</Text>
        <Stack w='100%' spacing='20px' display='flex' alignItems='center'>
          <CustomInput
            placeholder='Email*'
            size='md'
            variant='outline'
          />
          <CustomInput
            placeholder='Pasword*'
            size='md'
            type='password'
            variant='outline'
          />
          <Stack display='flex' w='100%' justifyContent='space-between' flexDirection='row'>
            <Checkbox defaultChecked
            sx={{
              'input:not(:checked) + span': {
                backgroundColor: colorMode === 'light' ? 'gray.200' : 'gray.800',
                borderColor: colorMode === 'light' ? 'gray.300' : 'gray.600',
              },
            }}
            >Remember me</Checkbox>
            <Link color={colorMode === 'light' ? 'blue.700' : 'blue.200'}>Forgot password?</Link>
          </Stack>
          <Button w='100%' color='white' bg={colorMode === 'light' ? 'blue.400' : 'blue.600'}>Login</Button>
          <Link color={colorMode === 'light' ? 'blue.700' : 'blue.200'}>Not a member? Create an account</Link>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Login