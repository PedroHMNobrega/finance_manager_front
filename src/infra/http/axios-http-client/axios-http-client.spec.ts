import { AxiosHttpAdapter } from '@/infra/http/axios-http-client/axios-http-adapter'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockPostResponse = {
  data: 'any-data',
  status: 200
}

mockedAxios.post.mockResolvedValue(mockPostResponse)

const url = 'any-url'

type SutTypes = {
  sut: AxiosHttpAdapter
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpAdapter()
  return {
    sut
  }
}

const mockPostRequest = {
  url: url,
  body: {
    any: 'body'
  }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const request = mockPostRequest
    const { sut } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return the correct statusCode and body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.post(mockPostRequest)
    expect(httpResponse).toEqual({
      statusCode: mockPostResponse.status,
      body: mockPostResponse.data
    })
  })
})
