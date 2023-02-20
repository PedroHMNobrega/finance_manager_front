import { RemoteCreate } from '@/data/usecases'
import { HttpClientSpy } from '@/tests/data/mocks'
import { Purchase } from '@/domain/models'
import { mockCreatePurchaseParams, mockPurchase } from '@/tests/domain/mocks/mock-purchase'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { CreatePurchaseParams } from '@/domain/usecases'

type SutTypes = {
  sut: RemoteCreate<CreatePurchaseParams, Purchase>
  httpClientSpy: HttpClientSpy<Purchase>
}

const url = 'any-url'

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Purchase>()
  const sut = new RemoteCreate<CreatePurchaseParams, Purchase>(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteCreatePurchase', () => {
  it('should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = mockCreatePurchaseParams()
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
    const params = mockCreatePurchaseParams()
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
    const promise = sut.create(mockCreatePurchaseParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return Purchase if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockPurchase(1)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const params = mockCreatePurchaseParams()
    const result = await sut.create(params)
    await expect(result).toStrictEqual(httpResult)
  })
})
