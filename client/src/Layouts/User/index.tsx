import { Box, Container, Flex, Text } from '@chakra-ui/react';
import AddEntry from '../../components/AddEntry';
import WarningNotification from '../../components/WarningNotification';
import { addEntry } from "../../redux/actions/user";
import UserAppRouter from '../../router/user';
import { UserHeader } from '../Header';

const UserLayout = () => {
  return (
    <Container maxW="container.xl">
      <UserHeader />
      <Flex direction={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "25%" }}>
          <Text mb="3" fontSize="xl" casing="uppercase"> Add an Entry </Text>
          <AddEntry onAdd={addEntry} />
          <WarningNotification />
        </Box>
        <Box flex="1" pl={{ base: 0, md: 8 }} py={{ base: 8, md: 0 }}>
          <UserAppRouter />
        </Box>
      </Flex>
    </Container>

  )
}

export default UserLayout
