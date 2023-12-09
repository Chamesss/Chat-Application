import React, { useState } from 'react'
import { Center, useColorMode, InputGroup, InputRightElement, Textarea, Stack } from '@chakra-ui/react'
import { BsSendFill } from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import CustomInput from './Input';
import { AttachmentIcon } from '@chakra-ui/icons';

const MessageInput = () => {
    const { colorMode } = useColorMode()
    const [message, setMessage] = useState(null)
    const handleInput = (e) => {
        e.preventDefault()
        setMessage(e.target.value)
        console.log(e.target.value)
        console.log(message)
    }
    return (
        <Center display='flex' direction='row'>
            <AttachmentIcon ml='0.8rem' fontSize='1.5rem' />

            <InputGroup size='lg'>
                <CustomInput overflow='visible' overflowWrap='break-word' resize='vertical' pr='4rem' onChange={(e) => handleInput(e)} />
                <InputRightElement width='3.5rem' height={'100%'}>
                    <MdOutlineEmojiEmotions style={{ color: colorMode === 'light' ? '#2A8BF2' : '#0E6DD8' }}
                        className={`${colorMode === 'light' ? 'icon-light' : 'icon-dark'} icon`} />
                </InputRightElement>
            </InputGroup>
            <BsSendFill className={`${message ? 'rotate' : 'init'}`}
                style={{ cursor: 'pointer', fontSize: '2rem', marginLeft: '0.8rem', color: colorMode === 'light' ? '#2A8BF2' : '#0E6DD8' }} />

        </Center>
    )
}

export default MessageInput