import { Request, Response, NextFunction } from 'express'
import { get, use, controller } from '../decorators'

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session || !req.session.loggedIn) {
    res.status(403).send('Not permitted')
  }

  next()
}

@controller('')
export default class AppController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (!req.session || !req.session.loggedIn)
      return res.send(`
    <div>
      <div> You are not logged in</div>
      <a href="/auth/login"> Login </a>
    </div>
  `)

    res.send(`
    <div>
      <div> You are logged in</div>
      <a href="/auth/logout"> Logout </a>
    </div>
  `)
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route')
  }
}
