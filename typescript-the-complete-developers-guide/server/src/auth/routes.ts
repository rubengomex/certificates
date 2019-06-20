import { Router, Request, Response, NextFunction } from 'express'

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session || !req.session.loggedIn) {
    res.status(403).send('Not permitted')
  }

  next()
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
  if (!req.session || !req.session.loggedIn)
    return res.send(`
    <div>
      <div> You are not logged in</div>
      <a href="/login"> Login </a>
    </div>
  `)

  res.send(`
    <div>
      <div> You are logged in</div>
      <a href="/logout"> Logout </a>
    </div>
  `)
})

router.get('/login', (req: Request, res: Response) =>
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
)

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) return res.send('Invalid email or password')

  if (email === 'hi@hi.com' && password === 'pass') {
    req.session = { loggedIn: true }
    return res.redirect('/')
  }

  res.send('invalid email or password')
})

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined
  res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route')
})
export { router }
