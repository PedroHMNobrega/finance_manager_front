import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { Create, CreateParams } from '@/domain/usecases'

export class RemoteCreate<P, R> implements Create<P, R> {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<R>
  ) {}

  create = async (params: CreateParams<P>): Promise<R> => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params.body,
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
