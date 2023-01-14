import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const url = 'any-url'

describe('AxiosHttpClient', () => {
  it('should call axios with correct URL', async () => {
    const sut = new AxiosHttpClient()
    await sut.post({ url: url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
