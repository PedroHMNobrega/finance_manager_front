export type LoadParams = {
  token: string
  params?: Record<string, string>
}

export interface Load<P extends LoadParams, R> {
  loadAll(params: P): Promise<R>
}
