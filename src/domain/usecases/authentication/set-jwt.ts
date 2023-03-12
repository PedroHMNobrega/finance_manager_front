import { Jwt } from '@/domain/models'

export interface SetJwt {
  set (token: Jwt): void
}
