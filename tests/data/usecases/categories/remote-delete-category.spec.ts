import { DeleteCategoryParams } from '@/domain/usecases'
import { RemoteDelete } from '@/data/usecases'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockDeleteCategoryParams } from '@/tests/domain/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, NotFoundError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteDelete<DeleteCategoryParams, void>
  httpClientSpy: HttpClientSpy<void>
}

const url = 'any-url'

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<void>()
  httpClientSpy.response.statusCode = HttpStatusCode.noContent
  const sut = new RemoteDelete<DeleteCategoryParams, void>(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteDeleteCategory', () => {
  it('should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = mockDeleteCategoryParams()
    await sut.delete(params)

    expect(httpClientSpy.url).toBe(`${url}/${params.id}`)
    expect(httpClientSpy.method).toBe('delete')
    expect(httpClientSpy.headers).toEqual({
      Authorization: `Bearer ${params.token}`
    })
  })

  it('should throw InvalidCredientialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const params = mockDeleteCategoryParams()
    const promise = sut.delete(params)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw NotFoundError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const params = mockDeleteCategoryParams()
    const promise = sut.delete(params)
    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  it.each([
    { statusCode: HttpStatusCode.badRequest },
    { statusCode: HttpStatusCode.serverError }
  ])('Should throw UnexpectedError if HttpClient returns other status code', async ({ statusCode }) => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode
    }
    const params = mockDeleteCategoryParams()
    const promise = sut.delete(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return void if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const params = mockDeleteCategoryParams()
    const result = await sut.delete(params)
    await expect(result).toBeUndefined()
  })
})
