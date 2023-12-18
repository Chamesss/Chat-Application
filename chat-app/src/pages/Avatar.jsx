import React, { useState } from 'react'
import { Avatar, Center, Text, SimpleGrid, useColorMode, Button } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { selectAvatar } from '../api/UserApi'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const AvatarSelection = () => {
    const { auth, setAuth } = useAuth()
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: selectAvatar,
        onSuccess: (data) => {
            setAuth((prevData) => ({
                ...prevData,
                user: {
                    ...prevData.user,
                    avatar: data.avatar,
                },
            }));
            navigate('/application');
        },
    })
    const handleAvatarSelect = () => {
        mutation.mutate({ userId: auth.user._id, avatar });
    }
    const { colorMode } = useColorMode()
    const i = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <Center flexDirection='column'>
            <Text fontWeight='600' fontSize='lg'>Select the avatar that suits you.</Text>
            <SimpleGrid columns={4} spacing={20} mt={20} mb={20}>
                {i.map(index => (
                    <Avatar key={index} onClick={() => setAvatar(index)} size='2xl' src={`./media/avatars/${index}.jpg`} tabIndex={0}
                        sx={{
                            transition: 'transform .3s ease-out',
                            cursor: 'pointer',
                            ":hover": { transform: 'scale(1.1)' },
                            ":focus": { outline: `6px solid ${colorMode === 'light' ? '#131827' : 'rgb(255,255,255)'}`, transform: 'scale(1.1)' }
                        }}
                    />
                ))}
            </SimpleGrid>
            <Button onClick={handleAvatarSelect} boxShadow='base' mb={20} w='12rem' color='white' sx={{ '&:hover': { backgroundColor: colorMode === 'light' ? 'blue.500' : 'blue.700' } }} bg={colorMode === 'light' ? 'blue.400' : 'blue.600'}
                isDisabled={mutation.isPending || !avatar}
                type='submit'
            >
                {mutation.isPending ? 'Loading...' : 'Proceed'}</Button>
        </Center>
    )
}

export default AvatarSelection