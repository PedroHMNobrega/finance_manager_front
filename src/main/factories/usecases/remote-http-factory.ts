import { RemoteLoad } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { LoadParams } from '@/domain/usecases'
import { makeAxiosHttpAdapter } from '@/main/factories/http/axios-http-adapter-factory'

export function makeRemoteLoad<P extends LoadParams, R> (path: string): RemoteLoad<P, R> {
  const url = makeApiUrl(path)
  const axiosHttpAdapter = makeAxiosHttpAdapter()
  return new RemoteLoad<P, R>(url, axiosHttpAdapter)
}
