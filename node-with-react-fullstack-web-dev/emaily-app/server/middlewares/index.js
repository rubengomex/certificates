const { HTTP_STATUS } = require('utils/http')

exports.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) return next()
  next({
    status: HTTP_STATUS.UNAUTHORIZED,
    message: 'You most log in!'
  })
}
