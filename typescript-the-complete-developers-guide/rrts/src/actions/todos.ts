import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionTypes } from './types'

export interface FetchTodosAction {
  type: ActionTypes.FETCH_TODOS
  payload: Todo[]
}

export interface DeleteTodoAction {
  type: ActionTypes.DELETE_TODO
  payload: number
}

export interface Todo {
  id: number
  title: string
  completed: boolean
}

const url = 'https://jsonplaceholder.typicode.com/todos'

export const fetchTodos = () => async (dispatch: Dispatch) => {
  const payload = await axios.get<Todo[]>(url).then(({ data }) => data)
  dispatch<FetchTodosAction>({ type: ActionTypes.FETCH_TODOS, payload })
}

export const deleteTodo = (id: number): DeleteTodoAction => ({
  type: ActionTypes.DELETE_TODO,
  payload: id
})
