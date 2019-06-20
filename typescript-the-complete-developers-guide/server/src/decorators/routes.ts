import 'reflect-metadata'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'

export const routeBinder = (method: string) => (path: string) => (
  target: any,
  key: string
) => {
  Reflect.defineMetadata(MetadataKeys.PATH, path, target, key)
  Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key)
}

export const get = routeBinder(Methods.GET)
export const post = routeBinder(Methods.POST)
export const put = routeBinder(Methods.PUT)
export const remove = routeBinder(Methods.DELETE)
export const patch = routeBinder(Methods.PATCH)
