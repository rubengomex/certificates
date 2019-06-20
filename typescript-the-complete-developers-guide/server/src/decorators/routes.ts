import 'reflect-metadata'

export const get = (path: string) => (target: any, key: string) => {
  Reflect.defineMetadata('path', path, target, key)
}
