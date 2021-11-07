import { AdminAction } from '../actions/types'

export default function adminReducer(state, action) {
  switch (action.type) {
    case AdminAction.SET_REPORT_INFO: {
      return { ...state, report: action.payload }
    }
    case AdminAction.SET_USERS_LIST: {
      return { ...state, users: action.payload }
    }
    default: {
      return state || null
    }
  }
}