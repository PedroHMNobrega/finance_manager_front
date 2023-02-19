import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { DeletePurchase, DeletePurchaseParams } from '@/domain/usecases'
import { InvalidCredentialsError, NotFoundError, UnexpectedError } from '@/domain/errors'

export class RemoteDeletePurchase implements DeletePurchase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  async delete (params: DeletePurchaseParams): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.purchaseId}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent: return
      case HttpStatusCode.notFound: throw new NotFoundError('Compra')
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
