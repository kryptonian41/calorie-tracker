import { UserAction } from '../actions/types'

export default function userReducer(state, action) {
  switch (action.type) {
    case UserAction.SET_USER_INFO: {
      return action.payload
    }
    default: {
      return state || null
    }
  }
}