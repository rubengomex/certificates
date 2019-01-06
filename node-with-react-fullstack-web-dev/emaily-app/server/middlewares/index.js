const { HTTP_STATUS } = require('utils/http')

exports.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) return next()
  next({
    status: HTTP_STATUS.UNAUTHORIZED, // 401
    message: 'You most log in!'
  })
}

exports.userHasEnoughCredits = (req, res, next) => {
  if(req.user.credits > 0) return next()
  next({
    status: HTTP_STATUS.FORBIDDEN, // 403 (402 isn't available)
    message: 'Not enough credits!'
  })
}
