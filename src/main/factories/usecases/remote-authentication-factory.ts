import { RemoteAuthentication } from '@/data/usecases/authentication'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpAdapter } from '@/main/factories/http/axios-http-adapter-factory'

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  const url = makeApiUrl('/auth/login')
  const axiosHttpAdapter = makeAxiosHttpAdapter()
  return new RemoteAuthentication(url, axiosHttpAdapter)
}
