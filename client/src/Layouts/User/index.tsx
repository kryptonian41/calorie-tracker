import React from 'react'
import UserAppRouter from '../../router/user'
import { Box, Container, Flex, Text, Stack } from '@chakra-ui/react'
import AddEntry from '../../components/AddEntry'
import { addEntry } from "../../redux/actions/user";


const UserLayout = () => {
  return (
    <Container maxW="container.xl">
      <Box pt="4" fontSize="3xl">Calorie Tracker</Box>
      <Stack direction="row" mt="3" mb="8">
        <Box background="teal" w="150px" height="5px"></Box>
        <Box background="whiteAlpha.700" w="50px" height="5px"></Box>
      </Stack>
      <Flex>
        <Box w="25%">
          <Text mb="3" fontSize="xl"> Add an Entry </Text>
          <AddEntry onAdd={addEntry} />
        </Box>
        <Box flex="1">
          <UserAppRouter />
        </Box>
      </Flex>
    </Container>

  )
}

export default UserLayout
