import React from 'react'
import { Avatar, Stack, AvatarBadge, useColorMode, Divider } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api/UserApi'
import { useChat } from '../Contexts/ChatProvider'

const OnlineUsers = () => {
  const { colorMode } = useColorMode()
  const { setSelectedReceiverData } = useChat()
  const Users = useQuery({
    queryKey: ['getUsers'],
    queryFn: getUsers
  })

  const handleConversationClick = (user) => {
    setSelectedReceiverData(user)
  }

  return (
    <>
      <Divider />
      <Stack w='100%' direction='row' overflow='auto' spacing='0.5rem' p={2}>
        {Users.data && Users.data.map((user, index) => (
          <Avatar size='lg' key={index} name={user.firstName} src={`./media/avatars/${user.avatar}.jpg`} sx={{
            borderRadius: '5px',
            border: 'none',
            p: '4px',
            transform: 'scale(1.08)',
            '&:hover': {
              cursor: 'pointer',
              backgroundColor: colorMode === 'light' ? '#F0F0F0' : '#2E3959'
            }
          }}
            onClick={() => handleConversationClick(user)}
          >
            <AvatarBadge border='2px solid white' boxSize='0.6em' right='8px' bottom='8px' bg={user.status === 'Online' ? 'green.500' : 'grey'} />
          </Avatar>
        ))}
      </Stack>
      <Divider />
    </>
  )
}

export default OnlineUsers