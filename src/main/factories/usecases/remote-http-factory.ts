import { RemoteCreate, RemoteDelete, RemoteLoad, RemoteUpdate } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { DeleteParams, LoadParams } from '@/domain/usecases'
import { makeAxiosHttpAdapter } from '@/main/factories/http/axios-http-adapter-factory'

export function makeRemoteLoad<P extends LoadParams, R> (path: string): RemoteLoad<P, R> {
  const url = makeApiUrl(path)
  const axiosHttpAdapter = makeAxiosHttpAdapter()
  return new RemoteLoad<P, R>(url, axiosHttpAdapter)
}

export function makeRemoteDelete<P extends DeleteParams, R> (path: string): RemoteDelete<P, R> {
  const url = makeApiUrl(path)
  const axiosHttpAdapter = makeAxiosHttpAdapter()
  return new RemoteDelete<P, R>(url, axiosHttpAdapter)
}

export function makeRemoteCreate<P, R> (path: string): RemoteCreate<P, R> {
  const url = makeApiUrl(path)
  const axiosHttpAdapter = makeAxiosHttpAdapter()
  return new RemoteCreate<P, R>(url, axiosHttpAdapter)
}

export function makeRemoteUpdate<P, R> (path: string): RemoteUpdate<P, R> {
  const url = makeApiUrl(path)
  const axiosHttpAdapter = makeAxiosHttpAdapter()
  return new RemoteUpdate<P, R>(url, axiosHttpAdapter)
}
