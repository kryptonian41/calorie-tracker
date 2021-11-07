import { Container } from '@chakra-ui/react';
import React from 'react';
import AdminAppRouter from '../../router/admin';
import { AdminHeader } from '../Header';

const AdminLayout = () => {
  return (
    <Container maxW="container.xl">
      <AdminHeader />
      <AdminAppRouter />
    </Container>
  )
}

export default AdminLayout
