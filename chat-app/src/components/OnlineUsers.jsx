import React from 'react'
import { Avatar, Stack, AvatarBadge, useColorMode } from '@chakra-ui/react'

const OnlineUsers = () => {
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
    <Stack w='100%' direction='row' overflow='auto' spacing='0.5rem' p={2}>
      {Data.map((user, index) => (
        <Avatar size='lg' key={index} name={user.name} src={user.src} sx={{
          borderRadius: '5px',
          border: 'none',
          p: '4px',
          transform: 'scale(1.08)',
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: colorMode === 'light' ? '#F0F0F0' : '#2E3959'
          }
        }}>
          <AvatarBadge border='2px solid white' boxSize='0.6em' right='8px' bottom='8px' bg={user.stats} />
        </Avatar>
      ))}
    </Stack>
  )
}

export default OnlineUsers