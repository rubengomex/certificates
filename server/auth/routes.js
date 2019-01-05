const passport = require('passport')
const router = require('express').Router()

// Google Routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get('/google/callback', passport.authenticate('google'), (req, res) =>
  res.redirect('/surveys')
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
