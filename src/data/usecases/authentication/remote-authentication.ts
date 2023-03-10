import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<AccountModel>
  ) {}

  auth = async (params: AuthenticationParams): Promise<AccountModel> => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
