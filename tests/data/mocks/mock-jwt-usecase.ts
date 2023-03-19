import { GetJwt, SetJwt } from '@/domain/usecases'
import { mockJwt } from '@/tests/domain/mocks'

export const getJwtSpy = (): GetJwt => ({
  get: jest.fn(() => mockJwt())
})

export const setJwtSpy = (): SetJwt => ({
  set: jest.fn()
})
