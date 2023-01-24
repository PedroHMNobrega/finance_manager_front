import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { mockAccountModel } from '@/tests/domain/mocks'
import { AccountModel } from '@/domain/models'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  callsCount: number = 0
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.callsCount++
    this.params = params
    return Promise.resolve(this.account)
  }
}
