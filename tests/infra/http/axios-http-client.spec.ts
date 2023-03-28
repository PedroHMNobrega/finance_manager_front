import axios from 'axios'
import { mockAxios, mockHttpResponse } from '@/tests/infra/mocks'
import { AxiosHttpAdapter } from '@/infra/http/axios-http-adapter'
import { mockHttpRequest } from '@/tests/data/mocks'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpAdapter
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpAdapter()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const request = mockHttpRequest
    const { sut, mockedAxios } = makeSut()
    await sut.request(request)
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: `${request.url}/`,
      data: request.body,
      headers: request.headers,
      method: request.method
    })
  })

  it('should return the correct statusCode and body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest)
    expect(httpResponse).toEqual({
      statusCode: mockHttpResponse.status,
      body: mockHttpResponse.data
    })
  })

  it('should return correct statusCode and body on failure', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse
    })
    const httpResponse = await sut.request(mockHttpRequest)
    expect(httpResponse).toEqual({
      statusCode: mockHttpResponse.status,
      body: mockHttpResponse.data
    })
  })

  it('should return error 500 if axios throw error', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.request.mockRejectedValueOnce({
      response: null
    })
    const httpResponse = await sut.request(mockHttpRequest)
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: 'Server Error'
    })
  })
})
