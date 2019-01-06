import axios from 'axios'
import { GET_USER } from './types'

export const getUser = () => async dispatch => {
  const user = await axios.get('/api/users/me').then(({ data }) => data)
  dispatch({ type: GET_USER, payload: { user } })
}

export const addCredits = token => async dispatch => {
  const user = await axios
    .post('/api/users/credits', token)
    .then(({ data }) => data)
  dispatch({ type: GET_USER, payload: { user } })
}
