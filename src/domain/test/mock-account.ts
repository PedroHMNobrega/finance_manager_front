import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/account-model'

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any-email',
  password: 'any-password'
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: 'any-token'
})
