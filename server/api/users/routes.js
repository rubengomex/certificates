const router = require('express').Router()
const controller = require('./controller')

router.get('/me', (req, res) => res.json(req.user))

router.post('/credits', async (req, res) => {
  res.json(await controller.addCreditsToUser({ user: req.user, ...req.body }))
})

module.exports = router
