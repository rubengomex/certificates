import 'reflect-metadata'
import express from 'express'

export const router = express.Router()

export const controller = (routePrefix: string) => (target: Function) => {
  for (const key in target.prototype) {
    const routeHandler = target.prototype[key]
    const path = Reflect.getMetadata('path', target.prototype, key)

    if (path) {
      router.get(`${routePrefix}${path}`, routeHandler)
    }
  }
}
