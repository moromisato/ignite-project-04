import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">

      { showProfileData && (
        <Box mr="4" textAlign="right">
         <Text>Luís Moromisato</Text>
         <Text color="gray.300" fontSize="small">
           moromisato.luis@gmail.com
         </Text>
       </Box>
      )}
    
      <Avatar size="md" name="Luís Moromisato" src="https://github.com/moromisato.png" />

    </Flex>
  )
}