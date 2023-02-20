export type DeleteParams = {
  token: string
  id: number
}

export interface Delete<P extends DeleteParams, R> {
  delete(params: P): Promise<R>
}
