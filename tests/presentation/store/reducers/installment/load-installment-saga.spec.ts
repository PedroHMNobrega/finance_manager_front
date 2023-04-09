import InstallmentSaga from '@/presentation/store/reducers/installment/saga'
import { GetJwt, Load, LoadInstallmentListParams } from '@/domain/usecases'
import { Installment } from '@/domain/models'
import { getJwtSpy, loadSpy } from '@/tests/data/mocks'
import { sagaExec } from '@/tests/presentation/helpers/saga-helper'
import { mockJwt } from '@/tests/domain/mocks'

type SutTypes = {
  sut: InstallmentSaga
  loadInstallmentSpy: Load<LoadInstallmentListParams, Installment[]>
  jwtSpy: GetJwt
}

const makeSut = (): SutTypes => {
  const loadInstallmentSpy = loadSpy()
  const jwtSpy = getJwtSpy()
  const sut = new InstallmentSaga(jwtSpy, loadInstallmentSpy, null)

  return {
    sut,
    loadInstallmentSpy,
    jwtSpy
  }
}

describe('LoadInstallmentSaga', () => {
  it('should call getJwt', async () => {
    const { sut, jwtSpy } = makeSut()
    await sagaExec(sut.loadInstallments())
    expect(jwtSpy.get).toHaveBeenCalledTimes(1)
  })

  it('should call loadInstallments with correct value', async () => {
    const { sut, loadInstallmentSpy } = makeSut()
    await sagaExec(sut.loadInstallments())
    expect(loadInstallmentSpy.loadAll).toHaveBeenCalledTimes(1)
    expect(loadInstallmentSpy.loadAll).toHaveBeenCalledWith({
      token: mockJwt(),
      params: null
    })
  })

  it('should call loadInstallments with correct value', async () => {
    const { sut, loadInstallmentSpy } = makeSut()
    const params = { any: 'params ' }
    await sagaExec(sut.loadInstallments(), params)
    expect(loadInstallmentSpy.loadAll).toHaveBeenCalledTimes(1)
    expect(loadInstallmentSpy.loadAll).toHaveBeenCalledWith({
      token: mockJwt(),
      params: params
    })
  })

  it('should return correct message on error', async () => {
    const { sut, loadInstallmentSpy } = makeSut()
    const errorMessage = 'any-error-message'
    const loadAll = loadInstallmentSpy.loadAll as jest.Mock
    loadAll.mockRejectedValueOnce(new Error(errorMessage))

    const result = await sagaExec(sut.loadInstallments())
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'installment/loadInstallmentsFail',
      payload: {
        name: 'Error',
        message: errorMessage
      }
    })
  })

  it('should return correct value on success', async () => {
    const { sut, loadInstallmentSpy } = makeSut()
    const expectedResponse = 'any-response'
    const loadAll = loadInstallmentSpy.loadAll as jest.Mock
    loadAll.mockResolvedValue(expectedResponse)

    const result = await sagaExec(sut.loadInstallments())
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'installment/loadInstallmentsSuccess',
      payload: expectedResponse
    })
  })
})
