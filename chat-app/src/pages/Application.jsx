import React, { useEffect, useState } from 'react'
import { Stack } from '@chakra-ui/react'
import Chat from '../components/Chat'
import Messages from '../components/Messages'
import { ChatProvider } from '../Contexts/ChatProvider'
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket'

const Application = () => {
  const { auth } = useAuth();
  const { socket, setSocket } = useSocket();

  useEffect(() => {
    if (!auth) { return }
    if (!socket) {
      setSocket(io("ws://localhost:8080", {
        query: `user_id=${auth.user._id}`
      }))
      return
    }
    socket.emit("statusOnline", auth.user._id)
    return () => {
      socket?.off("connect");
    };
  }, [auth, socket])

  return (
    <ChatProvider>
      <Stack w='100%' m='auto' flexDirection='row' textAlign='center' px={6}>
        <Stack w='30%'>
          <Chat />
        </Stack>
        <Stack w='70%'>
          <Messages />
        </Stack>
      </Stack>
    </ChatProvider>
  )
}

export default Application