const router = require('express').Router()
const auth = require('auth/routes')
const users = require('api/users/routes')

router.get('/', (req, res) => res.json(req.user))
router.use('/auth', auth)
router.use('/api/users', users)
module.exports = router
