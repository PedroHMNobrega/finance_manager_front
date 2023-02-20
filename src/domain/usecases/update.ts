export type UpdateParams = {
  token: string
  id: number
}

export interface Update<P extends UpdateParams, R> {
  update(params: P): Promise<R>
}
