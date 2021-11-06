import { axios } from "../../config/axios"
import { subDays } from 'date-fns'
import { EntriesAction, AdminAction, MetaAction } from './types'
import { timePromise } from "../../utils"

const defaultDateRange = {
  minDate: subDays(Date.now(), 7),
  maxDate: new Date().toISOString()
}

export const getAdminBootstrapData = (dateRange = defaultDateRange) => async dispatch => {
  dispatch(getAdminEntries(dateRange))
  dispatch(getAdminReports(dateRange))
}

export const getAdminEntries = (dateRange = defaultDateRange, onDone = () => { }) => async dispatch => {
  dispatch({ type: MetaAction.SET_LOADING_ENTRIES, payload: true })
  const { data: entries } = await axios.post('/admin/get-entries', dateRange)
  await timePromise(2000)
  dispatch({ type: EntriesAction.SET_ENTRIES, payload: entries })
  dispatch({ type: MetaAction.SET_LOADING_ENTRIES, payload: false })
  onDone && onDone()
}

export const getAdminReports = (dateRange = defaultDateRange) => async dispatch => {
  const { data: report } = await axios.post('/admin/get-report', dateRange)
  dispatch({ type: AdminAction.SET_REPORT_INFO, payload: report })
}

export const addEntryByAdmin = (entry, onDone) => async dispatch => {
  const { data } = await axios.post("/admin/entry", entry)
  dispatch({ type: EntriesAction.ADD_ENTRY, payload: data })
  onDone && onDone()
}

export const updateEntryByAdmin = (entryId, updates, onDone) => async dispatch => {
  const { data } = await axios.put("/admin/entry", updates, { params: { id: entryId } })
  dispatch({ type: EntriesAction.UPDATE_ENTRY, payload: data })
  onDone && onDone()
}

export const deleteEntryByAdmin = (entry, onDone) => async dispatch => {
  const { data } = await axios.delete("/admin/entry", { params: { id: entry._id } })
  dispatch({ type: EntriesAction.DELETE_ENTRY, payload: data })
  onDone && onDone()
}