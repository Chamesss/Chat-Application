import React, { useState } from 'react'
import { Container, Stack, Text, Checkbox, Button, useColorMode } from '@chakra-ui/react'
import CustomInput from '../components/Input'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { login } from '../api/UserApi';
import { useMutation } from '@tanstack/react-query'

const Login = () => {
  const { colorMode } = useColorMode();
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth({ user: data.user, accessToken: data.accessToken })
      setUser('');
      setPwd('');
      navigate('/application');
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd)
    mutation.mutate({ user, pwd });
  }

  return (
    <Container maxW='container.sm' p='15' centerContent>
      <Stack spacing='24px' display='flex' alignItems='center'>
        <Container centerContent>
          <img src='./media/logo.svg' alt='logo' style={{ maxWidth: '150px' }} />
        </Container>
        <Text fontSize='5xl' fontWeight='600'>Sign in</Text>
        <Text fontSize='md' mb='12px'>Sign in and start chatting right away!</Text>
        <form onSubmit={handleSubmit}>
          <Stack w='100%' spacing='20px' display='flex' alignItems='center'>
            <CustomInput
              placeholder='Username*'
              size='md'
              variant='outline'
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
            <CustomInput
              placeholder='Password*'
              size='md'
              type='password'
              variant='outline'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
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
              <Link className='link-component' to='null' style={{
                color: colorMode === 'light' ? '#004865' : '#90CAF9',
              }}>Forgot password?</Link>
            </Stack>
            <Button boxShadow='base' w='100%' color='white' sx={{ '&:hover': { backgroundColor: colorMode === 'light' ? 'blue.500' : 'blue.700' } }} bg={colorMode === 'light' ? 'blue.400' : 'blue.600'}
              isDisabled={mutation.isPending || !user || !pwd}
              type='submit'
            >
              {mutation.isPending ? 'Logging in...' : 'Login'}</Button>
            {mutation.error && <span>{mutation.error.message}</span>}
            <Link className='link-component' to='/register' style={{
              color: colorMode === 'light' ? '#004865' : '#90CAF9'
            }}>Not a member? Create an account</Link>
          </Stack>
        </form>
      </Stack>
    </Container >
  )
}

export default Login