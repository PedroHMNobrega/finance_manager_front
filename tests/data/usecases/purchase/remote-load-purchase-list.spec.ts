import { HttpClientSpy } from '@/tests/data/mocks'
import { Purchase } from '@/domain/models'
import { mockLoadPurchaseListParams, mockPurchaseList } from '@/tests/domain/mocks/mock-purchase'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { RemoteLoad } from '@/data/usecases/remote-load'
import { LoadPurchaseListParams } from '@/domain/usecases'

type SutTypes = {
  sut: RemoteLoad<LoadPurchaseListParams, Purchase[]>
  httpClientSpy: HttpClientSpy<Purchase[]>
}

const url = 'any-url'

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Purchase[]>()
  const sut = new RemoteLoad<LoadPurchaseListParams, Purchase[]>(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadPurchaseList', () => {
  it('should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = mockLoadPurchaseListParams()
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
    const params = mockLoadPurchaseListParams()
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
    const promise = sut.loadAll(mockLoadPurchaseListParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return a purchase list if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockPurchaseList()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const params = mockLoadPurchaseListParams()
    const purchases = await sut.loadAll(params)
    await expect(purchases).toStrictEqual(httpResult)
  })
})
