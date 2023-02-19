import { CreatePurchase, CreatePurchaseParams } from '@/domain/usecases/create-purchase'
import { Purchase } from '@/domain/models'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteCreatePurchase implements CreatePurchase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<Purchase>
  ) {}

  async create (params: CreatePurchaseParams): Promise<Purchase> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
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
