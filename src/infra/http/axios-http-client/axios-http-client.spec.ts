import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const url = 'any-url'

type SutTypes = {
  sut: AxiosHttpClient
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  return {
    sut
  }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct URL and verb', async () => {
    const { sut } = makeSut()
    await sut.post({ url: url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
