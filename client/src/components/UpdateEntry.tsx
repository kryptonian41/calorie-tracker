import React, { useCallback } from 'react';
import { DrawerBody, Drawer, DrawerContent, DrawerOverlay, DrawerHeader, Box } from '@chakra-ui/react'
import { CalorieForm } from './CalorieEntryForm';


const UpdateEntry: React.FC<any> = ({ entry, onUpdate, isOpen, onClose }) => {
  const handleUpdate = useCallback((values, { setSubmitting, resetForm }) => {
    onUpdate(values,
      () => {
        setSubmitting(false);
        resetForm()
      }
    )
  }, [onUpdate])

  return <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="md">
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">Update Entry</DrawerHeader>
      <DrawerBody>
        {entry &&
          <Box mt="3">
            <CalorieForm
              onSubmit={handleUpdate}
              initialValues={{
                timestamp: new Date(entry.timestamp),
                calorieAmount: entry.calorieAmount,
                itemName: entry.itemName
              }}
              buttonText="Update"
            />
          </Box>
        }
      </DrawerBody>
    </DrawerContent>
  </Drawer>
}


export default UpdateEntry
