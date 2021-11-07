import { combineReducers } from 'redux'
import { RootState } from '..'
import adminReducer from './admin'
import entriesReducer from './entries'
import metaReducer from './meta'
import userReducer from './user'

const appReducer = combineReducers<RootState>({
  entries: entriesReducer,
  user: userReducer,
  meta: metaReducer,
  admin: adminReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') {
    return { entries: {}, user: {}, meta: {} }
  }

  return appReducer(state, action)
}


export default rootReducer
