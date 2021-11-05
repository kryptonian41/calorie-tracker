import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'

interface Props {
  entry: any,
  onUpdate?: any,
  onDelete?: any,
}

const EntryListItem: React.FC<Props> = ({ entry, onUpdate, onDelete }) => {
  const { itemName, calorieAmount, timestamp } = entry
  return (
    <Flex border="1px" borderColor="gray.600" borderRadius="10">
      <Stack px="6" py="4" flex="1">
        <Text fontSize="2xl" color="teal">{calorieAmount} Calories</Text>
        <Text fontSize="xl">{itemName}</Text>
        <Text color="gray.400">{format(new Date(timestamp), 'do MMM y')}</Text>
      </Stack>
      <Stack px="6" py="4">
        <Button colorScheme="teal" variant="outline" onClick={onUpdate}>Update</Button>
        <Button colorScheme="red" variant="outline" onClick={onDelete}>Delete</Button>
      </Stack>
    </Flex>
  )
}

export default EntryListItem
