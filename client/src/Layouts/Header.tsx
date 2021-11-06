import { Button } from "@chakra-ui/button";
import { Box, Stack } from "@chakra-ui/layout";
import { MdAdminPanelSettings } from 'react-icons/md'
import { IoAnalyticsSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
export const UserHeader = () => {
  return <>
    <Box pt="4" fontSize="3xl">Calorie Tracker</Box>
    <Stack direction="row" mt="3" mb="12" alignItems="center">
      <Box background="teal" w="150px" height="5px"></Box>
      <Box background="whiteAlpha.700" w="50px" height="5px"></Box>
      <Box background="whiteAlpha.200" flex="1" height="2px"></Box>
    </Stack>
  </>
}

export const AdminHeader = () => {
  return <>
    <Stack direction="row" mt="4" alignItems="center" justifyContent="space-between">
      <Box fontSize="3xl">Calorie Tracker</Box>
      <Stack direction="row">
        <Link to="/reports">
          <Button leftIcon={<IoAnalyticsSharp style={{ fill: 'white' }} size="1.5em" />} variant="ghost">Reports</Button>
        </Link>
        <Button leftIcon={<MdAdminPanelSettings style={{ fill: 'white' }} size="1.5em" />} variant="ghost" >Admin</Button>
      </Stack>
    </Stack>
    <Stack direction="row" mt="3" mb="12" alignItems="center">
      <Box background="teal" w="150px" height="5px"></Box>
      <Box background="whiteAlpha.700" w="50px" height="5px"></Box>
      <Box background="whiteAlpha.200" flex="1" height="2px"></Box>
    </Stack>
  </>
}