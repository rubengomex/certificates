const router = require('express').Router()
const auth = require('auth/routes')
const users = require('api/users/routes')
const surveys = require('api/surveys/routes')

router.use('/auth/', auth)
router.use('/api/users/', users)
router.use('/api/surveys', surveys)

module.exports = router
