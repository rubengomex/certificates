import 'reflect-metadata'
import { AppRouter } from '../routing'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'
import { RequestHandler, Request, Response, NextFunction } from 'express'

const bodyValidators = (keys: string[]): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) return res.status(422).send('Invalid request')

  for (const key of keys) {
    if (!req.body[key])
      return res.status(422).send(`Property ${key} was not provided`)
  }

  next()
}

export const controller = (routePrefix: string) => (target: Function) => {
  const router = AppRouter.getInstance()
  for (const key in target.prototype) {
    const routeHandler = target.prototype[key]
    const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key)
    const method: Methods = Reflect.getMetadata(
      MetadataKeys.METHOD,
      target.prototype,
      key
    )
    const middlewares =
      Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || []
    const requiredBodyProps =
      Reflect.getMetadata(MetadataKeys.BODY_VALIDATOR, target.prototype, key) ||
      []

    const validateBody = bodyValidators(requiredBodyProps)

    if (path) {
      router[method](
        `${routePrefix}${path}`,
        ...middlewares,
        validateBody,
        routeHandler
      )
    }
  }
}
