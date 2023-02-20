import { UpdateInstallmentParams } from '@/domain/usecases/installment/update-installment'
import { Installment } from '@/domain/models'
import { HttpClientSpy } from '@/tests/data/mocks'
import { mockInstallment, mockUpdateInstallmentParams } from '@/tests/domain/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, NotFoundError, UnexpectedError } from '@/domain/errors'
import { RemoteUpdate } from '@/data/usecases'

type SutTypes = {
  sut: RemoteUpdate<UpdateInstallmentParams, Installment>
  httpClientSpy: HttpClientSpy<Installment>
}

const url = 'any-url'

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Installment>()
  const sut = new RemoteUpdate<UpdateInstallmentParams, Installment>(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteUpdateInstallment', () => {
  it('should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = mockUpdateInstallmentParams()
    await sut.update(params)

    expect(httpClientSpy.url).toBe(`${url}/${params.id}`)
    expect(httpClientSpy.method).toBe('put')
    expect(httpClientSpy.headers).toEqual({
      Authorization: `Bearer ${params.token}`
    })
  })

  it('should throw InvalidCredientialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const params = mockUpdateInstallmentParams()
    const promise = sut.update(params)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw NotFoundError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const params = mockUpdateInstallmentParams()
    const promise = sut.update(params)
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
    const params = mockUpdateInstallmentParams()
    const promise = sut.update(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return Installment if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockInstallment(1)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const params = mockUpdateInstallmentParams()
    const result = await sut.update(params)
    await expect(result).toStrictEqual(httpResult)
  })
})
