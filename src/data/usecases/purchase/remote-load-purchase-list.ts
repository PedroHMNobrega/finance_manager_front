import { Purchase } from '@/domain/models'
import { LoadPurchaseList, LoadPurchaseListParams } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadPurchaseList implements LoadPurchaseList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpClient<Purchase[]>
  ) {}

  async loadAll (params: LoadPurchaseListParams): Promise<Purchase[]> {
    const httpResponse = await this.httpGetClient.request({
      url: this.url,
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
