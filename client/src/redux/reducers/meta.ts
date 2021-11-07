import { MetaAction } from '../actions/types'

const defaultState = {
  loadingEntries: false,
  loadingUserInfo: null,
}

export default function metaReducer(state = defaultState, action) {
  switch (action.type) {
    case MetaAction.SET_LOADING_ENTRIES: {
      return { ...state, loadingEntries: action.payload }
    }
    case MetaAction.SET_LOADING_USER_INFO: {
      return { ...state, loadingUserInfo: action.payload }
    }
    case MetaAction.SET_LOADING_USERS_LIST: {
      return { ...state, loadingUsersList: action.payload }
    }
    default: {
      return state
    }
  }
}