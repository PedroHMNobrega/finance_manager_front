import { Delete, DeleteParams } from '@/domain/usecases/delete'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, NotFoundError, UnexpectedError } from '@/domain/errors'

export class RemoteDelete<P extends DeleteParams, R> implements Delete<P, R> {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<R>
  ) {}

  delete = async (params: P): Promise<R> => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent: return
      case HttpStatusCode.notFound: throw new NotFoundError()
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
