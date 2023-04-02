import { PurchaseSaga } from '@/presentation/store/reducers'
import { Delete, DeletePurchaseParams, GetJwt } from '@/domain/usecases'
import { deleteSpy, getJwtSpy } from '@/tests/data/mocks'
import { sagaExec } from '@/tests/presentation/helpers/saga-helper'
import { mockJwt } from '@/tests/domain/mocks'

type SutTypes = {
  sut: PurchaseSaga
  deletePurchaseSpy: Delete<DeletePurchaseParams, void>
  jwtSpy: GetJwt
}

const params = 1

const makeSut = (): SutTypes => {
  const deletePurchaseSpy = deleteSpy()
  const jwtSpy = getJwtSpy()
  const sut = new PurchaseSaga(jwtSpy, null, deletePurchaseSpy, null)
  return {
    sut,
    deletePurchaseSpy,
    jwtSpy
  }
}

describe('RemovePurchaseSaga', () => {
  it('should call getJwt', async () => {
    const { sut, jwtSpy } = makeSut()
    await sagaExec(sut.deletePurchase())
    expect(jwtSpy.get).toHaveBeenCalledTimes(1)
  })

  it('should call deletePurchase with correct value', async () => {
    const { sut, deletePurchaseSpy } = makeSut()

    await sagaExec(sut.deletePurchase(), params)

    expect(deletePurchaseSpy.delete).toHaveBeenCalledTimes(1)
    expect(deletePurchaseSpy.delete).toHaveBeenCalledWith({
      token: mockJwt(),
      id: params
    })
  })

  it('should call deletePurchaseFail with correct values on error', async () => {
    const { sut, deletePurchaseSpy } = makeSut()
    const errorMessage = 'any-error-message'
    const deletePurchase = deletePurchaseSpy.delete as jest.Mock
    deletePurchase.mockRejectedValueOnce(new Error(errorMessage))

    const result = await sagaExec(sut.deletePurchase(), params)
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'purchase/deletePurchaseFail',
      payload: {
        name: 'Error',
        message: errorMessage
      }
    })
  })

  it('should call deletePurchaseSuccess with correct values on success', async () => {
    const { sut, deletePurchaseSpy } = makeSut()
    const expectedResponse = 'any-response'
    const deletePurchase = deletePurchaseSpy.delete as jest.Mock
    deletePurchase.mockResolvedValue(expectedResponse)

    const result = await sagaExec(sut.deletePurchase(), params)
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'purchase/deletePurchaseSuccess',
      payload: params
    })
  })
})
