import React, { useState } from 'react'
import { Container, Stack, Text, Checkbox, Button, useColorMode, SimpleGrid } from '@chakra-ui/react'
import CustomInput from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/UserApi';
import useAuth from '../hooks/useAuth';
import { useMutation } from '@tanstack/react-query'

const Register = () => {
  const { colorMode } = useColorMode();
  const [firstName, setFirstname] = useState(null)
  const [lastName, setLastname] = useState(null)
  const [email, setEmail] = useState(null)
  const [pwd, setPwd] = useState(null)
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth({ user: data.user, accessToken: data.accessToken })
      navigate('/avatar');
    },
    // onMutate: async ({ firstName, lastName, email, pwd }) => {
    //   if (pwd !== matchPwd) {
    //     throw new Error("Passwords doesn't match")
    //   }
    //   return { firstName, lastName, email, pwd }
    // }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ firstName, lastName, email, pwd })
  }

  return (
    <Container maxW='container.sm' centerContent>
      <form onSubmit={handleSubmit}>
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
                onChange={(e) => setFirstname(e.target.value)}
                value={firstName}
              />
              <CustomInput
                placeholder='Lastname*'
                size='md'
                variant='outline'
                width='auto'
                onChange={(e) => setLastname(e.target.value)}
                value={lastName}
              />
            </SimpleGrid>
            <CustomInput
              placeholder='Email*'
              size='md'
              variant='outline'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
            <Button isDisabled={!firstName || !lastName || !email || !pwd} type='submit' boxShadow='base' w='100%' color='white' sx={{ '&:hover': { backgroundColor: colorMode === 'light' ? 'blue.500' : 'blue.700' } }} bg={colorMode === 'light' ? 'blue.400' : 'blue.600'}
            >
              {mutation.isPending ? 'Pending...' : 'Register'}
            </Button>
            {mutation.error && <span>{mutation.error.message}</span>}
            <Link className='link-component' to='/login' style={{
              color: colorMode === 'light' ? '#004865' : '#90CAF9'
            }}>Already a member? Sign in instead</Link>
          </Stack>
        </Stack>
      </form>
    </Container>
  )
}

export default Register