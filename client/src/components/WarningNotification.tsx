import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
import CalorieLimitMap from '../config/calorie-limit-map.json'
import { Box, Stack, Text } from '@chakra-ui/layout'
import { MdWarningAmber } from 'react-icons/md'
import { Button } from '@chakra-ui/button'
import { useSessionStorage } from '../utils'

const sortByDate = (a: any, b: any) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

const filterByDataRange = (data: any, startDate: Date, endDate: Date) => {
  return data.filter((item: any) => {
    const date = new Date(item.timestamp)
    return date >= startDate && date <= endDate
  })
}

const sumOfArrayItems = (array: any, key) => {
  return array.reduce((acc: any, item: any) => {
    return acc + item[key]
  }, 0)
}

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
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 7)
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 1)
      const filteredData = filterByDataRange(entries, startDate, endDate)
      const totalCalories = sumOfArrayItems(filteredData, 'calorieAmount')
      if (totalCalories > CalorieLimitMap[user.email]) setShowNotificationWarning(true)
      else setShowNotificationWarning(false)
    }
  }, [entries, user])

  return (
    showNotificationWarning && !notificationInfo.seen ?
      <Box backgroundColor="gray.700" p="4" borderRadius="8" boxShadow="lg" borderColor="blue.400" border="1px">
        <Stack direction="row" alignItems="center">
          <MdWarningAmber size="25px" />
          <Text casing="uppercase">Warning</Text>
        </Stack>
        <Text mt="4">
          You have consumed more than your calorie limit for the last 7 days
        </Text>
        <Box display="flex" mt="4">
          <Button onClick={dismissNotification}>Dismiss</Button>
        </Box>
      </Box> : null
  )
}

export default WarningNotification
