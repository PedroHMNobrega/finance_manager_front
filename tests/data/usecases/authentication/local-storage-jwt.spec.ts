import 'jest-localstorage-mock'
import { LocalStorageJwt } from '@/data/usecases/authentication'
import { mockJwt } from '@/tests/domain/mocks'

type SutTypes = {
  sut: LocalStorageJwt
  key: string
}

const makeSut = (): SutTypes => {
  const key = 'any-key'
  const sut = new LocalStorageJwt(key)
  return {
    sut,
    key
  }
}

describe('LocalstorageJwt', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('set should call localStorage with correct values', () => {
    const { sut, key } = makeSut()
    const token = mockJwt()
    sut.set(token)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, token)
  })

  it('get should call localStorage with correct values', () => {
    const { sut, key } = makeSut()
    sut.get()
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
  })

  it('get should return null if there is no value', () => {
    const { sut } = makeSut()
    const response = sut.get()
    expect(response).toBeNull()
  })

  it('get should return correct value', () => {
    const { sut } = makeSut()
    const token = 'token'

    const getItem: jest.Mock = localStorage.getItem as jest.Mock
    getItem.mockImplementationOnce(() => {
      return token
    })

    const response = sut.get()
    expect(response).toBe(token)
  })
})
