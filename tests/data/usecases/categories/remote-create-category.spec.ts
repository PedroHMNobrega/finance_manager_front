import { CreateCategoryParams } from '@/domain/usecases'
import { Category } from '@/domain/models'
import { RemoteCreate } from '@/data/usecases'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockCategory, mockCreateCategoryParams } from '@/tests/domain/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteCreate<CreateCategoryParams, Category>
  httpClientSpy: HttpClientSpy<Category>
}

const url = 'any-url'

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Category>()
  const sut = new RemoteCreate<CreateCategoryParams, Category>(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteCreateCategory', () => {
  it('should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = mockCreateCategoryParams()
    await sut.create(params)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.headers).toEqual({
      Authorization: `Bearer ${params.token}`
    })
  })

  it('should throw InvalidCredientialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const params = mockCreateCategoryParams()
    const promise = sut.create(params)
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
    const params = mockCreateCategoryParams()
    const promise = sut.create(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return Category if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockCategory(1)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const params = mockCreateCategoryParams()
    const result = await sut.create(params)
    await expect(result).toStrictEqual(httpResult)
  })
})
