export type CreateParams<P> = {
  token: string
  body: P
}

export interface Create<P, R> {
  create(params: CreateParams<P>): Promise<R>
}
