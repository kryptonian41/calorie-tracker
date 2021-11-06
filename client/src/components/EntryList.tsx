import { Box, Text, Stack, useDisclosure, CircularProgress, Center, Fade } from '@chakra-ui/react'
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
  const loadingEntries = useSelector<RootState, boolean>(state => state.meta.loadingEntries)
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

      {
        loadingEntries ?
          <Center mt="7"><CircularProgress isIndeterminate color="teal.500" /></Center>
          // null
          : entries && entries.length > 0 ?
            <Fade in>
              <Stack spacing="4" mt="3">
                {
                  entries.map(entry =>
                    <EntryListItem key={entry._id} entry={entry} onDelete={onDelete(entry)} onUpdate={onUpdate(entry)} />
                  )
                }
              </Stack>
            </Fade>
            : <Text textAlign="center" mt="6" color="gray.400" fontWeight="bold" fontSize="2xl">No entries found</Text>
      }

      <DeleteEntryConfirmationModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onDelete={deleteEntry} />
      <UpdateEntry entry={selectedEntry} onUpdate={updateEntry} isOpen={isUpdateModalOpen} onClose={closeUpdateModal} />
    </Box>
  )
}

export default EntriesList
