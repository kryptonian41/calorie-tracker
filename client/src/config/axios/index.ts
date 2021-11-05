import Axios, { AxiosInstance } from 'axios'

export let axios: AxiosInstance

export const createAxiosInstance = ({ userToken, baseURL }: { userToken: string, baseURL: string }) => {
  axios = Axios.create({
    baseURL,
    headers: {
      'x-access-token': userToken
    }
  })
}