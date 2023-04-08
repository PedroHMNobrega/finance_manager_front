import { Update, UpdateParams } from '@/domain/usecases/update'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, NotFoundError, UnexpectedError } from '@/domain/errors'

export class RemoteUpdate<P, R> implements Update<P, R> {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<R>
  ) {}

  update = async (params: UpdateParams<P>): Promise<R> => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'put',
      body: params.body,
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.notFound: throw new NotFoundError()
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
