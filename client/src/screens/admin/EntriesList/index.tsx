import EntriesList from '../../../components/EntryList'
import { deleteEntryByAdmin, updateEntryByAdmin, getAdminEntries } from '../../../redux/actions'

export default function EntryList() {
  return <EntriesList deleteEntryAction={deleteEntryByAdmin} updateEntryAction={updateEntryByAdmin} refreshAction={getAdminEntries} />
}