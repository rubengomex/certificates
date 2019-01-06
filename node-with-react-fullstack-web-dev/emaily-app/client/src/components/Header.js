import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends Component {
  renderContent() {
    switch (this.props.userIsLoggedIn) {
    case null:
      return
    case false:
      return (
        <li>
          <a href="/auth/google"> Login with Google</a>
        </li>
      )
    default:
      return [
        <li key="1">
          <Payments />
        </li>,
        <li key="2">
          <a href="/auth/logout"> Logout</a>
        </li>,
      ]
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.userIsLoggedIn ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ userIsLoggedIn }) => ({ userIsLoggedIn })

export default connect(mapStateToProps)(Header)
