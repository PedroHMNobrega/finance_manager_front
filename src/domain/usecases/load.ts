export type LoadParams = {
  token: string
}

export interface Load<P extends LoadParams, R> {
  loadAll(params: P): Promise<R>
}
