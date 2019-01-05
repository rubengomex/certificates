const router = require('express').Router()
const auth = require('auth/routes')
const users = require('api/users/routes')

router.use('/auth/', auth)
router.use('/api/users/', users)
module.exports = router
