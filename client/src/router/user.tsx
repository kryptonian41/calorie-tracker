import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EntriesList from '../screens/user/EntriesList'
import { deleteEntry, updateEntry } from '../redux/actions/user'

interface Props {

}

const UserAppRouter = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<EntriesList deleteEntryAction={deleteEntry} updateEntryAction={updateEntry} />} />
    </Routes>
  )
}

export default UserAppRouter
