import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, Stack, Avatar, Grid } from '@chakra-ui/react'
import { format, subDays } from 'date-fns'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const Report = () => {
  const report = useSelector((state: any) => state.admin.report)
  const { entryAddedMetrics: { firstWeek, secondWeek }, calorieAmountReport, avgCalAddedPerUser } = report

  const increasePercentage = useMemo(() => {
    const { entryAddedMetrics: { firstWeek, secondWeek } } = report
    return ((firstWeek.count - secondWeek.count) / secondWeek.count) * 100
  }, [report])

  const dateRangeText = useMemo(() => {
    const today = new Date()
    const firstWeekEnd = subDays(today, 7)
    const secondWeekStart = subDays(firstWeekEnd, 1)
    const secondWeekEnd = subDays(secondWeekStart, 7)
    return {
      firstWeek: `${format(today, 'MMM d')} - ${format(firstWeekEnd, 'MMM d')}`,
      secondWeek: `${format(secondWeekStart, 'MMM d')} - ${format(secondWeekEnd, 'MMM d')}`,
    }
  }, [])

  return (
    <div>
      <StatGroup direction="row" border="1px" borderColor="gray.600" p="6" borderRadius="8" boxShadow="lg">
        <Stat>
          <StatLabel>Entries added in the last 7 days</StatLabel>
          <StatNumber>{firstWeek.count}</StatNumber>
          <StatHelpText>{dateRangeText.firstWeek}</StatHelpText>
          <StatArrow type="increase" />
          {increasePercentage}%
        </Stat>
        <Stat>
          <StatLabel>Entries added in the last 7-14 days</StatLabel>
          <StatNumber>{secondWeek.count}</StatNumber>
          <StatHelpText>{dateRangeText.secondWeek}</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Average Calories added by all users in last 7 days</StatLabel>
          <StatNumber>{avgCalAddedPerUser} Calories</StatNumber>
        </Stat>
      </StatGroup>

      <Stack mt="6" spacing="6">
        <Text fontSize="xl" casing="uppercase"> Average calories added / USER in the last 7 days </Text>
        <Grid gridTemplateColumns="1fr 1fr" gap="4">
          {calorieAmountReport.map(item =>
            <Stack direction="row" alignItems="center" border="1px" borderColor="gray.600" p="6" borderRadius="8" boxShadow="lg">
              <Stack direction="row" alignItems="center" flex="1">
                <Avatar name={item.userDetails.name} size="sm" bg="gray.600" color="white" />
                <Text color="gray.400" fontSize="lg">{item.userDetails.email}</Text>
              </Stack>
              <Text fontWeight="bold" fontSize="xl">{item.avgCalories} Cals.</Text>
            </Stack>)
          }
        </Grid>
      </Stack>
    </div>
  )
}

export default Report
