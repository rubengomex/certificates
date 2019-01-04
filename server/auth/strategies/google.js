const { Strategy } = require('passport-google-oauth20')
const config = require('configuration')
const db = require('database')
const User = db.model('User')

const googleStrategy = new Strategy(
  {
    clientID: config.get('GOOGLE_CLIENT_ID'),
    clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ googleId: profile.id })
    if(user) return done(null, user)

    done(null, await new User({ googleId: profile.id }).save())
  }
)

module.exports = exports = googleStrategy
