import { Box, Fade, Skeleton, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux'
import DateFilter from './DateFilter'
import { DeleteEntryConfirmationModal } from "./DeleteEntryConfirmationModal"
import EntryListItem from './EntryListItem'
import UpdateEntry from './UpdateEntry'

interface Props {
  deleteEntryAction: any,
  updateEntryAction: any,
  refreshAction: any,
  showUserInfo?: boolean
}

export const LoadingStack = () => {
  return <Stack spacing="4">
    {(new Array(3).fill(0)).map((_, i) => (
      <Stack opacity={0.4 / i} border="1px" borderColor="gray.600" borderRadius="8" p="6" spacing="4">
        <Skeleton borderRadius="8" fadeDuration={0.6} w="25%" height="20px" />
        <Skeleton borderRadius="8" fadeDuration={0.6} w="20%" mt="12" height="20px" />
        <Skeleton borderRadius="8" fadeDuration={0.6} w="30%" mt="12" height="20px" />
      </Stack>
    ))}
  </Stack>
}

const EntriesList = ({ deleteEntryAction, updateEntryAction, refreshAction, showUserInfo = false }: Props) => {
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
          <LoadingStack />
          // null
          : entries && entries.length > 0 ?
            <Fade in >
              <Stack spacing="4" mt="3">
                {
                  entries.map(entry =>
                    <EntryListItem key={entry._id} entry={entry} onDelete={onDelete(entry)} onUpdate={onUpdate(entry)} showUserInfo={showUserInfo} />
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

