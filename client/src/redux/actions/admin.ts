import { axios } from "../../config/axios"
import { sub } from 'date-fns'
import { EntriesAction, AdminAction } from './types'

const defaultDateRange = {
  minDate: sub(Date.now(), {
    days: 7
  }),
  maxDate: new Date().toISOString()
}

export const getAdminBootstrapData = (dateRange = defaultDateRange) => async dispatch => {
  dispatch(getAdminEntries(dateRange))
  dispatch(getAdminReports(dateRange))
}

export const getAdminEntries = (dateRange = defaultDateRange) => async dispatch => {
  const { data: entries } = await axios.post('/admin/get-entries', dateRange)
  dispatch({ type: EntriesAction.SET_ENTRIES, payload: entries })
}

export const getAdminReports = (dateRange = defaultDateRange) => async dispatch => {
  const { data: report } = await axios.post('/admin/get-report', dateRange)
  dispatch({ type: AdminAction.SET_REPORT_INFO, payload: report })
}
