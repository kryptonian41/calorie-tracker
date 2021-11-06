import { axios } from "../../config/axios"
import { sub } from 'date-fns'
import { EntriesAction, UserAction } from './types'

const defaultDateRange = {
  minDate: sub(Date.now(), {
    days: 7
  }),
  maxDate: new Date().toISOString()
}

export const getUserInfo = () => async dispatch => {
  const { data: userData } = await axios.get('/auth/me')
  dispatch({ type: UserAction.SET_USER_INFO, payload: userData })
}

export const getUserBootstrapData = (dateRange = defaultDateRange) => async dispatch => {
  const { data: entries } = await axios.post('/user/get-entries', dateRange)
  dispatch({ type: EntriesAction.SET_ENTRIES, payload: entries })
}

export const addEntry = (entry, onDone) => async dispatch => {
  const { data } = await axios.post("/user/entry", entry)
  dispatch({ type: EntriesAction.ADD_ENTRY, payload: data })
  onDone && onDone()
}

export const updateEntry = (entryId, updates, onDone) => async dispatch => {
  const { data } = await axios.put("/user/entry", updates, { params: { id: entryId } })
  dispatch({ type: EntriesAction.UPDATE_ENTRY, payload: data })
  onDone && onDone()
}

export const deleteEntry = (entry, onDone) => async dispatch => {
  console.log("🚀 ~ file: user.ts ~ line 35 ~ entry", entry)
  const { data } = await axios.delete("/user/entry", { params: { id: entry._id } })
  dispatch({ type: EntriesAction.DELETE_ENTRY, payload: data })
  onDone && onDone()
}