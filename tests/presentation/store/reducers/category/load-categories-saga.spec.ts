import { CategorySaga } from '@/presentation/store/reducers'
import { GetJwt, Load, LoadCategoryListParams } from '@/domain/usecases'
import { loadSpy } from '@/tests/data/mocks'
import { getJwtSpy } from '@/tests/data/mocks/mock-jwt-usecase'
import { mockJwt } from '@/tests/domain/mocks'
import { Category } from '@/domain/models'
import { sagaExec } from '@/tests/presentation/helpers/saga-helper'

type SutTypes = {
  sut: CategorySaga
  loadCategoriesSpy: Load<LoadCategoryListParams, Category[]>
  jwtSpy: GetJwt
}

const makeSut = (): SutTypes => {
  const loadCategoriesSpy = loadSpy()
  const jwtSpy = getJwtSpy()
  const sut = new CategorySaga(jwtSpy, loadCategoriesSpy, null)

  return {
    sut,
    loadCategoriesSpy: loadCategoriesSpy,
    jwtSpy: jwtSpy
  }
}

describe('Load Categories Saga', () => {
  it('should call getJwt', async () => {
    const { sut, jwtSpy } = makeSut()
    await sagaExec(sut.loadCategories())
    expect(jwtSpy.get).toHaveBeenCalledTimes(1)
  })

  it('should call loadCategories with correct value', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    await sagaExec(sut.loadCategories())
    expect(loadCategoriesSpy.loadAll).toHaveBeenCalledTimes(1)
    expect(loadCategoriesSpy.loadAll).toHaveBeenCalledWith({
      token: mockJwt()
    })
  })

  it('should return correct message on error', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    const errorMessage = 'any-error-message'
    const loadAll = loadCategoriesSpy.loadAll as jest.Mock
    loadAll.mockRejectedValueOnce(new Error(errorMessage))

    const result = await sagaExec(sut.loadCategories())
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'category/loadCategoryFail',
      payload: errorMessage
    })
  })

  it('should return correct value on success', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    const expectedResponse = 'any-response'
    const loadAll = loadCategoriesSpy.loadAll as jest.Mock
    loadAll.mockResolvedValue(expectedResponse)

    const result = await sagaExec(sut.loadCategories())
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'category/loadCategorySuccess',
      payload: expectedResponse
    })
  })
})
