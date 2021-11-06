import { Box, Text, Stack, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EntryListItem from './EntryListItem'
import { DeleteEntryConfirmationModal } from "./DeleteEntryConfirmationModal"
import UpdateEntry from './UpdateEntry'
import { RootState } from '../redux'
import DateFilter from './DateFilter'

interface Props {
  deleteEntryAction: any,
  updateEntryAction: any,
  refreshAction: any,
}

const EntriesList = ({ deleteEntryAction, updateEntryAction, refreshAction }: Props) => {
  const entries = useSelector<RootState, any[]>(state => state.entries)
  const [selectedEntry, setSelectedEntry] = useState<any>(null)
  const { isOpen: isDeleteModalOpen, onOpen: openDeleteModal, onClose: closeDeleteModal } = useDisclosure()
  const { isOpen: isUpdateModalOpen, onOpen: openUpdateModal, onClose: closeUpdateModal } = useDisclosure()
  const dispatch = useDispatch()

  const deleteEntry = useCallback((onDone) => {
    if (selectedEntry) {
      dispatch(deleteEntryAction(selectedEntry, () => {
        onDone && onDone()
        closeDeleteModal()
      }))
    }
  }, [selectedEntry, deleteEntryAction, dispatch, closeDeleteModal])

  const updateEntry = useCallback((values, onDone) => {
    if (selectedEntry)
      dispatch(updateEntryAction(selectedEntry._id, values, () => {
        onDone && onDone()
        closeUpdateModal()
      }))
  }, [selectedEntry, updateEntryAction, dispatch, closeUpdateModal])

  const onUpdate = entry => () => {
    setSelectedEntry(entry)
    openUpdateModal()
  }

  const onDelete = entry => () => {
    setSelectedEntry(entry)
    openDeleteModal()
  }

  return (
    <Box fontSize="xl">
      <Text casing="uppercase">Entries</Text>
      <DateFilter refreshAction={refreshAction}></DateFilter>
      <Stack spacing="3" mt="3">
        {entries && entries.length > 0 ?
          entries.map(entry => <EntryListItem key={entry._id} entry={entry} onDelete={onDelete(entry)} onUpdate={onUpdate(entry)} />)
          : <Text textAlign="center" mt="6" color="gray.400" fontWeight="bold" fontSize="2xl">No entries found</Text>
        }
      </Stack>
      <DeleteEntryConfirmationModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onDelete={deleteEntry} />
      <UpdateEntry entry={selectedEntry} onUpdate={updateEntry} isOpen={isUpdateModalOpen} onClose={closeUpdateModal} />
    </Box>
  )
}

export default EntriesList
