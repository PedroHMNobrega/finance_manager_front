import { PurchaseSaga } from '@/presentation/store/reducers'
import { GetJwt, Load, LoadPurchaseListParams } from '@/domain/usecases'
import { Purchase } from '@/domain/models'
import { getJwtSpy, loadSpy } from '@/tests/data/mocks'
import { sagaExec } from '@/tests/presentation/helpers/saga-helper'
import { mockJwt } from '@/tests/domain/mocks'

type SutTypes = {
  sut: PurchaseSaga
  loadPurchasesSpy: Load<LoadPurchaseListParams, Purchase[]>
  jwtSpy: GetJwt
}

const makeSut = (): SutTypes => {
  const loadPurchasesSpy = loadSpy()
  const jwtSpy = getJwtSpy()
  const sut = new PurchaseSaga(jwtSpy, loadPurchasesSpy, null, null)
  return {
    sut,
    loadPurchasesSpy,
    jwtSpy
  }
}

describe('LoadPurchasesSaga', () => {
  it('should call getJwt', async () => {
    const { sut, jwtSpy } = makeSut()
    await sagaExec(sut.loadPurchases())
    expect(jwtSpy.get).toHaveBeenCalledTimes(1)
  })

  it('should call loadPuchases with correct value', async () => {
    const { sut, loadPurchasesSpy } = makeSut()
    await sagaExec(sut.loadPurchases())
    expect(loadPurchasesSpy.loadAll).toHaveBeenCalledTimes(1)
    expect(loadPurchasesSpy.loadAll).toHaveBeenCalledWith({
      token: mockJwt()
    })
  })

  it('should return correct message on error', async () => {
    const { sut, loadPurchasesSpy } = makeSut()
    const errorMessage = 'any-error-message'
    const loadAll = loadPurchasesSpy.loadAll as jest.Mock
    loadAll.mockRejectedValueOnce(new Error(errorMessage))

    const result = await sagaExec(sut.loadPurchases())
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'purchase/loadPurchaseFail',
      payload: {
        name: 'Error',
        message: errorMessage
      }
    })
  })

  it('should return correct value on success', async () => {
    const { sut, loadPurchasesSpy } = makeSut()
    const expectedResponse = 'any-response'
    const loadAll = loadPurchasesSpy.loadAll as jest.Mock
    loadAll.mockResolvedValue(expectedResponse)

    const result = await sagaExec(sut.loadPurchases())
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'purchase/loadPurchaseSuccess',
      payload: expectedResponse
    })
  })
})
