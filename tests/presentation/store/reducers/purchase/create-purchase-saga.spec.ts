import { PurchaseSaga } from '@/presentation/store/reducers'
import { Create, CreatePurchaseParams, GetJwt } from '@/domain/usecases'
import { Purchase } from '@/domain/models'
import { createSpy, getJwtSpy } from '@/tests/data/mocks'
import { sagaExec } from '@/tests/presentation/helpers/saga-helper'
import { mockJwt, mockPurchase } from '@/tests/domain/mocks'

type SutTypes = {
  sut: PurchaseSaga
  createPurchaseSpy: Create<CreatePurchaseParams, Purchase>
  jwtSpy: GetJwt
}

const params: Purchase = {
  name: 'any-name',
  category: 1,
  firstInstallmentDate: '2022-11-02',
  installmentsNumber: 1,
  value: 299.99
}

const makeSut = (): SutTypes => {
  const createPurchaseSpy = createSpy()
  const jwtSpy = getJwtSpy()
  const sut = new PurchaseSaga(jwtSpy, null, null, createPurchaseSpy)
  return {
    sut,
    createPurchaseSpy,
    jwtSpy
  }
}

describe('CreatePurchaseSaga', () => {
  it('should call getJwt', async () => {
    const { sut, jwtSpy } = makeSut()
    await sagaExec(sut.createPurchase())
    expect(jwtSpy.get).toHaveBeenCalledTimes(1)
  })

  it('should call createPurchase with correct value', async () => {
    const { sut, createPurchaseSpy } = makeSut()

    await sagaExec(sut.createPurchase(), params)

    expect(createPurchaseSpy.create).toHaveBeenCalledTimes(1)
    expect(createPurchaseSpy.create).toHaveBeenCalledWith({
      token: mockJwt(),
      body: params
    })
  })

  it('should call createPurchaseFail with correct values on error', async () => {
    const { sut, createPurchaseSpy } = makeSut()
    const errorMessage = 'any-error-message'
    const createPurchase = createPurchaseSpy.create as jest.Mock
    createPurchase.mockRejectedValueOnce(new Error(errorMessage))

    const result = await sagaExec(sut.createPurchase(), params)
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'purchase/createPurchaseFail',
      payload: {
        name: 'Error',
        message: errorMessage
      }
    })
  })

  it('should call createPurchaseSuccess with correct values on success', async () => {
    const { sut, createPurchaseSpy } = makeSut()
    const expectedResponse = mockPurchase(234)
    const createPurchase = createPurchaseSpy.create as jest.Mock
    createPurchase.mockResolvedValue(expectedResponse)

    const result = await sagaExec(sut.createPurchase(), params)
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'purchase/createPurchaseSuccess',
      payload: expectedResponse
    })
  })
})
