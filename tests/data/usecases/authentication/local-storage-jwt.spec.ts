import { LocalStorageJwt } from '@/data/usecases/authentication'
import { mockJwt } from '@/tests/domain/mocks'
import { mockLocalStorage } from '@/tests/data/mocks'

type SutTypes = {
  sut: LocalStorageJwt
  key: string
  localStorageSpy: Storage
}

const makeSut = (): SutTypes => {
  const localStorageSpy = mockLocalStorage
  Object.defineProperty(global, 'localStorage', {
    value: localStorageSpy
  })

  const key = 'any-key'
  const sut = new LocalStorageJwt(key)
  return {
    sut,
    key,
    localStorageSpy
  }
}

describe('LocalstorageJwt', () => {
  it('set should call localStorage with correct values', () => {
    const { sut, key, localStorageSpy } = makeSut()
    const token = mockJwt()
    sut.set(token)

    expect(localStorageSpy.setItem).toHaveBeenCalledWith(key, token)
  })

  it('get should call localStorage with correct values', () => {
    const { sut, key, localStorageSpy } = makeSut()
    sut.get()
    expect(localStorageSpy.getItem).toHaveBeenCalledWith(key)
  })

  it('get should return correct value', () => {
    const { sut, localStorageSpy } = makeSut()
    const token = 'any-token'

    const getItem: jest.Mock = localStorageSpy.getItem as jest.Mock
    getItem.mockImplementationOnce(() => {
      return token
    })

    const response = sut.get()
    expect(response).toBe(token)
  })
})
