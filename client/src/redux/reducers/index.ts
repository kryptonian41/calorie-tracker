import { combineReducers } from 'redux'
import { RootState } from '..'
import entriesReducer from './entries'
import metaReducer from './meta'
import userReducer from './user'


const rootReducer = combineReducers<RootState>({
  entries: entriesReducer,
  user: userReducer,
  meta: metaReducer
})

export default rootReducer
