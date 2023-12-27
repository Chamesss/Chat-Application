import React, { useState } from 'react'
import {
    Center, useColorMode, InputGroup, InputRightElement, Stack,
    MenuButton,
    MenuList,
    Menu,
} from '@chakra-ui/react'
import { BsSendFill } from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import CustomInput from '../Input';
import EmojiPicker from 'emoji-picker-react';
import { IoMdPhotos } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import useSocket from '../../hooks/useSocket';
import { useChat } from '../../Contexts/ChatProvider';
import useAuth from '../../hooks/useAuth';

const MessageInput = ({data}) => {
    const { colorMode } = useColorMode()
    const { socket } = useSocket()
    const { selectedReceiverData } = useChat()
    const { auth } = useAuth()
    const [message, setMessage] = useState(null)

    const handleInput = (e) => {
        e.preventDefault()
        setMessage(e.target.value)
        socket.emit("typing", data._id, auth.user.firstName, selectedReceiverData._id)
    }
    const handleEmojiClick = (emoji) => {
        setMessage((prevMessage) => prevMessage + emoji.emoji);
    };
    const handleImageUpload = () => {
        document.getElementById('imageUploadInput').click();
    };

    const handleAttachmentUpload = () => {
        document.getElementById('attachmentUploadInput').click();
    };

    const handleSubmit = async () => {
        socket.emit("sendMessage",
            auth.user._id,
            selectedReceiverData._id,
            data._id,
            message,
        );
        setMessage('')
    }

    return (
        <Center display='flex' direction='row'>
            <Stack display='flex' direction='row' >
                <label htmlFor="imageUploadInput" className={`${colorMode === 'light' ? 'icon-light' : 'icon-dark'} icon-2 margin-right`} style={{ cursor: 'pointer', color: colorMode === 'light' ? '#2A8BF2' : '#0E6DD8' }}>
                    <IoMdPhotos fontSize='1.8rem' />
                </label>
                <input
                    id="imageUploadInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
                <label htmlFor="attachmentUploadInput" className={`${colorMode === 'light' ? 'icon-light' : 'icon-dark'} icon-2 margin-right`} style={{ cursor: 'pointer', color: colorMode === 'light' ? '#2A8BF2' : '#0E6DD8' }}>
                    <GrAttachment fontSize='1.8rem' />
                </label>
                <input
                    id="attachmentUploadInput"
                    type="file"
                    accept="*"
                    style={{ display: 'none' }}
                    onChange={handleAttachmentUpload}
                />
            </Stack>
            <InputGroup size='lg' ml='1rem'>
                <CustomInput overflow='visible' overflowWrap='break-word' resize='vertical' pr='4rem' value={message} onChange={(e) => handleInput(e)} />
                <InputRightElement width='3.5rem' height={'100%'}>
                    <Menu placement='top'>
                        <MenuButton>
                            <MdOutlineEmojiEmotions style={{ color: colorMode === 'light' ? '#2A8BF2' : '#0E6DD8' }}
                                className={`${colorMode === 'light' ? 'icon-light' : 'icon-dark'} icon`} />
                        </MenuButton>
                        <MenuList p={0} border='none'>
                            <EmojiPicker onEmojiClick={(emoji) => handleEmojiClick(emoji)} />
                        </MenuList>
                    </Menu>

                </InputRightElement>
            </InputGroup>
            <form  style={{ display: 'flex', flexDirection: 'row' }}>
                <label onClick={handleSubmit} className={`${colorMode === 'light' ? 'icon-light' : 'icon-dark'} icon-2 margin-left`} style={{ cursor: 'pointer', color: colorMode === 'light' ? '#2A8BF2' : '#0E6DD8' }}>
                    <BsSendFill fontSize='1.8rem' className={`${message ? 'rotate' : 'init'}`} style={{ marginRight: '5px' }} />
                </label>
            </form>
        </Center>
    )
}

export default MessageInput