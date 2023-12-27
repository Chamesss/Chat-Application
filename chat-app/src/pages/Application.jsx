import React, { useEffect, useState } from 'react'
import { Stack, useColorMode } from '@chakra-ui/react'
import Chat from '../components/Chat'
import Messages from '../components/Messages'
import { useChat } from '../Contexts/ChatProvider'
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket'
import DefaultMessage from '../components/MessagesComponents/DefaultMessage'

const Application = () => {
  const { auth } = useAuth()
  const { socket, setSocket } = useSocket()
  const { selectedReceiverData } = useChat()
  const { colorMode } = useColorMode()

  useEffect(() => {
    if (!auth) return
    if (!socket) {
      setSocket(io("ws://localhost:8080", {
        query: `user_id=${auth.user._id}`
      }))
    }
    return () => {
      socket?.off("connect");
    };
  }, [auth])

  return (
    <Stack w='100%' m='auto' flexDirection='row' textAlign='center' px={6}>
      <Stack w='30%'>
        {socket && auth && <Chat socket={socket} authId={auth.user._id} />}
      </Stack>
      <Stack w='70%'>
        {socket && auth && <Stack bgColor={colorMode === 'light' ? 'white' : '#131827'} p={6} borderRadius={15} w='100%' h='95vh' boxShadow='md'>
          {selectedReceiverData ? (<Messages socket={socket} authId={auth.user._id} selectedReceiverData={selectedReceiverData} />) : (<DefaultMessage />)}
        </Stack>}
      </Stack>
    </Stack>
  )
}

export default Application