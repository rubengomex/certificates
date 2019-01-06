const config = require('configuration')
const stripe = require('stripe')(config.get('STRIPE_SECRET_KEY'))

exports.addCreditsToUser = async ({ user, id }) => {
  await stripe.charges.create({
    amount: 500,
    currency: 'eur',
    description: '5€ for 5 surveys credits',
    source: id
  })

  user.credits += 5
  const updatedUser = await user.save()
  return updatedUser
}
