import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import Header from './Header'
import Landing from './Landing'
const Dashboard = () => <h2> Dashboard</h2>
const SurveyNew = () => <h2> SurveyNew</h2>

class App extends Component {
  componentDidMount() {
    this.props.getUser()
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(
  null,
  actions,
)(App)
