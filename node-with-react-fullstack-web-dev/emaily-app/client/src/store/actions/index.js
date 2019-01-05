import axios from 'axios'
import { GET_USER } from './types'

export const getUser = () => async dispatch => {
  const user = await axios.get('/api/users/me').then(({ data }) => data)
  dispatch({ type: GET_USER, payload: { user } })
}
