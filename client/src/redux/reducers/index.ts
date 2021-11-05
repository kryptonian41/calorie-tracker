import { combineReducers } from 'redux'
import entriesReducer from './entries'
import userReducer from './user'

export interface ReduxRootState {
  entries: any,
  user: any
}

const rootReducer = combineReducers<ReduxRootState>({
  entries: entriesReducer,
  user: userReducer
})

export default rootReducer
