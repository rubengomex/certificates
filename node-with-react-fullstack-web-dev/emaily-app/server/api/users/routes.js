const router = require('express').Router()
const { isAuthenticated } = require('middlewares')
const controller = require('./controller')

router.get('/me', (req, res) => res.json(req.user))

router.post('/credits', isAuthenticated, async (req, res) => {
  res.json(await controller.addCreditsToUser({ user: req.user, ...req.body }))
})

module.exports = router
