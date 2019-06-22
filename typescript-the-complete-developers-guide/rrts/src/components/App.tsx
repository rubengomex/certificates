import React from 'react'
import { connect } from 'react-redux'
import { Todo, fetchTodos, deleteTodo } from '../actions'
import { IStoreState } from '../reducers'

interface AppState {
  fetching: boolean
}

interface AppProps {
  todos: Todo[]
  fetchTodos: Function
  deleteTodo: typeof deleteTodo
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = { fetching: false }
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false })
    }
  }

  onButtonClick = (): void => {
    this.setState({ fetching: true })
    this.props.fetchTodos()
  }

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return <div key={todo.id}> {todo.title}</div>
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}> Fetch </button>
        {this.state.fetching ? 'Loading...' : null}
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({ todos }: IStoreState): { todos: Todo[] } => ({
  todos
})

export const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(_App)
