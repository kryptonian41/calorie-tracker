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
      <Flex>
        <Box w="25%">
          <Text mb="3" fontSize="xl" casing="uppercase"> Add an Entry </Text>
          <AddEntry onAdd={addEntry} />
          <Box mt="6">
            <WarningNotification />
          </Box>
        </Box>
        <Box flex="1">
          <UserAppRouter />
        </Box>
      </Flex>
    </Container>

  )
}

export default UserLayout
