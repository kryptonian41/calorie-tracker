import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import React, { useRef } from 'react';

interface Props {
  isOpen: boolean,
  onClose: (...any) => void,
  onDelete: (onDone?: () => void) => void
}


export const DeleteEntryConfirmationModal: React.FC<Props> = ({ isOpen, onClose = () => { }, onDelete = () => { } }) => {
  const cancelRef = useRef<HTMLButtonElement>();
  return <AlertDialog
    isOpen={isOpen}
    // @ts-ignore
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isCentered
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Delete Entry
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure? You can't undo this action afterwards.
        </AlertDialogBody>

        <AlertDialogFooter>
          {/* @ts-ignore */}
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={e => onDelete()} ml={3}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>;

};
