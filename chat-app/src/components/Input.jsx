import React from 'react';
import { Input as ChakraInput, useColorMode } from '@chakra-ui/react';

const CustomInput = (props) => {
  const { colorMode } = useColorMode();

  return (
    <ChakraInput
      {...props}
      sx={{
        backgroundColor: colorMode === 'light' ? 'gray.200' : 'gray.800',
        borderColor: colorMode === 'light' ? 'gray.300' : 'gray.600',
        _hover: {
          borderColor: colorMode === 'light' ? 'gray.500' : 'gray.400',
        },
        _focus: {
          borderColor: 'blue.500',
          boxShadow: `0 0 0 1px ${colorMode === 'light' ? 'blue.500' : 'blue.300'}`,
        },
      }}
    />
  );
};

export default CustomInput;