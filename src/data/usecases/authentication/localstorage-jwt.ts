import { GetJwt, SetJwt } from '@/domain/usecases'
import { Jwt } from '@/domain/models'

export class LocalstorageJwt implements GetJwt, SetJwt {
  constructor (
    private readonly key
  ) {}

  get = (): Jwt => {
    return localStorage.getItem(this.key)
  }

  set = (token: Jwt): void => {
    localStorage.setItem(this.key, token)
  }
}
