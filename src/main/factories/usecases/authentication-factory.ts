import { RemoteAuthentication } from '@/data/usecases/authentication'
import { AxiosHttpAdapter } from '@/infra/http/axios-http-client/axios-http-adapter'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  const url = makeApiUrl('/login')
  const axiosHttpAdapter = new AxiosHttpAdapter()
  return new RemoteAuthentication(url, axiosHttpAdapter)
}
