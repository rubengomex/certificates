import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import { addCredits } from '../store/actions'

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Rgodev Emaily"
        description="5€ for 5 survey credits"
        amount={500}
        currency="EUR"
        token={token => this.props.addCredits(token)}
        locale="en"
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn"> Add credits</button>
      </StripeCheckout>
    )
  }
}

export default connect(
  null,
  { addCredits },
)(Payments)
