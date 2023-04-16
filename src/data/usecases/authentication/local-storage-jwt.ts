import { GetJwt, RemoveJwt, SetJwt } from '@/domain/usecases'
import { Jwt } from '@/domain/models'

export class LocalStorageJwt implements GetJwt, SetJwt, RemoveJwt {
  constructor (
    private readonly key
  ) {}

  get = (): Jwt => {
    return localStorage.getItem(this.key)
  }

  set = (token: Jwt): void => {
    localStorage.setItem(this.key, token)
  }

  remove = (): void => {
    localStorage.removeItem(this.key)
  }
}
