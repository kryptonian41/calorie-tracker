import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EntriesList from '../screens/user/EntriesList'

const UserAppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<EntriesList />} />
    </Routes>
  )
}

export default UserAppRouter
