import { Input as ChakraInput, InputProps as ChakraInputProps, FormLabel, FormControl } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
  = ({ name, label, ...rest }, ref) => {
    return (
      <FormControl>
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        <ChakraInput
          ref={ref}
          name={name}
          id={name}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: 'gray.900'
          }}
          size="lg"
          {...rest}
        />
      </FormControl>
    )
  }

export const Input = forwardRef(InputBase)