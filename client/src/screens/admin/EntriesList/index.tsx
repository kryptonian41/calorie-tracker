import EntriesList from '../../../components/EntryList'
import { deleteEntryByAdmin, updateEntryByAdmin, getAdminEntries } from '../../../redux/actions'
import { Box, Flex, Text } from '@chakra-ui/react';
import { AddEntryAdmin } from '../../../components/AddEntryAdmin';
import { addEntryByAdmin } from '../../../redux/actions';

export default function EntryList() {
  return <Flex direction={{ base: "column", md: "row" }}>
    <Box w={{ base: "100%", md: "25%" }}>
      <Text mb="3" fontSize="xl" casing="uppercase"> Add an Entry </Text>
      <AddEntryAdmin onAdd={addEntryByAdmin} />
    </Box>
    <Box flex="1" pl={{ base: 0, md: 8 }} pt={{ base: 8, md: 0 }} pb="8">
      <EntriesList deleteEntryAction={deleteEntryByAdmin} updateEntryAction={updateEntryByAdmin} refreshAction={getAdminEntries} showUserInfo={true} />
    </Box>
  </Flex>
}