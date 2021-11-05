import { Box, Stack, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EntryListItem from '../../../components/EntryListItem'
import { DeleteEntryConfirmationModal } from "../../../components/DeleteEntryConfirmationModal"
import UpdateEntry from '../../../components/UpdateEntry'
import { RootState } from '../../../redux'

interface Props {
  deleteEntryAction: any,
  updateEntryAction: any,
}

const EntriesList = ({ deleteEntryAction, updateEntryAction }: Props) => {
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
    <Box pl="8" fontSize="xl">
      Entries
      <Stack spacing="3" mt="3">
        {entries.map(entry => <EntryListItem key={entry._id} entry={entry} onDelete={onDelete(entry)} onUpdate={onUpdate(entry)} />)}
      </Stack>
      <DeleteEntryConfirmationModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onDelete={deleteEntry} />
      <UpdateEntry entry={selectedEntry} onUpdate={updateEntry} isOpen={isUpdateModalOpen} onClose={closeUpdateModal} />
    </Box>
  )
}

export default EntriesList
