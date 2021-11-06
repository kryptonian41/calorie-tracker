import EntriesList from '../../../components/EntryList'
import { deleteEntry, updateEntry, getUserBootstrapData } from '../../../redux/actions/user'

export default function EntryList() {
  return <EntriesList deleteEntryAction={deleteEntry} updateEntryAction={updateEntry} refreshAction={getUserBootstrapData} />
}