import { AxiosHttpAdapter } from '@/infra/http/axios-http-adapter'

export const makeAxiosHttpAdapter = (): AxiosHttpAdapter => {
  return new AxiosHttpAdapter()
}
