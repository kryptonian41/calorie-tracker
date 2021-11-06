import { Container } from '@chakra-ui/layout'
import React from 'react'
import AdminAppRouter from '../../router/admin'
import { AdminHeader } from '../Header'

interface Props {

}

const AdminLayout = (props: Props) => {
  return (
    <Container maxW="container.xl">
      <AdminHeader />
      <AdminAppRouter />
    </Container>
  )
}

export default AdminLayout
