import InstallmentSaga from '@/presentation/store/reducers/installment/saga'
import { UpdateInstallmentParams } from '@/domain/usecases/installment/update-installment'
import { Installment } from '@/domain/models'
import { Update } from '@/domain/usecases/update'
import { GetJwt } from '@/domain/usecases'
import { updateSpy } from '@/tests/data/mocks/mock-remote-update'
import { getJwtSpy } from '@/tests/data/mocks'
import { sagaExec } from '@/tests/presentation/helpers/saga-helper'
import { mockInstallment, mockJwt } from '@/tests/domain/mocks'

type SutTypes = {
  sut: InstallmentSaga
  updateInstallmentSpy: Update<UpdateInstallmentParams, Installment>
  jwtSpy: GetJwt
}

const params = {
  body: {
    paid: true,
    value_paid: 8.34
  },
  id: 1
}

const makeSut = (): SutTypes => {
  const updateInstallmentSpy = updateSpy()
  const jwtSpy = getJwtSpy()
  const sut = new InstallmentSaga(jwtSpy, null, updateInstallmentSpy)
  return {
    sut,
    updateInstallmentSpy,
    jwtSpy
  }
}

describe('UpdateInstallmentSaga', () => {
  it('should call getJwt', async () => {
    const { sut, jwtSpy } = makeSut()
    await sagaExec(sut.updateInstallment())
    expect(jwtSpy.get).toHaveBeenCalledTimes(1)
  })

  it('should call updateInstallment with correct value', async () => {
    const { sut, updateInstallmentSpy } = makeSut()

    await sagaExec(sut.updateInstallment(), params)

    expect(updateInstallmentSpy.update).toHaveBeenCalledTimes(1)
    expect(updateInstallmentSpy.update).toHaveBeenCalledWith({
      token: mockJwt(),
      id: params.id,
      body: params.body
    })
  })

  it('should call updateInstallmentFail with correct values on error', async () => {
    const { sut, updateInstallmentSpy } = makeSut()
    const errorMessage = 'any-error-message'
    const updateInstallment = updateInstallmentSpy.update as jest.Mock
    updateInstallment.mockRejectedValueOnce(new Error(errorMessage))

    const result = await sagaExec(sut.updateInstallment(), params)
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'installment/updateInstallmentFail',
      payload: {
        name: 'Error',
        message: errorMessage
      }
    })
  })

  it('should call updateInstallmentSuccess with correct values on success', async () => {
    const { sut, updateInstallmentSpy } = makeSut()
    const expectedResponse = mockInstallment(12)
    const updateInstallment = updateInstallmentSpy.update as jest.Mock
    updateInstallment.mockResolvedValue(expectedResponse)

    const result = await sagaExec(sut.updateInstallment(), params)
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'installment/updateInstallmentSuccess',
      payload: expectedResponse
    })
  })
})
