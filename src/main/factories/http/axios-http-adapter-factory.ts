import { AxiosHttpAdapter } from '@/infra/http/axios-http-client/axios-http-adapter'

export const makeAxiosHttpAdapter = (): AxiosHttpAdapter => {
  return new AxiosHttpAdapter()
}
