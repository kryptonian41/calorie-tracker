import { Box, Container, Flex, Text, useToast } from '@chakra-ui/react';
import AddEntry from '../../components/AddEntry';
import { AddFriendForm } from '../../components/AddFriendWidget';
import WarningNotification from '../../components/WarningNotification';
import { addEntry } from "../../redux/actions/user";
import UserAppRouter from '../../router/user';
import { inviteUser } from '../../utils/api';
import { UserHeader } from '../Header';

const UserLayout = () => {
  const toast = useToast()

  return (
    <Container maxW="container.xl">
      <UserHeader />
      <Flex direction={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "25%" }}>
          <Text mb="3" fontSize="xl" casing="uppercase"> Add an Entry </Text>
          <AddEntry onAdd={addEntry} />
          <WarningNotification />
          <AddFriendForm onSubmit={async (values, { setSubmitting, resetForm }) => {
            const { email, password } = await inviteUser(values.name, values.email)
            setSubmitting(false);
            resetForm()
            toast({
              title: "Account created.",
              description: `We've created an account for ${email}\n Password: ${password}`,
              status: "success",
              duration: 9000,
              isClosable: true,
            })
          }} />
        </Box>
        <Box flex="1" pl={{ base: 0, md: 8 }} pt={{ base: 8, md: 0 }} pb="8">
          <UserAppRouter />
        </Box>
      </Flex>
    </Container>

  )
}

export default UserLayout
