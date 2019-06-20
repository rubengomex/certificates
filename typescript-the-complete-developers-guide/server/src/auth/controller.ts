import { Request, Response } from 'express'
import { get, post, validateBody, controller } from '../decorators'

@controller('/auth')
export default class Login {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <button>Submit</button>
      </form>
    `)
  }

  @post('/login')
  @validateBody('email', 'password')
  login(req: Request, res: Response) {
    const { email, password } = req.body

    if (email === 'hi@hi.com' && password === 'pass') {
      req.session = { loggedIn: true }
      return res.redirect('/')
    }

    res.send('invalid email or password')
  }

  @get('/logout')
  logout(req: Request, res: Response) {
    req.session = undefined
    res.redirect('/')
  }
}
