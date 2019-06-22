import { combineReducers } from 'redux'
import { todosReducer } from './todos'
import { Todo } from '../actions'

export interface IStoreState {
  todos: Todo[]
}

export const reducers = combineReducers<IStoreState>({
  todos: todosReducer
})
