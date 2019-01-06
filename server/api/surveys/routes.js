const router = require('express').Router()
const { isAuthenticated, userHasEnoughCredits } = require('middlewares')
const { HTTP_STATUS } = require('utils/http')
const controller = require('./controller')

// GET api/surveys?limit=10&skip=0
// Gets a list of surveys that belongs to a specific user
// Query params
// limit - total of surveys to send back (default 10)
// skip - the current pagination index (default 0)
// Requires: Authentication and enough credits
router.get('/', isAuthenticated, async (req, res) =>
  res.json(await controller.getSurveyList({ user: req.user, ...req.query }))
)

// POST api/surveys
// Creates a survey for the current user
// Requires: Authentication and enough credits
router.post(
  '/',
  isAuthenticated,
  userHasEnoughCredits,
  async (req, res, next) => {
    try {
      const updatedUser = await controller.createSurvey({
        user: req.user,
        ...req.body
      })
      res.json(updatedUser)
    } catch (err) {
      next({ status: HTTP_STATUS.UNPROCESSABLE_ENTITY, message: err.message }) // 422
    }
  }
)

router.get('/tanks', (req, res) => res.send('Thanks for your feedback!'))

// POST api/surveys
// Creates a survey for the current user
// Requires: Authentication
router.post('/webhooks', isAuthenticated, async (req, res) =>
  res.json(await controller.saveFeedback({ user: req.user, ...req.body }))
)

module.exports = router
