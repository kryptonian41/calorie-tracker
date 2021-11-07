import { Button, Flex, Stack, Text, Avatar } from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'

interface Props {
  entry: any,
  onUpdate?: any,
  onDelete?: any,
  showUserInfo: boolean
}

const EntryListItem: React.FC<Props> = ({ showUserInfo, entry, onUpdate, onDelete }) => {
  const { itemName, calorieAmount, timestamp } = entry
  return (
    <Flex border="1px" borderColor="gray.600" borderRadius="10">
      <Stack px="6" py="4" flex="1">
        <Text fontSize="2xl" color="teal" fontWeight="semibold">{calorieAmount} Calories</Text>
        <Text fontSize="xl">{itemName}</Text>
        <Text color="gray.400">{format(new Date(timestamp), 'do MMM y')}</Text>
        {
          showUserInfo &&
          <Stack direction="row" alignItems="center" pt="2">
            <Avatar name={entry.user.name} size="xs" bg="gray.600" color="white" />
            <Text color="gray.400" fontSize="sm">{entry.user.email}</Text>
          </Stack>
        }
      </Stack>
      <Stack px="6" py="4" spacing="4">
        <Button colorScheme="blue" variant="outline" onClick={onUpdate}>Update</Button>
        <Button colorScheme="red" variant="outline" onClick={onDelete}>Delete</Button>
      </Stack>
    </Flex>
  )
}

export default EntryListItem
