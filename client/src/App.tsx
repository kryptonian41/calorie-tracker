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

    <Suspense fallback={<div>Getting user info</div>}>
      {
        user ?
          user.isAdmin ? <AdminLayout /> : <UserLayout /> :
          "Please provide a user token"
      }
    </Suspense>

  );
}

export default App;
