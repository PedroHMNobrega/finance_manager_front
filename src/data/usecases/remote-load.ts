import { Load, LoadParams } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteLoad<P extends LoadParams, R> implements Load<P, R> {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<R>
  ) {}

  loadAll = async (params: P): Promise<R> => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      params: params.params,
      method: 'get',
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
