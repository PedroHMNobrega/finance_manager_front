import { CategorySaga } from '@/presentation/store/reducers'
import { Delete, DeleteCategoryParams, GetJwt } from '@/domain/usecases'
import { sagaExec } from '@/tests/presentation/helpers/saga-helper'
import { mockJwt } from '@/tests/domain/mocks'
import { deleteSpy, getJwtSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: CategorySaga
  deleteCategorySpy: Delete<DeleteCategoryParams, void>
  jwtSpy: GetJwt
}

const params = 1

const makeSut = (): SutTypes => {
  const deleteCategorySpy = deleteSpy()
  const jwtSpy = getJwtSpy()
  const sut = new CategorySaga(jwtSpy, null, deleteCategorySpy, null)

  return {
    sut,
    deleteCategorySpy: deleteCategorySpy,
    jwtSpy: jwtSpy
  }
}

describe('RemoveCategorySaga', () => {
  it('should call getJwt', async () => {
    const { sut, jwtSpy } = makeSut()
    await sagaExec(sut.deleteCategory())
    expect(jwtSpy.get).toHaveBeenCalledTimes(1)
  })

  it('should call deleteCategory with correct value', async () => {
    const { sut, deleteCategorySpy } = makeSut()

    await sagaExec(sut.deleteCategory(), params)

    expect(deleteCategorySpy.delete).toHaveBeenCalledTimes(1)
    expect(deleteCategorySpy.delete).toHaveBeenCalledWith({
      token: mockJwt(),
      id: params
    })
  })

  it('should call deleteCategoryFail with correct values on error', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    const errorMessage = 'any-error-message'
    const deleteCategory = deleteCategorySpy.delete as jest.Mock
    deleteCategory.mockRejectedValueOnce(new Error(errorMessage))

    const result = await sagaExec(sut.deleteCategory(), params)
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'category/deleteCategoryFail',
      payload: {
        name: 'Error',
        message: errorMessage
      }
    })
  })

  it('should call deleteCategorySuccess with correct values on success', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    const expectedResponse = 'any-response'
    const deleteCategory = deleteCategorySpy.delete as jest.Mock
    deleteCategory.mockResolvedValue(expectedResponse)

    const result = await sagaExec(sut.deleteCategory(), params)
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'category/deleteCategorySuccess',
      payload: params
    })
  })
})
