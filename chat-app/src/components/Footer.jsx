import { Container, useColorMode, VStack, Text, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { GitSvg, LinkedinSvg, WhatsappSvg, Phone, Email } from '../styles/svgs'

const Footer = () => {
    const { colorMode } = useColorMode()
    const handleEmailClick = () => {
        window.location.href = `mailto:chamsedin.azouz@gmail.com`;
    }
    return (
        <Container bgColor={colorMode === 'light' ? '#000032' : '#00001E'} maxW={'97%'} textAlign='center' centerContent p={8} mt={8} mb={5} borderRadius={6} boxShadow='dark-lg'>
            <VStack>
                <HStack spacing={6}>
                    <GitSvg /><LinkedinSvg /><WhatsappSvg />
                </HStack>
                <Stack display={'flex'} w='120%' justifyContent='space-between' alignItems={'center'} p={2} direction={['column', 'row']} mt={4}>
                    <HStack display={'flex'} columnGap={2}>
                        <Phone /> <Text color={'#EEF5FF'}>+216 92448974</Text>
                    </HStack>
                    <HStack display={'flex'} columnGap={2}>
                        <Email /> <Text sx={{ '&:hover': { cursor: 'pointer' } }} onClick={handleEmailClick} color={'#EEF5FF'}>chamsedin.azouz@gmail.com</Text>
                    </HStack>
                </Stack>
            </VStack>
            <Stack display='flex' direction={['column', 'row']} justifyContent='space-around' w='100%' mt={8}>
                <Text color={'rgba(255,255,255,0.7)'}>
                    Copyright &copy; 2023 All Rights Reserved.
                </Text>
                <Text color={'rgba(255,255,255,0.7)'}>
                    Created by <span style={{ color: 'white', fontWeight: '700', opacity: '1' }}>Chamsedin Azouz</span>.
                </Text>
            </Stack>
        </Container>
    )
}

export default Footer