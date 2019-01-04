const passport = require('passport')
const googleStrategy = require('./strategies/google')
const db = require('database')
const User = db.model('User')

// Serialize user
passport.serializeUser((user, done) => done(null, user.id))
// Deserialize user
passport.deserializeUser(async (id, done) =>
  done(null, await User.findById(id))
)

// use google strategy
passport.use(googleStrategy)
