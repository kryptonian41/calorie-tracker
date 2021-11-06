import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EntriesList from '../screens/admin/EntriesList'
import Report from '../screens/admin/Report'


const AdminAppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<EntriesList />} />
      <Route path="/reports" element={<Report />} />
    </Routes>
  )
}

export default AdminAppRouter
