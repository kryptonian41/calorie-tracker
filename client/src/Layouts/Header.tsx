import { Button } from "@chakra-ui/button";
import { Box, Stack } from "@chakra-ui/layout";
import { MdAdminPanelSettings } from 'react-icons/md'
import { IoAnalyticsSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function LineStack() {
  return <Stack direction="row" mt="3" mb={{ base: "6", md: "8" }} alignItems="center">
    <Box background="teal" w="150px" height="5px"></Box>
    <Box background="whiteAlpha.700" w="50px" height="5px"></Box>
    <Box background="whiteAlpha.200" flex="1" height="2px"></Box>
  </Stack>;
}

function Heading() {
  return <Link to="/"><Box fontSize={{ base: "xl", sm: '2xl', md: '3xl' }}>Calorie Tracker</Box></Link>;
}


export const UserHeader = () => {
  return <>
    <Box pt="3"><Heading /></Box>
    <LineStack />
  </>
}

export const AdminHeader = () => {
  return <>
    <Stack direction="row" mt="4" alignItems="center" justifyContent="space-between">
      <Heading />
      <Stack direction="row">
        <Link to="/reports">
          <Button leftIcon={<IoAnalyticsSharp style={{ fill: 'white' }} size="1.5em" />} variant="ghost">Reports</Button>
        </Link>
        <Button leftIcon={<MdAdminPanelSettings style={{ fill: 'white' }} size="1.5em" />} variant="ghost" >Admin</Button>
      </Stack>
    </Stack>
    <LineStack />

  </>
}

