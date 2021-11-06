import { Box, Center, Stack, Text } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/progress';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux';
import { getAdminBootstrapData, getUserBootstrapData, getUserInfo } from './redux/actions';

const AdminLayout = React.lazy(() => import('./Layouts/Admin'))
const UserLayout = React.lazy(() => import('./Layouts/User'))

function App() {
  const dispatch = useDispatch()
  const user = useSelector<RootState, any>(store => store.user)

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  useEffect(() => {
    if (!user) return
    if (user.isAdmin) dispatch(getAdminBootstrapData())
    else dispatch(getUserBootstrapData())
  }, [user, dispatch])

  return (

    <Suspense fallback={<LoadingIndicator />}>
      {
        user ?
          user.isAdmin ? <AdminLayout /> : <UserLayout />
          : <LoadingIndicator />
      }
    </Suspense>

  );
}

const LoadingIndicator = () => {
  return <Center height="100vh" width="100vw" fontSize="3xl">
    <Stack>
      <Text>
        Getting user info
      </Text>
      <Progress size="xs" isIndeterminate w="100%" colorScheme="teal" />
    </Stack>
  </Center>
}

export default App;
