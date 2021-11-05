import React from 'react'
import AdminAppRouter from '../../router/admin'

interface Props {

}

const AdminLayout = (props: Props) => {
  return (
    <div>
      Admin App
      <AdminAppRouter />
    </div>
  )
}

export default AdminLayout
