import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'

export const validateBody = (...keys: string[]) => (
  target: any,
  key: string
) => {
  Reflect.defineMetadata(MetadataKeys.BODY_VALIDATOR, keys, target, key)
}
