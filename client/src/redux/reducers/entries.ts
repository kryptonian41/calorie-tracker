import { EntriesAction } from '../actions/types'
import { produce } from 'immer'
import { sortByDate } from '../../utils'

export default function entriesReducer(state: any[] = [], action) {
  switch (action.type) {
    case EntriesAction.SET_ENTRIES: {
      return action.payload
    }
    case EntriesAction.ADD_ENTRY: {
      return [...state, action.payload].sort(sortByDate)
    }
    case EntriesAction.UPDATE_ENTRY: {
      return produce(state, dstate => {
        const index = dstate.findIndex(value => value._id === action.payload._id)
        dstate.splice(index, 1, action.payload)
      })
    }
    case EntriesAction.DELETE_ENTRY: {
      return produce(state, dstate => {
        const index = dstate.findIndex(value => value._id === action.payload._id)
        dstate.splice(index, 1)
      })
    }
    default: {
      return state
    }
  }
}