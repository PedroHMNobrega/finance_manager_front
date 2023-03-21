import { CategorySaga } from '@/presentation/store/reducers'
import { Create, CreateCategoryParams, GetJwt } from '@/domain/usecases'
import { Category } from '@/domain/models'
import { createSpy, getJwtSpy } from '@/tests/data/mocks'
import { sagaExec } from '@/tests/presentation/helpers/saga-helper'
import { mockJwt } from '@/tests/domain/mocks'

type SutTypes = {
  sut: CategorySaga
  createCategorySpy: Create<CreateCategoryParams, Category>
  jwtSpy: GetJwt
}

const params: Category = {
  name: 'any-name'
}

const makeSut = (): SutTypes => {
  const createCategorySpy = createSpy()
  const jwtSpy = getJwtSpy()
  const sut = new CategorySaga(jwtSpy, null, null, createCategorySpy)
  return {
    sut,
    createCategorySpy,
    jwtSpy
  }
}

describe('CreateCategorySaga', () => {
  it('should call getJwt', async () => {
    const { sut, jwtSpy } = makeSut()
    await sagaExec(sut.createCategory())
    expect(jwtSpy.get).toHaveBeenCalledTimes(1)
  })

  it('should call createCategory with correct value', async () => {
    const { sut, createCategorySpy } = makeSut()

    await sagaExec(sut.createCategory(), params)

    expect(createCategorySpy.create).toHaveBeenCalledTimes(1)
    expect(createCategorySpy.create).toHaveBeenCalledWith({
      token: mockJwt(),
      category: params
    })
  })

  it('should call createCategoryFail with correct values on error', async () => {
    const { sut, createCategorySpy } = makeSut()
    const errorMessage = 'any-error-message'
    const createCategory = createCategorySpy.create as jest.Mock
    createCategory.mockRejectedValueOnce(new Error(errorMessage))

    const result = await sagaExec(sut.createCategory(), params)
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'category/createCategoryFail',
      payload: errorMessage
    })
  })

  it('should call createCategorySuccess with correct values on success', async () => {
    const { sut, createCategorySpy } = makeSut()
    const expectedResponse = 'any-response'
    const createCategory = createCategorySpy.create as jest.Mock
    createCategory.mockResolvedValue(expectedResponse)

    const result = await sagaExec(sut.createCategory(), params)
    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual({
      type: 'category/createCategorySuccess',
      payload: params
    })
  })
})
