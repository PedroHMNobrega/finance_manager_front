import { LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'
import { RemoteLoad } from '@/data/usecases'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockCategoryList, mockLoadCategoryListParams } from '@/tests/domain/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteLoad<LoadCategoryListParams, Category[]>
  httpClientSpy: HttpClientSpy<Category[]>
}

const url = 'any-url'

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Category[]>()
  const sut = new RemoteLoad<LoadCategoryListParams, Category[]>(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadCategoryList', () => {
  it('should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = mockLoadCategoryListParams()
    await sut.loadAll(params)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
    expect(httpClientSpy.headers).toEqual({
      Authorization: `Bearer ${params.token}`
    })
  })

  it('should throw InvalidCredientialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const params = mockLoadCategoryListParams()
    const promise = sut.loadAll(params)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it.each([
    { statusCode: HttpStatusCode.badRequest },
    { statusCode: HttpStatusCode.serverError },
    { statusCode: HttpStatusCode.notFound }
  ])('Should throw UnexpectedError if HttpClient returns other status code', async ({ statusCode }) => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode
    }
    const params = mockLoadCategoryListParams()
    const promise = sut.loadAll(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return Category[] if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockCategoryList()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const params = mockLoadCategoryListParams()
    const result = await sut.loadAll(params)
    await expect(result).toStrictEqual(httpResult)
  })
})
