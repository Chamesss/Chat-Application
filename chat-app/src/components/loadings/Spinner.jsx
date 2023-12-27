import React from 'react'
import SyncLoader from "react-spinners/SyncLoader";
import { Center } from '@chakra-ui/react';


const Spinner = () => {
    return (
        <Center h='100vh'>
            <SyncLoader />
        </Center>
    )
}

export default Spinner