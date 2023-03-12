import { LocalStorageJwt } from '@/data/usecases/authentication'

export const makeLocalStorageJwt = (): LocalStorageJwt => {
  const key = 'access-token'
  return new LocalStorageJwt(key)
}
