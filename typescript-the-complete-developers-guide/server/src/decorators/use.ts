import 'reflect-metadata'
import { RequestHandler } from 'express'
import { MetadataKeys } from './MetadataKeys'

export const use = (middleware: RequestHandler) => (
  target: any,
  key: string
) => {
  const middlewares =
    Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || []

  Reflect.defineMetadata(
    MetadataKeys.MIDDLEWARE,
    [...middlewares, middleware],
    target,
    key
  )
}
