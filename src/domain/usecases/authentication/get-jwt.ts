import { Jwt } from '@/domain/models'

export interface GetJwt {
  get (): Jwt
}
