import { HttpRequest, HttpResponse, HttpStatusCode, HttpClient } from '@/data/protocols/http'

export const mockHttpRequest = (): HttpRequest => ({
  url: 'any-url',
  method: 'get',
  body: {
    any: 'body'
  },
  headers: {
    any: 'header'
  }
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  method?: string
  body?: any
  headers?: any
  params?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    this.params = data.params
    return Promise.resolve(this.response)
  }
}
