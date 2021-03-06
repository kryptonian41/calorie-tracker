
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import { Entry, Report, User, UserList } from '../types'

export const configureStore = (preloadedState?: any): Store => {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)
  return store
}


export interface RootState {
  entries: Entry[],
  user: User,
  meta: any,
  admin: {
    users: UserList[],
    report: Report
  }
}