import { LoadInstallmentListParams } from '@/domain/usecases'
import { Installment } from '@/domain/models'
import { HttpClientSpy } from '@/tests/data/mocks'
import { RemoteLoad } from '@/data/usecases'
import { mockInstallmentList, mockLoadInstallmentListParams } from '@/tests/domain/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteLoad<LoadInstallmentListParams, Installment[]>
  httpClientSpy: HttpClientSpy<Installment[]>
}

const url = 'any-url'

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Installment[]>()
  const sut = new RemoteLoad<LoadInstallmentListParams, Installment[]>(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadInstallmentList', () => {
  it('should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = mockLoadInstallmentListParams()
    await sut.loadAll(params)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
    expect(httpClientSpy.headers).toEqual({
      Authorization: `Bearer ${params.token}`
    })
    expect(httpClientSpy.params).toBeUndefined()
  })

  it('should call HttpClient with correct values if params is passed', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = mockLoadInstallmentListParams()
    const queryParams = { any: 'param' }
    params.params = queryParams

    await sut.loadAll(params)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
    expect(httpClientSpy.headers).toEqual({
      Authorization: `Bearer ${params.token}`
    })
    expect(httpClientSpy.params).toStrictEqual(queryParams)
  })

  it('should throw InvalidCredientialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const params = mockLoadInstallmentListParams()
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
    const params = mockLoadInstallmentListParams()
    const promise = sut.loadAll(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return Installment[] if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockInstallmentList()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const params = mockLoadInstallmentListParams()
    const result = await sut.loadAll(params)
    await expect(result).toStrictEqual(httpResult)
  })
})
