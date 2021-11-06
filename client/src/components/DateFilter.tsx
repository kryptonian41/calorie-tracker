import { Button } from '@chakra-ui/button';
import { InputGroup, InputLeftAddon } from '@chakra-ui/input';
import { Box, Stack } from '@chakra-ui/layout';
import { addDays, subDays } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { MdRefresh } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { DateInput } from './CalorieEntryForm';

export const DateFilter = ({ initialValues = { to: new Date(), from: subDays(new Date(), 7) }, refreshAction }) => {
  const [value, setValue] = useState(initialValues)
  const [isLoadingEntries, setIsLoadingEntries] = useState(false)
  const dispatch = useDispatch()

  const refreshEntries = useCallback(async () => {
    setIsLoadingEntries(true)
    await dispatch(refreshAction({ minDate: value.from, maxDate: value.to }))
    setIsLoadingEntries(false)
  }, [dispatch, value, refreshAction])

  useEffect(() => {
    refreshEntries()
  }, [value, refreshEntries])

  return (
    <Box my="4">
      <Stack direction="row">
        <InputGroup>
          <InputLeftAddon children="From" />
          {/* <Input type="tel" placeholder="phone number" /> */}
          <DatePicker
            selected={value.from}
            onChange={(from) => setValue(value => ({ ...value, from }))}
            customInput={<DateInput />}
            dateFormat="do MMM y"
            maxDate={subDays(value.to, 1)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="To" />
          <DatePicker
            selected={value.to}
            onChange={(to) => setValue(value => ({ ...value, to }))}
            customInput={<DateInput />}
            dateFormat="do MMM y"
            minDate={addDays(value.from, 1)}
            maxDate={new Date()}
          />
        </InputGroup>
        <Button isLoading={isLoadingEntries} onClick={refreshEntries} colorScheme="teal" leftIcon={<MdRefresh size="20px" />} iconSpacing="0" variant="outline">
        </Button>
      </Stack>
    </Box>
  )
}

export default DateFilter
