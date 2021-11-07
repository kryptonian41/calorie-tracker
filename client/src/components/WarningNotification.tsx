import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
import CalorieLimitMap from '../config/calorie-limit-map.json'
import { Box, Stack, Text } from '@chakra-ui/layout'
import { MdWarningAmber } from 'react-icons/md'
import { Button } from '@chakra-ui/button'
import { filterByDataRange, sumOfArrayItems, useSessionStorage } from '../utils'
import { format, addDays } from 'date-fns'


const WarningNotification = () => {
  const entries = useSelector<RootState, any[]>(store => store.entries)
  const user = useSelector<RootState, any>(store => store.user)
  const [showNotificationWarning, setShowNotificationWarning] = useState(false)
  const [notificationInfo, changeValue] = useSessionStorage('NOTIFICATION_SEEN', { seen: false })

  const dismissNotification = () => {
    setShowNotificationWarning(false)
    changeValue({ seen: true })
  }

  useEffect(() => {
    if (entries && entries.length > 0) {
      const startDate = new Date(format(new Date(), 'M/d/yyyy'))
      const endDate = addDays(startDate, 1)
      const filteredData = filterByDataRange(entries, startDate, endDate)
      const totalCalories = sumOfArrayItems(filteredData, 'calorieAmount')
      if (totalCalories > CalorieLimitMap[user.email]) setShowNotificationWarning(true)
      else setShowNotificationWarning(false)
    }
  }, [entries, user])

  return (
    showNotificationWarning && !notificationInfo.seen ?
      <Box mb="8" backgroundColor="gray.700" p="4" borderRadius="8" boxShadow="lg" borderColor="blue.400" border="1px">
        <Stack direction="row" alignItems="center">
          <MdWarningAmber size="25px" />
          <Text casing="uppercase">Warning</Text>
        </Stack>
        <Text mt="4">
          You have consumed more than your calorie limit for the day
        </Text>
        <Text mt="4" color="teal.400" fontWeight="semibold">
          Daily Limit is {CalorieLimitMap[user.email]} calories
        </Text>
        <Box display="flex" mt="4">
          <Button onClick={dismissNotification}>Dismiss</Button>
        </Box>
      </Box> : null
  )
}

export default WarningNotification
