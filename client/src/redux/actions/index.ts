import { axios } from "../../config/axios"
import { timePromise } from "../../utils"
import { UserAction } from './types'
export * from './admin'
export * from './user'

export const getUserInfo = () => async dispatch => {
  const { data: userData } = await axios.get('/auth/me')
  await timePromise(1000)
  dispatch({ type: UserAction.SET_USER_INFO, payload: { ...userData, isAdmin: userData.role === 'Admin' } })
}
