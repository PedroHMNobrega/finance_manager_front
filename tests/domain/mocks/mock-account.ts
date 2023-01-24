import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any-email',
  password: 'any-password'
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: 'any-token'
})
