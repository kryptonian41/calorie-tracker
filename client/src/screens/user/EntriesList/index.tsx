import { Box } from '@chakra-ui/layout'
import EntriesList from '../../../components/EntryList'
import { deleteEntry, updateEntry, getUserBootstrapData } from '../../../redux/actions/user'

export default function EntryList() {
  return <Box pl="8"><EntriesList deleteEntryAction={deleteEntry} updateEntryAction={updateEntry} refreshAction={getUserBootstrapData} /></Box>
}