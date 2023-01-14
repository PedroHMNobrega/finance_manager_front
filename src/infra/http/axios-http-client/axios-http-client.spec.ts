import { AxiosHttpAdapter } from '@/infra/http/axios-http-client/axios-http-adapter'
import axios from 'axios'
import { mockAxios, mockAxiosPostResponse } from '@/infra/test'
import { mockPostRequest } from '@/data/test'

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
    const request = mockPostRequest
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return the correct statusCode and body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.post(mockPostRequest)
    expect(httpResponse).toEqual({
      statusCode: mockAxiosPostResponse.status,
      body: mockAxiosPostResponse.data
    })
  })
})
