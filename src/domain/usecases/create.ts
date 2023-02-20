export type CreateParams = {
  token: string
}

export interface Create<P extends CreateParams, R> {
  create(params: P): Promise<R>
}
