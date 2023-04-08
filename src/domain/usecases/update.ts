export type UpdateParams<P> = {
  token: string
  id: number
  body: P
}

export interface Update<P, R> {
  update(params: UpdateParams<P>): Promise<R>
}
